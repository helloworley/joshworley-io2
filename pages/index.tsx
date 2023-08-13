import { getAllPages } from "@/lib/notion";
import SecondaryNav from "@/components/common/SecondaryNav";

export default function Home({ allPages }) {
  console.log(allPages);
  return (
    <>
      <SecondaryNav />
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
