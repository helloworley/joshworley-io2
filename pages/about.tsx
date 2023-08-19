import PageLayout from "@/components/layout/PageLayout";
import { getAllEntries } from "@/lib/notion/notion";
import LabelContent from "@/components/common/LabelContent";
import Divider from "@/components/common/Divider";
import RenderBlock from "@/components/common/RenderBlock";
import BlurredBackground from "@/components/layout/BlurredBackground";
import Image from "next/image";
import Education from "@/components/common/Education";

export default function Home({ allEntries }) {
  const pageContent = allEntries.singlePages.filter(page => page.slug === "about")[0];
  const education = allEntries.education;

  console.log("pageContent", pageContent);

  const aside = (
    <div>
      <Image src="/josh-worley.jpg" alt="Josh Worley" width={160} height={160} layout="responsive" className="rounded-xl" />
    </div>
  );

  const content = (
    <div className="grid gap-10">
      <div>
        <p className="text-mist-60 font-sans-serif mb-2">{pageContent.name}</p>
        <h1 className="text-4xl text-white">Josh Worley</h1>
      </div>
      <LabelContent label="Overview" content={pageContent.overview} className="lg:mt-1" />
      <Divider />
      <div className="grid gap-8">
        {education.map(item => {
          return <Education education={item} key={item.name} />;
        })}
      </div>
      <Divider />
      <div>
        {pageContent.childBlocks?.map((block, i) => (
          <RenderBlock allBlocks={pageContent.childBlocks} block={block} key={i} />
        ))}
      </div>
    </div>
  );

  return (
    <BlurredBackground image="/default-background.jpeg">
      <PageLayout content={content} aside={aside} />
    </BlurredBackground>
  );
}

export const getStaticProps = async () => {
  const allEntries = await getAllEntries();

  return {
    props: { allEntries },
    revalidate: 1,
  };
};
