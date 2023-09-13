import PageLayout from "@/components/layout/PageLayout";
import TitleDescription from "@/components/common/TitleDescription";
import ProjectCard from "@/components/common/ProjectCard";
import BlurredBackground from "@/components/layout/BlurredBackground";

export default function Home({ data }) {
  const content = (
    <div className="grid gap-8">
      <TitleDescription
        title="Design & Development"
        description="A collection of projects that Josh has designed and/or developed throughout the years. Select a project to learn more about the project goal, design, and implementation."
      />
      <div className="grid gap-3 md:grid-cols-2 lg:gap-4 xl:gap-8 2xl:grid-cols-3">
        {data.projects?.map(project => {
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
