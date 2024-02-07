import SideNavLayout from "@/components/layout/SideNavLayout";
import Seo from "@/components/common/Seo";
import ImageCarousel from "@/components/common/ImageCarousel";
import { GetStaticProps } from "next";
import fetchContent from "@/lib/strapi/fetchContent";
import StrapiImage from "@/components/common/StrapiImage";
import { shuffleArray } from "@/lib/helpers";

export default function Home({ photography }) {
  const _photography = photography?.data?.attributes?.images?.data?.map(image => {
    return image;
  });
  const shuffledPhotography = shuffleArray(_photography);

  return (
    <>
      <Seo title="Photography" description="Some photos from Josh's photography portfolio throughout the years." />
      <SideNavLayout>
        <div className="hidden md:block">
          {" "}
          <ImageCarousel images={shuffledPhotography} />{" "}
        </div>
      </SideNavLayout>
      <div className="mt-12 md:hidden">
        {shuffledPhotography.map((photo, i) => (
          <StrapiImage {...photo} key={i} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const photography = await fetchContent("photography");
  return {
    props: {
      photography,
    },
  };
};
