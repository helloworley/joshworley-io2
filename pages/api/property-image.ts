// TODO: Delete

import { NextApiHandler } from "next";
import { getPropertyImageSrc } from "@/lib/notion/notion";

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
