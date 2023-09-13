import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import cache from "memory-cache";
import { getProjects } from "@/lib/notion/getProjects";
import { getTechnologies } from "@/lib/notion//getTechnologies";
import { getPhotography } from "@/lib/notion//getPhotography";
import { getSinglePages } from "@/lib/notion//getSinglePages";
import { getEducation } from "@/lib/notion//getEducation";
import { RateLimit } from "async-sema";

export const database1 = process.env.NOTION_PROJECTS_DATABASE;
export const database2 = process.env.NOTION_TECHNOLOGIES_DATABASE;

export const databases = [database1, database2];

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let cachedData = cache.get("notionData");
  console.log("handling");
  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  try {
    const projects = await getProjects();
    const technologies = await getTechnologies();
    const photography = await getPhotography();
    const singlePages = await getSinglePages();
    const education = await getEducation();

    cachedData = {
      projects,
      technologies,
      photography,
      singlePages,
      education,
    };

    cache.put("notionData", cachedData, 3600000); // Cache for 1 hour
    res.status(200).json(cachedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
