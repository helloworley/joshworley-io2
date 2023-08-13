import { getAllPages } from "@/lib/notion";
import SecondaryNav from "@/components/common/SecondaryNav";

export default function Home({ allPages }) {
  console.log(allPages);
  return (
    <>
      <SecondaryNav />
      <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
        <h1>New website</h1>
      </main>
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
