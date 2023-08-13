import { Client } from "@notionhq/client";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import fs from "fs";
import path from "path";
import { RateLimit } from "async-sema";
import { getProjects } from "./getProjects";
import { getTechnologies } from "./getTechnologies";
import { getPhotography } from "./getPhotography";

export const database1 = process.env.NOTION_PROJECTS_DATABASE;
export const database2 = process.env.NOTION_TECHNOLOGIES_DATABASE;

export const databases = [database1, database2];

export const PAGES_CACHE_PATH = path.resolve("notionpages.json");

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

export const fetchChildBlocks = async (blockId: string, level: number = 0) => {
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

export async function getAllEntries() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(PAGES_CACHE_PATH, "utf8"));
  } catch (error) {
    console.log("Notion Pages cache not initialized. Pages will be fetched now. It may take up to 10 minutes");
  }

  if (!cachedData) {
    const projects = JSON.parse(JSON.stringify(await getProjects()));
    const technologies = JSON.parse(JSON.stringify(await getTechnologies()));
    const photography = JSON.parse(JSON.stringify(await getPhotography()));
    cachedData = {
      projects: projects,
      technologies: technologies,
      photography: photography,
    };

    // Write the fetched data to the notionpages.json file
    fs.writeFileSync(PAGES_CACHE_PATH, JSON.stringify(cachedData, null, 2));
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
