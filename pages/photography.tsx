import SideNavLayout from "@/components/layout/SideNavLayout";
import Seo from "@/components/common/Seo";
import ImageCarousel from "@/components/common/ImageCarousel";
import { NotionPropertyImage } from "@/components/image/NotionPropertyImage";
import { GetStaticProps } from "next";
import fetchContent from "@/lib/strapi/fetchContent";

export default function Home({ data }) {
  console.log("data", data);
  // return;
  return (
    <>
      <Seo title="Photography" description="Some photos from Josh's photography portfolio throughout the years." />
      <SideNavLayout>
        <div className="hidden md:block">{/* <ImageCarousel images={data.photography} /> */}</div>
      </SideNavLayout>
      {/* <div className="mt-12 md:hidden">
        {data.photography.map(photo => (
          <NotionPropertyImage
            key={photo.name}
            image={photo.image}
            alt={photo.name}
            cacheCategory="photography"
            cacheProperty="image"
            // onImageLoad={handleImageLoad}
            width={800} // Adjust width as per your requirement
            height={800} // Adjust height as per your requirement
            className="max-w-screen mx-auto max-h-screen" // This will prevent the images from shrinking
          />
        ))}
      </div> */}
    </>
  );
}

// export const getStaticProps = async () => {
//   try {
//     const response = await fetch(process.env.NEXT_NOTION_API_URL);
//     const data = await response.json();
//     return {
//       props: {
//         data,
//       },
//       revalidate: 3600, // Re-generate the page every 1 hour
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         data: null,
//       },
//     };
//   }
// };

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchContent("photography");

  return {
    props: {
      data,
    },
  };
};
