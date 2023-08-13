import { getAllEntries } from "@/lib/notion/notion";
import SecondaryNav from "@/components/common/SecondaryNav";

export default function Home({ allEntries }) {
  console.log(allEntries);
  return (
    <>
      <SecondaryNav />
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
