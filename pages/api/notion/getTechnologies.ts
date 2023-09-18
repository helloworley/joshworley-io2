import { getDatabase } from "@/pages/api/notion/notion";
export const database = process.env.NOTION_TECHNOLOGIES_DATABASE;
import cache from "memory-cache";

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

export default async (req, res) => {
  try {
    console.log("trying database fetch for technologies");
    let technologies = cache.get("technologies");

    if (!technologies) {
      const result = await getDatabase(database);
      if (result.length > 0) {
        const transformedPages = result.map(page => transformPage(page));
        technologies = transformedPages.sort((a, b) => a.name.localeCompare(b.name));
        cache.put("technologies", technologies, 1800000); // Cache for 30 minutes
      } else {
        res.status(404).json({ error: "Technologies not found" });
      }
    }

    res.status(200).json(technologies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error at getTechnologies" });
  }
};
