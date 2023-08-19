import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";

export const NotionPropertyImage: React.FC<{
  alt: string;
  image: {
    propertyId: string;
    pageId: string;
    url: string;
    databaseId: string;
  };
  width?: number;
  height?: number;
  responsive?: boolean;
}> = ({ alt, image, width = 800, height = 800, responsive = true }) => {
  const { propertyId, pageId, url, databaseId } = image;
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(url);

  const handleError = async () => {
    console.log("handling errors");
    const res = await fetch(`/api/property-image?pageId=${pageId}&propertyId=${propertyId}`).then(res => res.json());
    console.log("res", res);
    const newImageUrl = res?.imageSrc;
    // await updateCache();

    // Fetch the new URL from the updated cache
    // const newCacheData = await fetch("/notionpages.json").then(res => res.json());

    // Assuming the cache structure is an array and each item has an `image` property
    // Find the new URL for the image
    // const newImageUrl = newCacheData.find(item => item.page.id === imageRetry.pageId)?.image;

    if (newImageUrl) {
      setImageSrc(newImageUrl);
    } else {
      console.error("Couldn't find the new image URL in the updated cache");
    }
  };

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <div className="my-auto">
          <LoadingAnimation size={24} minHeight={`min-h-[${height}px]`} />
        </div>
      ) : null}
      <div style={{ opacity: isLoading ? 0 : 1, height: isLoading ? 0 : "auto" }}>
        <Image
          width={width}
          height={height}
          src={imageSrc}
          alt={alt}
          className="max-w-fill mx-auto rounded"
          onError={handleError}
          unoptimized={true}
          onLoad={() => setIsLoading(false)}
          layout={responsive && "responsive"}
        />
      </div>
    </div>
  );
};
