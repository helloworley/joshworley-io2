import { notionClient, rateLimiter, fetchDataWithRetry } from "./notion";

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
      notionClient.blocks.children.list({
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

export const getChildBlocks = async pages => {
  const childBlockPromises = await pages.map(async (page: any, index: number, array: any[]) => {
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
  const allChildBlocks = await Promise.all(childBlockPromises);
  return allChildBlocks;
};
