import { getDatabase } from "@/pages/api/notion/notion";
export const database = process.env.NOTION_EDUCATION_DATABASE;

export const getEducation = async () => {
  const result = await getDatabase(database);

  const transformPage = page => {
    return {
      name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
      date: page.properties["Date"]?.date?.start ?? "",
      dateDisplay: page.properties["Date Display"]?.rich_text[0]?.plain_text ?? "",
      certification: page.properties["Certification"]?.rich_text[0]?.plain_text ?? "",
      location: page.properties["Location"]?.rich_text[0]?.plain_text ?? "",
      logo: {
        url: page.properties["Logo"]?.files[0]?.file?.url ?? "",
        databaseId: page.parent.database_id,
        pageId: page.id,
        propertyId: page.properties["Logo"].id,
      },
    };
  };
  const transformedPages = result.map(page => transformPage(page));
  const orderedPages = transformedPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return orderedPages;
};
