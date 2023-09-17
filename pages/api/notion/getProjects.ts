import { getDatabase } from "@/pages/api/notion/notion";
export const database = process.env.NOTION_PROJECTS_DATABASE;
// import { getChildBlocks } from "./getChildBlocks";

const filter = {
  property: "Decision",
  select: {
    equals: "Include",
  },
};

export const getProjects = async () => {
  try {
    // 1
    // const allChildBlocks = await getChildBlocks(livePages);

    // 3
    const result = await getDatabase(database, filter);
    const livePages = result.filter(page => page.properties.Decision?.select?.name === "Include");
    // Fetch child blocks for all live pages in parallel
    // const allChildBlocksPromises = livePages.map(page => getChildBlocks([page]));
    // const allChildBlocksResults = await Promise.all(allChildBlocksPromises);

    // const transformPage = (page, childBlocks) => {
    const transformPage = page => {
      const { Decision, Brand, Date, Industry, Name, Position, Slug, Technologies, Logo, URL } = page.properties;
      return {
        id: page.id,
        cover: {
          pageId: page.id,
          url: page.cover?.file.url,
        },
        decision: Decision?.select?.name,
        brand: Brand?.rich_text[0]?.plain_text ?? "",
        brand_about: page.properties["Brand About"]?.rich_text[0]?.plain_text ?? "",
        date: Date?.date?.start ?? "",
        dateDisplay: page.properties["Date Display"]?.rich_text[0]?.plain_text ?? "",
        industry: Industry?.multi_select?.map(item => item.name) ?? "",
        name: Name?.title?.[0]?.plain_text ?? "",
        position: Position?.select?.name ?? "",
        project_about: page.properties["Project About"]?.rich_text[0]?.plain_text ?? "",
        project_type: page.properties["Project Type"]?.multi_select?.map(item => item.name) ?? "",
        seo_description: page.properties["SEO Description"]?.rich_text[0]?.plain_text ?? "",
        slug: Slug?.rich_text[0]?.plain_text ?? "",
        technologies: Technologies?.multi_select?.map(item => item.name) ?? "",
        logo: {
          url: Logo?.files[0]?.file?.url ?? "",
          databaseId: page.parent.database_id,
          pageId: page.id,
          propertyId: Logo?.id,
        },
        url: URL?.url ?? "",
        // childBlocks: childBlocks.map(block => {
        //   // Remove unnecessary fields from block
        //   delete block.created_time;
        //   delete block.last_edited_time;
        //   delete block.created_by;
        //   delete block.last_edited_by;
        //   return block;
        // }),
      };
    };

    // 3
    // Now, allChildBlocksResults is an array of arrays, so we use allChildBlocksResults[i][0] to get the child blocks for each page
    // const transformedPages = livePages.map((page, i) => transformPage(page, allChildBlocksResults[i][0]));
    const transformedPages = livePages.map((page, i) => transformPage(page));

    // Filter and sort pages
    const sortedPages = transformedPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return sortedPages;
  } catch (error) {
    console.error("Error in getProjects:", error);
    // Handle the error appropriately here
    return [];
  }
};
