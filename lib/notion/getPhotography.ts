import fs from "fs";
import { getDatabase, PAGES_CACHE_PATH } from "./notion";
export const database = process.env.NOTION_PHOTOGRAPHY_DATABASE;

export const getPhotography = async () => {
  const result = await getDatabase(database);

  const transformPage = page => {
    return {
      image: page.properties.Image?.files[0]?.file?.url ?? "",
      name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
      id: page.id,
    };
  };
  const transformedPages = result.map((page, i) => transformPage(page));
  const orderedPages = transformedPages.sort((a, b) => a.name.localeCompare(b.name));

  try {
    fs.writeFileSync(PAGES_CACHE_PATH, JSON.stringify(orderedPages), "utf8");
    console.log("Wrote to notionpages cache");
  } catch (error) {
    console.log("ERROR WRITING PAGES CACHE TO FILE");
    console.log(error);
  }

  return orderedPages;
};
