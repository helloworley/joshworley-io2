import { getDatabase } from "./notion";
import cache from "memory-cache";

export const database = process.env.NOTION_PROJECTS_DATABASE;

const filter = {
  property: "Decision",
  select: {
    equals: "Include",
  },
};

export default async (req, res) => {
  try {
    let slugs = cache.get("project-slugs");

    if (!slugs) {
      const result = await getDatabase(database, filter);
      slugs = result.map(page => ({ slug: page.properties.Slug?.rich_text[0]?.plain_text ?? "" }));
      cache.put("project-slugs", slugs, 1800000); // Cache for 30 minutes
    }

    res.status(200).json(slugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
