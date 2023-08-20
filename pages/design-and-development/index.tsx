import PageLayout from "@/components/layout/PageLayout";
import { getAllEntries } from "@/lib/notion/notion";
import TitleDescription from "@/components/common/TitleDescription";
import ProjectCard from "@/components/common/ProjectCard";
import BlurredBackground from "@/components/layout/BlurredBackground";

export default function Home({ allEntries }) {
  // console.log("allEntries", allEntries);

  const content = (
    <div className="grid gap-8">
      <TitleDescription
        title="Design & Development"
        description="A collection of projects that Josh has designed and/or developed throughout the years. Select a project to learn more about the project goal, design, and implementation."
      />
      <div className="grid gap-3 md:grid-cols-2 lg:gap-4">
        {allEntries.projects?.map(project => {
          return <ProjectCard project={project} key={project.name} />;
        })}
      </div>
    </div>
  );

  return (
    <BlurredBackground image="/default-background.jpeg">
      <PageLayout content={content} />
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
