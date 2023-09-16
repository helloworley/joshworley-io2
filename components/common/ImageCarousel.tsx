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
            width={50} // Adjust as per your requirement for thumbnails
            height={50} // Adjust as per your requirement for thumbnails
            className=""
          />
        ))
      }
    >
      {images.map((photo, i) => (
        <div className="flex h-screen max-h-screen w-auto items-center justify-center">
          <NotionPropertyImage
            key={photo.name}
            image={photo.image}
            alt={photo.name}
            cacheCategory="photography"
            cacheProperty="image"
            // onImageLoad={handleImageLoad}
            width={400} // Adjust width as per your requirement
            height={400} // Adjust height as per your requirement
            className="max-w-screen mx-auto max-h-screen" // This will prevent the images from shrinking
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
