import { Client } from "@notionhq/client";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import fs from "fs";
import path from "path";
import { RateLimit } from "async-sema";
import { getProjects } from "./getProjects";
import { getTechnologies } from "./getTechnologies";
import { getPhotography } from "./getPhotography";
import { getSinglePages } from "./getSinglePages";
import { getEducation } from "./getEducation";
import { enqueueRewrite } from "./rewriteCacheUrl";

export const database1 = process.env.NOTION_PROJECTS_DATABASE;
export const database2 = process.env.NOTION_TECHNOLOGIES_DATABASE;

export const databases = [database1, database2];

export const PAGES_CACHE_PATH = path.resolve("notionpages.json");

export const notionClient = new Client({
  auth: process.env.NOTION_SECRET,
});

export const rateLimiter = RateLimit(1, {
  timeUnit: 400,
  uniformDistribution: true,
});

const delay = ms => new Promise(res => setTimeout(res, ms));

export async function fetchDataWithRetry(fn, retries = 3, interval = 1000) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries) throw error;
      await delay(interval);
    }
  }
}

export const getDatabase = async databaseId => {
  let startCursor = undefined;
  let results = [];
  while (true) {
    await rateLimiter();
    const response = await fetchDataWithRetry(() =>
      notionClient.databases.query({
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

// get all entries from notion on initial load and create a cache in the PAGES_CACHE_PATH
export async function getAllEntries() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(PAGES_CACHE_PATH, "utf8"));
  } catch (error) {
    console.log("Notion Pages cache not initialized. Pages will be fetched now. It may take up to 10 minutes");
  }

  // if (!cachedData) {
  const projects = JSON.parse(JSON.stringify(await getProjects()));
  const technologies = JSON.parse(JSON.stringify(await getTechnologies()));
  const photography = JSON.parse(JSON.stringify(await getPhotography()));
  const singlePages = JSON.parse(JSON.stringify(await getSinglePages()));
  const education = JSON.parse(JSON.stringify(await getEducation()));
  cachedData = {
    projects: projects,
    technologies: technologies,
    photography: photography,
    singlePages: singlePages,
    education: education,
  };

  // Write the fetched data to the notionpages.json file
  fs.writeFileSync(PAGES_CACHE_PATH, JSON.stringify(cachedData, null, 2));
  // }
  console.log("cachedData", cachedData);

  return cachedData;
}

// refetches the image source for block images (inside a page's content)
// called via NotionBlockImage.tsx component
export const getBlockImageSrc = async (blockId: string) => {
  const supportedBlockType = "image";
  const block = await notionClient.blocks.retrieve({ block_id: blockId });
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

// refetches the image source for property images (inside a page's properties)
// then rewrites them to the local PAGES_CACHE_PATH cache
// requires cacheProperty and cacheCategory variables called via NotionPropertyImage.tsx component
export const getPropertyImageSrc = async (pageId: string, propertyId: string, cacheCategory: string, cacheProperty: string): Promise<string[]> => {
  const response: any = await notionClient.pages.properties.retrieve({ page_id: pageId, property_id: propertyId });
  const newImageSrc = response.files[0]?.file?.url ?? "";
  await enqueueRewrite(pageId, cacheCategory, newImageSrc, propertyId, cacheProperty);
  return newImageSrc;
};

export const getCoverImageSrc = async (pageId: string, cacheCategory: string): Promise<string[]> => {
  const response: any = await notionClient.pages.retrieve({ page_id: pageId });
  const newImageSrc = response.cover?.file.url ?? "";
  console.log("response", response);
  await enqueueRewrite(pageId, cacheCategory, newImageSrc);
  return newImageSrc;
};
