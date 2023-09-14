import { getDatabase } from "@/pages/api/notion";
export const database = process.env.NOTION_TECHNOLOGIES_DATABASE;

export const getTechnologies = async () => {
  const result = await getDatabase(database);

  const transformPage = page => {
    return {
      name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
      url: page.properties["URL"]?.url ?? "",
      type: page.properties["Type"]?.multi_select?.map(item => item.name) ?? "",
      icon: {
        url: page.properties["Icon"]?.files[0]?.file?.url ?? "",
        databaseId: page.parent.database_id,
        pageId: page.id,
        propertyId: page.properties["Icon"].id,
      },
    };
  };
  const transformedPages = result.map(page => transformPage(page));
  const orderedPages = transformedPages.sort((a, b) => a.name.localeCompare(b.name));

  return orderedPages;
};
