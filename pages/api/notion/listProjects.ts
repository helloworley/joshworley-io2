import { getDatabase } from "./notion";
export const database = process.env.NOTION_PROJECTS_DATABASE;

export default async (req, res) => {
  try {
    const result = await getDatabase(database);
    const slugs = result.map(page => ({ slug: page.properties.Slug?.rich_text[0]?.plain_text ?? "" }));
    res.status(200).json(slugs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
