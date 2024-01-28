import { NextApiHandler } from "next";
import { notionClient } from "@/pages/api/notion/notion";
import { enqueueRewrite } from "@/pages/api/notion/refetch/rewriteCacheUrl";

export const getCoverImageSrc = async (pageId: string, cacheCategory: string): Promise<string[]> => {
  const response: any = await notionClient.pages.retrieve({ page_id: pageId });
  const newImageSrc = response.cover?.file.url ?? "";
  console.log("response", response);
  await enqueueRewrite(pageId, cacheCategory, newImageSrc);
  return newImageSrc;
};

const handler: NextApiHandler = async (req, res) => {
  // for property images
  // const databaseId = req.query.databaseId as string;
  const pageId = req.query.pageId as string;
  const cacheCategory = req.query.cacheCategory as string;
  if (pageId == null) {
    res.status(404).json({ message: "Page ID is not defined" });
    return;
  }
  if (pageId && cacheCategory) {
    const imageSrc = await getCoverImageSrc(pageId, cacheCategory);
    res.json({ imageSrc });
  }
};

export default handler;
