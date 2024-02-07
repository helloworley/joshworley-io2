import { GetStaticProps } from "next";
import fetchContent from "@/lib/strapi/fetchContent";
import PageLayout from "@/components/layout/PageLayout";
import TitleDescription from "@/components/common/TitleDescription";
import ProjectCard from "@/components/common/ProjectCard";
import BlurredBackground from "@/components/layout/BlurredBackground";
import Seo from "@/components/common/Seo";
import SideNavLayout from "@/components/layout/SideNavLayout";
import { orderByDate } from "@/lib/helpers";

export default function Page({ projects }) {
  const _projects = orderByDate(
    projects?.data?.map(project => {
      return project.attributes;
    }),
  );
  const content = (
    <div className="grid gap-8">
      <TitleDescription
        title="Design & Development"
        description="A collection of projects that Josh has designed and developed throughout the years. "
      />
      <div className="mt-8 grid gap-5 lg:gap-4 xl:grid-cols-2 2xl:gap-8">
        {_projects?.map(project => {
          return <ProjectCard project={project} key={project.name} />;
        })}
      </div>
    </div>
  );

  return (
    <>
      <Seo title="Design & Development" description="A collection of projects that Josh has designed and developed throughout the years. " />
      <SideNavLayout>
        <BlurredBackground image="/default-background.jpeg">
          <PageLayout content={content} />
        </BlurredBackground>
      </SideNavLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await fetchContent("projects");

  return {
    props: {
      projects,
    },
  };
};
