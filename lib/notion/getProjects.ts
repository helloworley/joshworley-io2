import fs from "fs";
import { getDatabase, PAGES_CACHE_PATH, fetchChildBlocks } from "./notion";
export const database = process.env.NOTION_PROJECTS_DATABASE;

export const getProjects = async () => {
  const result = await getDatabase(database);

  const livePages = await result.filter(page => page.properties.Decision?.select?.name === "Include");

  const childBlocksPromises = livePages.map(async (page, index, array) => {
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

  const allChildBlocks = await Promise.all(childBlocksPromises);

  const transformPage = (page, childBlocks) => {
    return {
      // page: page,
      decision: page.properties.Decision?.select?.name,
      brand: page.properties.Brand?.rich_text[0]?.plain_text ?? "",
      brand_about: page.properties["Brand About"]?.rich_text[0]?.plain_text ?? "",
      date: page.properties["Date"]?.date?.start ?? "",
      dateDisplay: page.properties["Date Display"]?.rich_text[0]?.plain_text ?? "",
      industry: page.properties.Industry?.multi_select?.map(item => item.name) ?? "",
      logo: page.properties.Logo?.files[0]?.file?.url ?? "",
      name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
      position: page.properties.Position?.select?.name ?? "",
      project_about: page.properties["Project About"]?.rich_text[0]?.plain_text ?? "",
      project_type: page.properties["Project Type"]?.multi_select?.map(item => item.name) ?? "",
      seo_description: page.properties["SEO Description"]?.rich_text[0]?.plain_text ?? "",
      slug: page.properties["Slug"]?.rich_text[0]?.plain_text ?? "",
      technologies: page.properties.Technologies?.multi_select?.map(item => item.name) ?? "",
      url: page.properties["URL"]?.url ?? "",
      childBlocks: childBlocks.map(block => {
        // Remove unnecessary fields from block
        delete block.created_time;
        delete block.last_edited_time;
        delete block.created_by;
        delete block.last_edited_by;
        return block;
      }),
      // },
    };
  };

  const transformedPages = livePages.map((page, i) => transformPage(page, allChildBlocks[i]));
  const sortedPages = transformedPages.filter(page => page.decision === "Include");
  const orderedPages = sortedPages.sort((a, b) => a.date - b.date);
  // const sortedPages = transformedPages.sort((a, b) => a.ecosystemPage.order - b.ecosystemPage.order);
  try {
    fs.writeFileSync(PAGES_CACHE_PATH, JSON.stringify(orderedPages), "utf8");
    console.log("Wrote to notionpages cache");
  } catch (error) {
    console.log("ERROR WRITING PAGES CACHE TO FILE");
    console.log(error);
  }

  return orderedPages;
};
