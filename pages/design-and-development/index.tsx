import PageLayout from "@/components/layout/PageLayout";
import TitleDescription from "@/components/common/TitleDescription";
import ProjectCard from "@/components/common/ProjectCard";
import BlurredBackground from "@/components/layout/BlurredBackground";
import Seo from "@/components/common/Seo";
import SideNavLayout from "@/components/layout/SideNavLayout";

export default function Page({ data }) {
  const content = (
    <div className="grid gap-8">
      <TitleDescription
        title="Design & Development"
        description="A collection of projects that Josh has designed and developed throughout the years. Select a project to learn more about the project goal, design, and implementation."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:gap-4 xl:gap-8 2xl:grid-cols-3">
        {data.projects?.map(project => {
          return <ProjectCard project={project} key={project.name} />;
        })}
      </div>
    </div>
  );

  return (
    <>
      <Seo
        title="Design & Development"
        description="A collection of projects that Josh has designed and developed throughout the years. Select a project to learn more about the project goal, design, and implementation."
      />
      <SideNavLayout>
        <BlurredBackground image="/default-background.jpeg">
          <PageLayout content={content} />
        </BlurredBackground>
      </SideNavLayout>
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
