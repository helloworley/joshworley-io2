import cache from "memory-cache";

let queue = [];
let isRunning = false;

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
  processQueue();
};

const rewriteCacheUrl = async (pageId: string, propertyId: string, cacheCategory: string, cacheProperty: string, newUrl: string) => {
  console.log("try rewriting url");

  const cachedData = cache.get("notionData") || {};

  if (propertyId) {
    const categoryData = cachedData[cacheCategory] || [];
    const entryIndex = categoryData.findIndex(item => item[cacheProperty]?.pageId === pageId && item[cacheProperty]?.propertyId === propertyId);

    if (entryIndex !== -1) {
      categoryData[entryIndex][cacheProperty].url = newUrl;
      cachedData[cacheCategory] = categoryData;
    } else {
      console.error(`Entry with pageId: ${pageId} and propertyId: ${propertyId} not found.`);
      return;
    }
  } else {
    const entryIndex = cachedData[cacheCategory]?.findIndex(item => item.pageId === pageId);

    if (entryIndex !== -1) {
      cachedData[cacheCategory][entryIndex].cover.url = newUrl;
    } else {
      console.error(`Entry with pageId: ${pageId} not found.`);
      return;
    }
  }

  cache.put("notionData", cachedData, 3600000); // Cache for 1 hour

  console.log("url rewrote");
};

export const enqueueRewrite = async (pageId: string, cacheCategory: string, newUrl: string, propertyId?: string, cacheProperty?: string) => {
  console.log("begin queue");
  queue.push({ pageId, propertyId, cacheCategory, cacheProperty, newUrl });
  processQueue();
  console.log("end queue");
};
