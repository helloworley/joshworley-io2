import { NextApiRequest, NextApiResponse } from "next";
import { getProjects } from "@/lib/notion/getProjects";
import { getTechnologies } from "@/lib/notion/getTechnologies";
import { getPhotography } from "@/lib/notion/getPhotography";
import { getSinglePages } from "@/lib/notion/getSinglePages";
import { getEducation } from "@/lib/notion/getEducation";
import cache from "memory-cache";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const projects = await getProjects();
    const technologies = await getTechnologies();
    const photography = await getPhotography();
    const singlePages = await getSinglePages();
    const education = await getEducation();

    const newData = {
      projects,
      technologies,
      photography,
      singlePages,
      education,
    };

    cache.put("notionData", newData, 1800000); // Cache for 30 min

    res.status(200).send("Cache Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
