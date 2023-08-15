import { NextApiHandler } from "next";
import { getImageSrc } from "../../lib/notion/notion";

const handler: NextApiHandler = async (req, res) => {
  const blockId = req.query.blockId as string;

  if (blockId == null) {
    res.status(404).json({ message: "Block ID is not defined" });
    return;
  }

  const imageSrc = await getImageSrc(blockId);
  res.json({ imageSrc });
};

export default handler;
