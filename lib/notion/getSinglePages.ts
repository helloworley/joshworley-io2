import { getDatabase } from "./notion";
export const database = process.env.NOTION_SINGLE_PAGES_DATABASE;
import { getChildBlocks } from "./getChildBlocks";

export const getSinglePages = async () => {
  const result = await getDatabase(database);
  const allChildBlocks = await getChildBlocks(result);

  const transformPage = (page, childBlocks) => {
    return {
      name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
      overview: page.properties["Overview"]?.rich_text[0]?.plain_text ?? "",
      slug: page.properties["Slug"]?.rich_text[0]?.plain_text ?? "",
      childBlocks: childBlocks.map(block => {
        // Remove unnecessary fields from block
        delete block.created_time;
        delete block.last_edited_time;
        delete block.created_by;
        delete block.last_edited_by;
        return block;
      }),
    };
  };
  const transformedPages = result.map((page, i) => transformPage(page, allChildBlocks[i]));
  const orderedPages = transformedPages.sort((a, b) => b.name - a.name);

  return orderedPages;
};
