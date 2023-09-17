// pages/api/page/[slug].tsx
import { getDatabase } from "@/pages/api/notion/notion";
import { getChildBlocks } from "@/pages/api/notion/getChildBlocks"; // Import the getChildBlocks function
export const database = process.env.NOTION_PROJECTS_DATABASE;

const transformPage = (page, childBlocks) => {
  const { Decision, Brand, Date, Industry, Name, Position, Slug, Technologies, Logo, URL } = page.properties;
  return {
    id: page.id,
    cover: {
      pageId: page.id,
      url: page.cover?.file.url,
    },
    decision: Decision?.select?.name,
    brand: Brand?.rich_text[0]?.plain_text ?? "",
    brand_about: page.properties["Brand About"]?.rich_text[0]?.plain_text ?? "",
    date: Date?.date?.start ?? "",
    dateDisplay: page.properties["Date Display"]?.rich_text[0]?.plain_text ?? "",
    industry: Industry?.multi_select?.map(item => item.name) ?? "",
    name: Name?.title?.[0]?.plain_text ?? "",
    position: Position?.select?.name ?? "",
    project_about: page.properties["Project About"]?.rich_text[0]?.plain_text ?? "",
    project_type: page.properties["Project Type"]?.multi_select?.map(item => item.name) ?? "",
    seo_description: page.properties["SEO Description"]?.rich_text[0]?.plain_text ?? "",
    slug: Slug?.rich_text[0]?.plain_text ?? "",
    technologies: Technologies?.multi_select?.map(item => item.name) ?? "",
    logo: {
      url: Logo?.files[0]?.file?.url ?? "",
      databaseId: page.parent.database_id,
      pageId: page.id,
      propertyId: Logo?.id,
    },
    url: URL?.url ?? "",
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
  const { slug } = req.query;

  const filter = {
    property: "Slug",
    rich_text: {
      equals: slug,
    },
  };

  try {
    // Fetch the page data based on the slug from your Notion database
    console.log("trying database fetch for ", slug);
    const result = await getDatabase(database, filter);

    if (result.length > 0) {
      // Fetch child blocks for the page
      const childBlocks = await getChildBlocks([result[0]]);
      // Transform the page data using the transformPage function
      const transformedPage = transformPage(result[0], childBlocks[0]);
      res.status(200).json(transformedPage);
    } else {
      res.status(404).json({ error: "Page not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
