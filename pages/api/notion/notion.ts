import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import cache from "memory-cache";
import { getProjects } from "@/pages/api/notion/getProjects";
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

// interface filterInterface {
//   property: string;
//   select: {
//     equals: string;
//   };
//   text: {
//     equals: string;
//   };
// }

export const getDatabase = async (databaseId: string, filter?: any) => {
  let startCursor = undefined;
  let hasMore = true;
  const results = [];
  while (hasMore) {
    await rateLimiter();
    const response = await fetchDataWithRetry(() =>
      notionClient.databases.query({
        database_id: databaseId,
        start_cursor: startCursor,
        filter: filter,
      }),
    );
    results.push(...response.results);
    if (!response.has_more) {
      hasMore = false;
    }
    startCursor = response.next_cursor;
  }
  return results;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse, callback?: (error?: Error, data?: any) => void) {
  let cachedData = cache.get("notionData");
  console.log("handling");
  if (cachedData) {
    if (callback) {
      callback(null, cachedData);
    } else {
      res.status(200).json(cachedData);
    }
    return;
  }

  try {
    const [projects] = await Promise.all([getProjects()]);

    cachedData = {
      projects,
    };

    cache.put("notionData", cachedData, 1800000); // Cache for 30 min

    if (callback) {
      callback(null, cachedData);
    } else {
      res.status(200).json(cachedData);
    }
  } catch (error) {
    console.error(error);
    if (callback) {
      callback(error);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
