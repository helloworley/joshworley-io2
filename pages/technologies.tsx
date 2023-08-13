import PageLayout from "@/components/layout/PageLayout";
import { getAllEntries } from "@/lib/notion/notion";
import TitleDescription from "@/components/common/TitleDescription";

export default function Home({ allEntries }) {
  console.log(allEntries);

  const content = (
    <>
      <TitleDescription
        title="Technologies"
        description="I have professional experience and working knowledge of the following design applications and frontend technologies. I am comfortable jumping
        into projects using these technologies and contributing immediately."
      />
    </>
  );

  return (
    <>
      <PageLayout content={content} />
    </>
  );
}

export const getStaticProps = async () => {
  const allEntries = await getAllEntries();

  return {
    props: { allEntries },
    revalidate: 1,
  };
};
