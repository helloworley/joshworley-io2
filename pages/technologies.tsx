import PageLayout from "@/components/layout/PageLayout";
import { getAllEntries } from "@/lib/notion/notion";
import TitleDescription from "@/components/common/TitleDescription";
import Technology from "@/components/common/Technology";
import BlurredBackground from "@/components/layout/BlurredBackground";

export default function Home({ allEntries }) {
  console.log(allEntries);

  const content = (
    <>
      <TitleDescription
        title="Technologies"
        description="I have professional experience and working knowledge of the following design applications and frontend technologies. I am comfortable jumping
        into projects using these technologies and contributing immediately."
      />
      <div className="mt-10 grid grid-cols-2 gap-3 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
        {allEntries.technologies?.map(tech => {
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
  const allEntries = await getAllEntries();

  return {
    props: { allEntries },
    revalidate: 1,
  };
};
