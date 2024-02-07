import { GetStaticProps } from "next";
import fetchContent from "@/lib/strapi/fetchContent";
import PageLayout from "@/components/layout/PageLayout";
import LabelContent from "@/components/common/LabelContent";
import Divider from "@/components/common/Divider";
import RenderBlock from "@/components/common/RenderBlock";
import BlurredBackground from "@/components/layout/BlurredBackground";
import Image from "next/image";
import Education from "@/components/common/Education";
import Seo from "@/components/common/Seo";
import SideNavLayout from "@/components/layout/SideNavLayout";
import BlockRendererClient from "@/components/common/BlockRendererClient";

export default function Home({ about, educations }) {
  const { content, overview } = about.data.attributes;

  const _educations = educations.data.map(ed => {
    const { certification, logo, name, date_display, location } = ed.attributes;
    return { certification, logo, name, date_display, location };
  });

  const aside = (
    <div>
      <Image src="/josh-worley.jpg" alt="Josh Worley" width={160} height={160} layout="responsive" className="rounded-xl" />
    </div>
  );

  const _content = (
    <div className="grid gap-10">
      <div>
        <p className="text-mist-60 font-sans-serif mb-2">{about.name}</p>
        <h1 className="text-4xl text-white">Josh Worley</h1>
      </div>
      <LabelContent label="Overview" content={<BlockRendererClient content={overview} textClasses="max-w-[640px]" />} className="mb-10 lg:mt-1" />
      <Divider />
      <div className="grid gap-8">
        {_educations.map(item => {
          return <Education education={item} key={item.name} />;
        })}
      </div>
      <Divider />
      <div>
        <BlockRendererClient content={content} textClasses="max-w-[640px]" />
      </div>
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
      <SideNavLayout>
        <BlurredBackground image="/default-background.jpeg">
          <PageLayout content={_content} aside={aside} />
        </BlurredBackground>
      </SideNavLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const about = await fetchContent("about");
  const educations = await fetchContent("educations");

  return {
    props: {
      about,
      educations,
    },
  };
};
