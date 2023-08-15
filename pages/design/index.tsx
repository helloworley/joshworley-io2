import PageLayout from "@/components/layout/PageLayout";
import { getAllEntries } from "@/lib/notion/notion";
import TitleDescription from "@/components/common/TitleDescription";
import ProjectCard from "@/components/project/ProjectCard";
import BlurredBackground from "@/components/layout/BlurredBackground";

export default function Home({ allEntries }) {
  console.log("allEntries", allEntries);

  const aside = (
    <div>
      <p className="text-white">test</p>
    </div>
  );

  const content = (
    <div className="grid gap-8">
      <TitleDescription
        title="Design"
        description="A collection of projects that Josh has designed throughout the years. Select a project to learn more about the project goal, design, and implementation."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {allEntries.projects?.map(project => {
          return <ProjectCard project={project} key={project.name} />;
        })}
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
