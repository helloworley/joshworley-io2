// https://react-responsive-carousel.js.org/#demos
// https://react-responsive-carousel.js.org/storybook/?path=/story/01-basic--base
import React, { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NotionPropertyImage } from "../image/NotionPropertyImage";
import { NotionPropertyImageTypes } from "../image/NotionPropertyImage";

interface ImageCarouselProps {
  images: { image: NotionPropertyImageTypes; name: string }[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Carousel
      showArrows={true}
      useKeyboardArrows={true}
      swipeable={true}
      stopOnHover={true}
      emulateTouch={true}
      showThumbs={true}
      showStatus={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000} // 5 seconds between transitions
      transitionTime={500} // Half a second transition time
      renderThumbs={() =>
        images.map((photo, i) => (
          <NotionPropertyImage
            key={i}
            image={photo.image}
            alt={photo.name}
            cacheCategory="photography-thumbnails"
            cacheProperty="image"
            width={40} // Adjust as per your requirement for thumbnails
            height={40} // Adjust as per your requirement for thumbnails
            className=""
          />
        ))
      }
    >
      {images.map((photo, i) => (
        <div
          className="flex h-[calc(100vh-160px)] w-auto items-center justify-center"
          key={i}
          style={{ maxHeight: "calc(100vh - 10px)" }} // Inline style for height
        >
          <NotionPropertyImage
            key={photo.name}
            image={photo.image}
            alt={photo.name}
            cacheCategory="photography"
            cacheProperty="image"
            className="max-w-screen mx-auto max-h-[calc(100vh-160px)] object-contain" // Using object-contain to maintain aspect ratio
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
