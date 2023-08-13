import { getAllEntries } from "@/lib/notion/notion";
import Image from "next/image";
import { useEffect } from "react";
import imagesLoaded from "imagesloaded";
import SideNavLayout from "@/components/layout/SideNavLayout";

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
          return (
            <div className="masonry-item" key={photo.name}>
              <Image src={photo.image} alt={photo.name} width={1000} height={1000} unoptimized={true} />
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
