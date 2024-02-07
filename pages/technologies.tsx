import PageLayout from "@/components/layout/PageLayout";
import TitleDescription from "@/components/common/TitleDescription";
import Technology from "@/components/common/Technology";
import BlurredBackground from "@/components/layout/BlurredBackground";
import Seo from "@/components/common/Seo";
import SideNavLayout from "@/components/layout/SideNavLayout";
import { GetStaticProps } from "next";
import fetchContent from "@/lib/strapi/fetchContent";

export default function Page({ technologies }) {
  const _technologies = technologies.data.map((tech, i) => {
    const { name, type, url, icon } = tech.attributes;
    return { name, type, url, icon };
  });
  const content = (
    <>
      <TitleDescription
        title="Technologies"
        description="Josh has years of professional experience and working knowledge of the following design applications and frontend technologies."
      />
      <div className="mt-10 grid grid-cols-2 gap-3 gap-y-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {_technologies?.map(tech => {
          return <Technology tech={tech} key={tech.name} />;
        })}
      </div>
    </>
  );

  return (
    <>
      <Seo
        title="Technologies"
        description="Josh has years of professional experience and working knowledge of the following design applications and frontend technologies."
      />
      <SideNavLayout>
        <BlurredBackground image="/default-background.jpeg">
          <PageLayout content={content} />
        </BlurredBackground>
      </SideNavLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const technologies = await fetchContent("technologies");

  return {
    props: {
      technologies,
    },
  };
};
