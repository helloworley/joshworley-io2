import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";
import { RateLimit } from "async-sema";
import { getProjects } from "./getProjects";
import { getTechnologies } from "./getTechnologies";
import { getPhotography } from "./getPhotography";
import { getSinglePages } from "./getSinglePages";
import { getEducation } from "./getEducation";

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
