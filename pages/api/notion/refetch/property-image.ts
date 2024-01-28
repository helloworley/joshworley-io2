import { NextApiHandler } from "next";
import { notionClient } from "@/pages/api/notion/notion";
import { enqueueRewrite } from "@/pages/api/notion/refetch/rewriteCacheUrl";

// refetches the image source for property images (inside a page's properties)
// then rewrites them to the local PAGES_CACHE_PATH cache
// requires cacheProperty and cacheCategory variables called via NotionPropertyImage.tsx component
export const getPropertyImageSrc = async (pageId: string, propertyId: string, cacheCategory: string, cacheProperty: string): Promise<string[]> => {
  const response: any = await notionClient.pages.properties.retrieve({ page_id: pageId, property_id: propertyId });
  const newImageSrc = response.files[0]?.file?.url ?? "";
  await enqueueRewrite(pageId, cacheCategory, newImageSrc, propertyId, cacheProperty);
  return newImageSrc;
};

const handler: NextApiHandler = async (req, res) => {
  // for property images
  // const databaseId = req.query.databaseId as string;
  const pageId = req.query.pageId as string;
  const propertyId = req.query.propertyId as string;
  const cacheCategory = req.query.cacheCategory as string;
  const cacheProperty = req.query.cacheProperty as string;

  if (pageId == null) {
    res.status(404).json({ message: "Page ID is not defined" });
    return;
  }

  if (pageId && propertyId) {
    const imageSrc = await getPropertyImageSrc(pageId, propertyId, cacheCategory, cacheProperty);
    res.json({ imageSrc });
  }
};

export default handler;
