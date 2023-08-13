import PageLayout from "@/components/layout/PageLayout";
import { getAllPages } from "@/lib/notion";

export default function Home({ allPages }) {
  console.log(allPages);

  const content = (
    <>
      <h1 className="text-4xl text-white">About</h1>
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
