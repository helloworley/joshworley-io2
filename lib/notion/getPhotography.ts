import { getDatabase } from "./notion";
export const database = process.env.NOTION_PHOTOGRAPHY_DATABASE;

export const getPhotography = async () => {
  const result = await getDatabase(database);

  const liveImages = result.filter(entry => entry.properties["Include"]?.select?.name === "yes");

  const transformPage = page => {
    return {
      name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
      page: page,
      image: {
        url: page.properties.Image?.files[0]?.file?.url ?? "",
        databaseId: page.parent.database_id,
        pageId: page.id,
        propertyId: page.properties["Image"].id,
      },
    };
  };
  const transformedPages = liveImages.map(page => transformPage(page));
  const orderedPages = transformedPages.sort((a, b) => a.name.localeCompare(b.name));

  return orderedPages;
};
