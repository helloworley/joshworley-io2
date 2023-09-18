import { getDatabase } from "@/pages/api/notion/notion";
export const database = process.env.NOTION_EDUCATION_DATABASE;
import cache from "memory-cache";

const transformEducation = entry => {
  return {
    name: entry.properties["Name"]?.title?.[0]?.plain_text ?? "",
    date: entry.properties["Date"]?.date?.start ?? "",
    dateDisplay: entry.properties["Date Display"]?.rich_text[0]?.plain_text ?? "",
    certification: entry.properties["Certification"]?.rich_text[0]?.plain_text ?? "",
    location: entry.properties["Location"]?.rich_text[0]?.plain_text ?? "",
    logo: {
      url: entry.properties["Logo"]?.files[0]?.file?.url ?? "",
      databaseId: entry.parent.database_id,
      pageId: entry.id,
      propertyId: entry.properties["Logo"].id,
    },
  };
};

export default async (req, res) => {
  try {
    console.log("trying database fetch for education");
    let education = cache.get("education");

    if (!education) {
      const result = await getDatabase(database);
      if (result.length > 0) {
        const transformedEducation = result.map(entry => transformEducation(entry));
        education = transformedEducation.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        cache.put("education", education, 1800000); // Cache for 30 minutes
      } else {
        res.status(404).json({ error: "Education not found" });
        return;
      }
    }
    res.status(200).json(education);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error at getEducation" });
  }
};
