import { getAllEntries } from "@/lib/notion/notion";
import { useEffect } from "react";
import imagesLoaded from "imagesloaded";
import SideNavLayout from "@/components/layout/SideNavLayout";
import { NotionPropertyImage } from "@/components/common/NotionPropertyImage";

export default function Home({ allEntries }) {
  // console.log("allEntries", allEntries);

  useEffect(() => {
    const Masonry = require("masonry-layout");
    const grid = document.querySelector(".masonry-grid");

    imagesLoaded(grid, function () {
      const msnry = new Masonry(grid, {
        itemSelector: ".masonry-item",
        columnWidth: ".masonry-item",
        percentPosition: true,
      });
      msnry.layout();

      return () => {
        msnry.destroy();
      };
    });
  }, []);

  const handleImageLoad = () => {
    const grid = document.querySelector(".masonry-grid");
    const Masonry = require("masonry-layout");
    const msnry = new Masonry(grid, {
      itemSelector: ".masonry-item",
      columnWidth: ".masonry-item",
      percentPosition: true,
    });
    msnry.layout();
  };

  return (
    <SideNavLayout>
      <div className="masonry-grid">
        {allEntries.photography.map(photo => {
          return (
            <div className="masonry-item" key={photo.name}>
              <NotionPropertyImage
                image={photo.image}
                alt={photo.name}
                className="min-h-[400px]"
                cacheCategory="photography"
                cacheProperty="image"
                onImageLoad={handleImageLoad}
              />
            </div>
          );
        })}
      </div>
    </SideNavLayout>
  );
}

export const getStaticProps = async () => {
  const allEntries = await getAllEntries();

  return {
    props: { allEntries },
    revalidate: 1,
  };
};
