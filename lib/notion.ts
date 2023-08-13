import { Client } from "@notionhq/client";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import fs from "fs";
import path from "path";
import { RateLimit } from "async-sema";

export const database1 = process.env.NOTION_PROJECTS_DATABASE;

export const databases = [database1];

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const rateLimiter = RateLimit(1, {
  timeUnit: 400,
  uniformDistribution: true,
});

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchDataWithRetry(fn, retries = 3, interval = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries) throw error;
      await delay(interval);
    }
  }
}

const fetchChildBlocks = async (blockId: string, level: number = 0) => {
  console.log(`Fetching child blocks of ${blockId} at level ${level}`);
  if (level > 2) {
    console.log(`Blocks with ID ${blockId} are at level ${level} will not be fetched at this time.`);
    return [];
  }

  let startCursor = undefined;
  let children = [];

  while (true) {
    await rateLimiter();
    const response = await fetchDataWithRetry(() =>
      notion.blocks.children.list({
        block_id: blockId,
        start_cursor: startCursor,
      }),
    );

    children.push(...response.results);

    for (let i = 0; i < response.results.length; i++) {
      let child = response.results[i];
      if ("has_children" in child && child.has_children) {
        if ("id" in child) {
          const grandChildren = await fetchChildBlocks(child.id, level + 1);
          if ("children" in child) {
            child.children = grandChildren;
          } else {
            (child as any).children = grandChildren;
          }
        }
      }
    }

    if (!response.has_more) {
      console.log(`Finished fetching child blocks of ${blockId} at level ${level}`);
      break;
    }

    startCursor = response.next_cursor;
  }

  return children;
};

export const getDatabase = async databaseId => {
  let startCursor = undefined;
  let results = [];

  while (true) {
    await rateLimiter();
    const response = await fetchDataWithRetry(() =>
      notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor,
      }),
    );

    results.push(...response.results);

    if (!response.has_more) {
      break;
    }

    startCursor = response.next_cursor;
  }

  return results;
};

const PAGES_CACHE_PATH = path.resolve("notionpages.json");

export async function getAllPages() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(PAGES_CACHE_PATH, "utf8"));
  } catch (error) {
    console.log("Notion Pages cache not initialized. Pages will be fetched now. It may take upto 10 minutes");
  }

  if (!cachedData) {
    const promises = databases.map(database => getDatabase(database));
    const results = await Promise.all(promises);

    const allPages = [].concat(...results);
    // const livePages = allPages.filter(page => page.properties.status?.select?.name === "LIVE");

    const childBlocksPromises = allPages.map(async (page, index, array) => {
      console.log(`Processing page ${index + 1} of ${array.length}`);

      const results = await Promise.allSettled([fetchChildBlocks(page.id)]);

      const childBlocks = [];

      for (const result of results) {
        if (result.status === "fulfilled" && Array.isArray(result.value)) {
          childBlocks.push(...result.value);
        } else if (result.status === "rejected") {
          console.error(`Error fetching child blocks of page ${index + 1} of ${array.length}`);
          console.error(result.reason);
        }
      }

      console.log(`Finished processing page ${index + 1} of ${array.length}`);
      return childBlocks;
    });

    const allChildBlocks = await Promise.all(childBlocksPromises);

    const transformPage = (page, childBlocks) => {
      const slug = page.properties.slug?.rich_text?.[0]?.plain_text ?? "";
      // const appear_on = rootSlugs.includes(slug) ? "ROOT" : "";
      // const icon = rootSlugs.includes(slug) ? `/icons/ecosystem/${slug}.svg` : "";

      return {
        page: page,
        brand: page.properties.Brand?.rich_text[0]?.plain_text ?? "",
        brand_about: page.properties["Brand About"]?.rich_text[0]?.plain_text ?? "",
        date: page.properties["Date Display"]?.rich_text[0]?.plain_text ?? "",
        industry: page.properties.Industry?.multi_select?.map(item => item.name) ?? "",
        name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
        position: page.properties.Position?.select?.name ?? "",
        project_about: page.properties["Project About"]?.rich_text[0]?.plain_text ?? "",
        project_type: page.properties["Project Type"]?.multi_select?.map(item => item.name) ?? "",
        seo_description: page.properties["SEO Description"]?.rich_text[0]?.plain_text ?? "",
        slug: page.properties["Slug"]?.rich_text[0]?.plain_text ?? "",
        technologies: page.properties.Technologies?.multi_select?.map(item => item.name) ?? "",
        // url: page.properties["URL"]?.rich_text[0]?.plain_text ?? "",
        childBlocks: childBlocks.map(block => {
          // Remove unnecessary fields from block
          delete block.created_time;
          delete block.last_edited_time;
          delete block.created_by;
          delete block.last_edited_by;
          return block;
        }),
        // },
      };
    };

    const transformedPages = allPages.map((page, i) => transformPage(page, allChildBlocks[i]));
    const sortedPages = transformedPages;
    // const sortedPages = transformedPages.sort((a, b) => a.ecosystemPage.order - b.ecosystemPage.order);
    try {
      fs.writeFileSync(PAGES_CACHE_PATH, JSON.stringify(sortedPages), "utf8");
      console.log("Wrote to notionpages cache");
    } catch (error) {
      console.log("ERROR WRITING PAGES CACHE TO FILE");
      console.log(error);
    }

    cachedData = sortedPages;
  }
  console.log("cachedData", cachedData);

  return cachedData;
}

export const getImageSrc = async (blockId: string) => {
  const supportedBlockType = "image";
  const block = await notion.blocks.retrieve({ block_id: blockId });

  const imageBlock = block as unknown as ImageBlockObjectResponse;

  if (imageBlock.type !== supportedBlockType) {
    throw new Error("Block is not an image");
  }

  const image = imageBlock.image;

  if (image.type === "external") {
    return image.external.url;
  }

  return image.file.url;
};
