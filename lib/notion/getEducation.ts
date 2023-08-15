import fs from "fs";
import { getDatabase, PAGES_CACHE_PATH } from "./notion";
export const database = process.env.NOTION_EDUCATION_DATABASE;

export const getEducation = async () => {
  const result = await getDatabase(database);

  const transformPage = page => {
    return {
      logo: page.properties["Logo"]?.files[0]?.file?.url ?? "",
      name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
      date: page.properties["Date"]?.date?.start ?? "",
      dateDisplay: page.properties["Date Display"]?.rich_text[0]?.plain_text ?? "",
      certification: page.properties["Certification"]?.rich_text[0]?.plain_text ?? "",
      location: page.properties["Location"]?.rich_text[0]?.plain_text ?? "",
    };
  };
  const transformedPages = result.map((page, i) => transformPage(page));
  const orderedPages = transformedPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  try {
    fs.writeFileSync(PAGES_CACHE_PATH, JSON.stringify(orderedPages), "utf8");
    console.log("Wrote to notionpages cache");
  } catch (error) {
    console.log("ERROR WRITING PAGES CACHE TO FILE");
    console.log(error);
  }

  return orderedPages;
};
