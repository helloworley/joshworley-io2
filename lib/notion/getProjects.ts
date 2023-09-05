import { getDatabase } from "./notion";
export const database = process.env.NOTION_PROJECTS_DATABASE;
import { getChildBlocks } from "./getChildBlocks";

export const getProjects = async () => {
  const result = await getDatabase(database);

  const livePages = await result.filter(page => page.properties.Decision?.select?.name === "Include");
  const allChildBlocks = await getChildBlocks(livePages);

  const transformPage = (page, childBlocks) => {
    return {
      page: page,
      id: page.id,
      cover: {
        pageId: page.id,
        url: page.cover?.file.url,
      },
      decision: page.properties.Decision?.select?.name,
      brand: page.properties.Brand?.rich_text[0]?.plain_text ?? "",
      brand_about: page.properties["Brand About"]?.rich_text[0]?.plain_text ?? "",
      date: page.properties["Date"]?.date?.start ?? "",
      dateDisplay: page.properties["Date Display"]?.rich_text[0]?.plain_text ?? "",
      industry: page.properties.Industry?.multi_select?.map(item => item.name) ?? "",
      name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
      position: page.properties.Position?.select?.name ?? "",
      project_about: page.properties["Project About"]?.rich_text[0]?.plain_text ?? "",
      project_type: page.properties["Project Type"]?.multi_select?.map(item => item.name) ?? "",
      seo_description: page.properties["SEO Description"]?.rich_text[0]?.plain_text ?? "",
      slug: page.properties["Slug"]?.rich_text[0]?.plain_text ?? "",
      technologies: page.properties.Technologies?.multi_select?.map(item => item.name) ?? "",
      logo: {
        url: page.properties["Logo"]?.files[0]?.file?.url ?? "",
        databaseId: page.parent.database_id,
        pageId: page.id,
        propertyId: page.properties["Logo"].id,
      },
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
  const orderedPages = sortedPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return orderedPages;
};
