import PageLayout from "@/components/layout/PageLayout";
import { getAllPages } from "@/lib/notion";
import TitleDescription from "@/components/page/TitleDescription";

export default function Home({ allPages }) {
  console.log(allPages);

  const content = (
    <>
      <TitleDescription title="Photography" description="See the world through my eyes." />
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
