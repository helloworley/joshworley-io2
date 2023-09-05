import { NextApiHandler } from "next";
import { getCoverImageSrc } from "@/lib/notion/notion";

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
