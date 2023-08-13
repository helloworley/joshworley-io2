import PageLayout from "@/components/layout/PageLayout";
import { getAllPages } from "@/lib/notion";
import TitleDescription from "@/components/page/TitleDescription";

export default function Home({ allPages }) {
  console.log(allPages);

  const content = (
    <>
      <TitleDescription
        title="Design"
        description="A collection of projects that Josh has designed throughout the years. Select a project to learn more about the project goal, design, and implementation."
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
