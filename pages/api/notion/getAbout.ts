import { getDatabase } from "@/pages/api/notion/notion";
export const database = process.env.NOTION_SINGLE_PAGES_DATABASE;
import cache from "memory-cache";

import { getChildBlocks } from "./getChildBlocks";

const transformPage = (page, childBlocks) => {
  return {
    name: page.properties["Name"]?.title?.[0]?.plain_text ?? "",
    overview: page.properties["Overview"]?.rich_text[0]?.plain_text ?? "",
    slug: page.properties["Slug"]?.rich_text[0]?.plain_text ?? "",
    childBlocks: childBlocks.map(block => {
      // Remove unnecessary fields from block
      delete block.created_time;
      delete block.last_edited_time;
      delete block.created_by;
      delete block.last_edited_by;
      return block;
    }),
  };
};

export default async (req, res) => {
  const filter = {
    property: "Slug",
    rich_text: {
      equals: "about",
    },
  };

  try {
    console.log("trying database fetch for about");
    let about = cache.get("about");

    if (!about) {
      const result = await getDatabase(database, filter);
      if (result.length > 0) {
        // Fetch child blocks for the page
        const childBlocks = await getChildBlocks([result[0]]);
        // Transform the page data using the transformPage function
        about = transformPage(result[0], childBlocks[0]);
        cache.put("about", about, 1800000); // Cache for 30 minutes
      } else {
        res.status(404).json({ error: "About page not found" });
        return;
      }
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error at getAbout" });
  }
};
