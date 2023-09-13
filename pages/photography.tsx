import { useEffect } from "react";
import imagesLoaded from "imagesloaded";
import SideNavLayout from "@/components/layout/SideNavLayout";
import { NotionPropertyImage } from "@/components/image/NotionPropertyImage";

export default function Home({ data }) {
  const handleImageLoad = () => {
    const Masonry = require("masonry-layout");
    const grid = document.querySelector(".masonry-grid");
    imagesLoaded(grid, function () {
      const msnry = new Masonry(grid, {
        itemSelector: ".masonry-item",
        columnWidth: ".masonry-item",
        percentPosition: true,
      });
      msnry.layout();
    });
  };

  useEffect(() => {
    handleImageLoad();
  }, []);

  return (
    <SideNavLayout>
      <div className="masonry-grid mt-20 min-h-[800px] lg:mt-12">
        {data.photography.map(photo => (
          <div className="masonry-item" key={photo.name}>
            <NotionPropertyImage
              image={photo.image}
              alt={photo.name}
              cacheCategory="photography"
              cacheProperty="image"
              onImageLoad={handleImageLoad}
            />
          </div>
        ))}
      </div>
    </SideNavLayout>
  );
}

export const getStaticProps = async () => {
  try {
    const response = await fetch(process.env.NEXT_NOTION_API_URL);
    const data = await response.json();

    return {
      props: {
        data,
      },
      revalidate: 3600, // Re-generate the page every 1 hour
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
