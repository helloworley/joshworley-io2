import { getDatabase } from "@/pages/api/notion/notion";
export const database = process.env.NOTION_PHOTOGRAPHY_DATABASE;
import cache from "memory-cache";

const transformPhoto = photo => {
  return {
    name: photo.properties["Name"]?.title?.[0]?.plain_text ?? "",
    image: {
      url: photo.properties.Image?.files[0]?.file?.url ?? "",
      databaseId: photo.parent.database_id,
      pageId: photo.id,
      propertyId: photo.properties["Image"].id,
    },
  };
};

export default async (req, res) => {
  try {
    console.log("trying database fetch for photography");
    let photography = cache.get("photography");

    if (!photography) {
      const result = await getDatabase(database);
      if (result.length > 0) {
        const transformedPhotos = result.map(photo => transformPhoto(photo));
        photography = transformedPhotos.sort((a, b) => a.name.localeCompare(b.name));
        cache.put("photography", photography, 1800000); // Cache for 30 minutes
      } else {
        res.status(404).json({ error: "Photography not found" });
      }
    }
    res.status(200).json(photography);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error at getPhotograpy" });
  }
};
