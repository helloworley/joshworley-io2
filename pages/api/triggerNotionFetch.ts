import { NextApiRequest, NextApiResponse } from "next";
import notionHandler from "./notion";

export default async function triggerNotionFetch(req: NextApiRequest, res: NextApiResponse) {
  try {
    await notionHandler(req, res, error => {
      if (error) {
        console.error("Error triggering Notion fetch:", error);
      } else {
        console.log("Fetch success");
      }
    });
  } catch (error) {
    console.error("Error triggering Notion fetch:", error);
    res.status(500).send("Fetch failed");
  }
}
