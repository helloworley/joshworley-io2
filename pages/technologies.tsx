import PageLayout from "@/components/layout/PageLayout";
import TitleDescription from "@/components/common/TitleDescription";
import Technology from "@/components/common/Technology";
import BlurredBackground from "@/components/layout/BlurredBackground";

export default function Home({ data }) {
  const content = (
    <>
      <TitleDescription
        title="Technologies"
        description="I have professional experience and working knowledge of the following design applications and frontend technologies. I am comfortable jumping
        into projects using these technologies and contributing immediately."
      />
      <div className="mt-10 grid grid-cols-2 gap-3 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
        {data.technologies?.map(tech => {
          return <Technology tech={tech} key={tech.name} />;
        })}
      </div>
    </>
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
