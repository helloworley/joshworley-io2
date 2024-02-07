// https://react-responsive-carousel.js.org/#demos
// https://react-responsive-carousel.js.org/storybook/?path=/story/01-basic--base
import React, { FC } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StrapiImage from "@/components/common/StrapiImage";
import { Media as MediaInterface } from "@/components/common/StrapiImage";

interface ImageCarouselProps {
  images: MediaInterface[];
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
      showIndicators={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000} // 5 seconds between transitions
      transitionTime={250} // Half a second transition time
      renderThumbs={() =>
        images.map((photo, i) => (
          <div className="h-[48px]" key={i}>
            <StrapiImage key={i} {...photo} />
          </div>
        ))
      }
    >
      {images.map((photo, i) => (
        <div
          className="flex h-[calc(100vh-80px)] w-auto items-center justify-center"
          key={i}
          style={{ maxHeight: "calc(100vh - 10px)" }} // Inline style for height
        >
          <StrapiImage
            {...photo}
            className="max-w-screen mx-auto max-h-[calc(100vh-80px)] object-contain" // Using object-contain to maintain aspect ratio
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
