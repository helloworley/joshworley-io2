import SideNavLayout from "@/components/layout/SideNavLayout";
import Seo from "@/components/common/Seo";
import ImageCarousel from "@/components/common/ImageCarousel";

export default function Home({ data }) {
  return (
    <>
      <Seo title="Photography" description="Some photos from Josh's photography portfolio throughout the years." />
      <SideNavLayout>
        <ImageCarousel images={data.photography} />
      </SideNavLayout>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const response = await fetch(process.env.NEXT_NOTION_API_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok - ${response.statusText}`);
    }
    const data = await response.json();

    return {
      props: {
        data,
      },
      revalidate: 1800, // Re-generate the page every 1 hour
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: null,
      },
    };
  }
};
