import PageLayout from "@/components/layout/PageLayout";
import { getAllEntries } from "@/lib/notion/notion";
import TitleDescription from "@/components/common/TitleDescription";

export default function Home({ allEntries }) {
  console.log(allEntries);

  const content = (
    <>
      <TitleDescription title="Development" description="Something about development" />
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
