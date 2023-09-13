import fs from "fs";
import { PAGES_CACHE_PATH } from "./notion";

const queue = [];
let isRunning = false;

// create a queue for ensuring requests are handled synchronously
// for example, if 10 requests come to rewriteCacheUrl, cache will be rewritten 10 times in order
const processQueue = async () => {
  if (queue.length === 0 || isRunning) {
    return;
  }
  isRunning = true;
  const { pageId, propertyId, cacheCategory, cacheProperty, newUrl } = queue.shift();
  console.log(`processing propertyId:${propertyId} of pageId:${pageId}`);
  await rewriteCacheUrl(pageId, propertyId, cacheCategory, cacheProperty, newUrl);
  console.log(pageId, "finished");
  isRunning = false;
  // Process the next item in the queue
  processQueue();
};

// rewrite a single url to the cache
const rewriteCacheUrl = async (pageId: string, propertyId: string, cacheCategory: string, cacheProperty: string, newUrl: string) => {
  console.log("try rewriting url");

  // if it's a notion property image
  if (propertyId) {
    // load the cached data
    let cachedData = JSON.parse(fs.readFileSync(PAGES_CACHE_PATH, "utf8"));
    // find the specific entry in the cacheCategory array
    const entry = cachedData[cacheCategory].find(item => item[cacheProperty].pageId === pageId && item[cacheProperty].propertyId === propertyId);
    // update the URL if the entry is found
    if (entry && entry[cacheProperty]) {
      entry[cacheProperty].url = newUrl;
    } else {
      console.error(`Entry with pageId: ${pageId} and propertyId: ${propertyId} not found.`);
      return;
    }
    // save the updated data back to the PAGES_CACHE_PATH file
    fs.writeFileSync(PAGES_CACHE_PATH, JSON.stringify(cachedData, null, 2));

    // else if it's a page cover image
  } else {
    // load the cached data
    let cachedData = JSON.parse(fs.readFileSync(PAGES_CACHE_PATH, "utf8"));
    // find the specific entry in the cacheCategory array
    const entry = cachedData[cacheCategory].find(item => item.pageId === pageId);
    // update the URL if the entry is found
    if (entry) {
      entry.cover.url = newUrl;
    } else {
      console.error(`Entry with pageId: ${pageId} not found.`);
      return;
    }
    // save the updated data back to the PAGES_CACHE_PATH file
    fs.writeFileSync(PAGES_CACHE_PATH, JSON.stringify(cachedData, null, 2));
  }

  console.log("url rewrote");
};

export const enqueueRewrite = async (pageId: string, cacheCategory: string, newUrl: string, propertyId?: string, cacheProperty?: string) => {
  console.log("begin queue");
  queue.push({ pageId, propertyId, cacheCategory, cacheProperty, newUrl });
  processQueue();
  console.log("end queue");
};
