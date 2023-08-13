import PageLayout from "@/components/layout/PageLayout";
import { getAllPages } from "@/lib/notion";
import TitleDescription from "@/components/page/TitleDescription";

export default function Home({ allPages }) {
  console.log(allPages);

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
  const allPages = await getAllPages();

  return {
    props: { allPages },
    revalidate: 1,
  };
};
