import PageLayout from "@/components/layout/PageLayout";
import LabelContent from "@/components/common/LabelContent";
import Divider from "@/components/common/Divider";
import RenderBlock from "@/components/common/RenderBlock";
import BlurredBackground from "@/components/layout/BlurredBackground";
import Image from "next/image";
import Education from "@/components/common/Education";
import Seo from "@/components/common/Seo";

export default function Home({ data }) {
  const about = data.singlePages.filter(page => page.name === "About")[0];

  const aside = (
    <div>
      <Image src="/josh-worley.jpg" alt="Josh Worley" width={160} height={160} layout="responsive" className="rounded-xl" />
    </div>
  );

  const content = (
    <div className="grid gap-10">
      <div>
        <p className="text-mist-60 font-sans-serif mb-2">{about.name}</p>
        <h1 className="text-4xl text-white">Josh Worley</h1>
      </div>
      <LabelContent label="Overview" content={about.overview} className="lg:mt-1" />
      <Divider />
      <div className="grid gap-8">
        {data.education.map(item => {
          return <Education education={item} key={item.name} />;
        })}
      </div>
      <Divider />
      <div>
        {about.childBlocks?.map((block, i) => (
          <RenderBlock allBlocks={about.childBlocks} block={block} key={i} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Seo
        title="About"
        description="About Josh Worley. Josh is a Digital Designer, Frontend Developer, and Digital Producer with nearly a decade of professional experience in Japan and the United States."
      />
      <BlurredBackground image="/default-background.jpeg">
        <PageLayout content={content} aside={aside} />
      </BlurredBackground>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const response = await fetch(process.env.NEXT_NOTION_API_URL);
    const data = await response.json();
    return {
      props: {
        data,
      },
      revalidate: 3600, // Re-generate the page every 1 hour
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: null,
      },
    };
  }
};
