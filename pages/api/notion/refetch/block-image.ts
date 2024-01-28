import { NextApiHandler } from "next";
import { notionClient } from "@/pages/api/notion/notion";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// refetches the image source for block images (inside a page's content)
// called via NotionBlockImage.tsx component
export const getBlockImageSrc = async (blockId: string) => {
  const supportedBlockType = "image";
  const block = await notionClient.blocks.retrieve({ block_id: blockId });
  const imageBlock = block as unknown as ImageBlockObjectResponse;
  if (imageBlock.type !== supportedBlockType) {
    throw new Error("Block is not an image");
  }
  const image = imageBlock.image;
  if (image.type === "external") {
    return image.external.url;
  }
  return image.file.url;
};

const handler: NextApiHandler = async (req, res) => {
  const blockId = req.query.blockId as string;
  if (blockId == null) {
    res.status(404).json({ message: "Block ID is not defined" });
    return;
  }
  const imageSrc = await getBlockImageSrc(blockId);
  res.json({ imageSrc });
};

export default handler;
