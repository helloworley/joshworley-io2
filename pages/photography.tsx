import { getAllEntries } from "@/lib/notion/notion";
import Image from "next/image";
import { useEffect } from "react";
import imagesLoaded from "imagesloaded";
import SideNavLayout from "@/components/layout/SideNavLayout";
import { NotionBlockImage } from "@/components/common/NotionBlockImage";
import RenderBlock from "@/components/common/RenderBlock";
import { NotionPropertyImage } from "@/components/common/NotionPropertyImage";

export default function Home({ allEntries }) {
  console.log("allEntries", allEntries);

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

  return (
    <SideNavLayout>
      <div className="masonry-grid">
        {allEntries.photography.map(photo => {
          console.log(photo);
          return (
            <div className="masonry-item" key={photo.name}>
              {/* <RenderBlock block={photo} allBlocks={allEntries.photography} /> */}
              {/* <NotionBlockImage src={photo.image} alt={photo.name} blockId={photo.id} /> */}
              <NotionPropertyImage image={photo.image} alt={photo.name} />
              {/* <Image  width={1000} height={1000} unoptimized={true} /> */}
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
