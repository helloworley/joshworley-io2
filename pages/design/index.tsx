import PageLayout from "@/components/layout/PageLayout";
import { getAllPages } from "@/lib/notion";
import TitleDescription from "@/components/page/TitleDescription";
import ProjectCard from "@/components/project/ProjectCard";

export default function Home({ allPages }) {
  console.log("allPages", allPages);

  const aside = (
    <div>
      <p className="text-white">test</p>
    </div>
  );

  const content = (
    <>
      <TitleDescription
        title="Design"
        description="A collection of projects that Josh has designed throughout the years. Select a project to learn more about the project goal, design, and implementation."
      />
      <div className="grid gap-3 lg:grid-cols-2">
        {allPages.map(project => {
          return <ProjectCard project={project} key={project.name} />;
        })}
      </div>
    </>
  );

  return (
    <>
      <PageLayout content={content} aside={aside} />
    </>
  );
}

export const getStaticProps = async () => {
  const allPages = await getAllPages();

  return {
    props: { allPages },
    revalidate: 1,
  };
};
