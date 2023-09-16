import { useEffect } from "react";
import imagesLoaded from "imagesloaded";
import SideNavLayout from "@/components/layout/SideNavLayout";
import { NotionPropertyImage } from "@/components/image/NotionPropertyImage";
import Seo from "@/components/common/Seo";
import { useRef } from "react";
import Image from "next/image";

export default function Home({ data }) {
  // const handleImageLoad = () => {
  //   const Masonry = require("masonry-layout");
  //   const grid = document.querySelector(".masonry-grid");
  //   imagesLoaded(grid, function () {
  //     const msnry = new Masonry(grid, {
  //       itemSelector: ".masonry-item",
  //       columnWidth: ".masonry-item",
  //       percentPosition: true,
  //     });
  //     msnry.layout();
  //   });
  // };

  // useEffect(() => {
  //   handleImageLoad();
  // }, []);

  const containerRef = useRef(null);

  const handleWheel = e => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  console.log(data.photography);

  return (
    <>
      <Seo title="Photography" description="Some photos from Josh's photography portfolio throughout the years." />
      <SideNavLayout>
        <div ref={containerRef} onWheel={handleWheel} className="bg-mist-60 flex h-full w-full items-center overflow-x-scroll">
          {data.photography.map(photo => (
            <NotionPropertyImage
              key={photo.name}
              image={photo.image}
              alt={photo.name}
              cacheCategory="photography"
              cacheProperty="image"
              // onImageLoad={handleImageLoad}
              width={400}
              height={400}
              className="h-screen"
            />
          ))}
        </div>

        {/* <div className="masonry-grid mt-16 min-h-[800px] lg:mt-12">
          {data.photography.map(photo => (
            <div className="masonry-item" key={photo.name}>
              <NotionPropertyImage
                image={photo.image}
                alt={photo.name}
                cacheCategory="photography"
                cacheProperty="image"
                onImageLoad={handleImageLoad}
                width={2000}
                height={2000}
              />
            </div>
          ))}
        </div> */}
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
