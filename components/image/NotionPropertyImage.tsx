import Image from "next/image";
import { useState } from "react";
import LoadingAnimation from "../common/LoadingAnimation";

export interface NotionPropertyImageTypes {
  propertyId: string;
  pageId: string;
  url: string;
  databaseId: string;
}

export const NotionPropertyImage: React.FC<{
  alt: string;
  image: NotionPropertyImageTypes;
  width?: number;
  height?: number;
  layout?: "responsive" | "fill" | "fixed" | "intrinsic" | "clamped"; // default is intrinsic
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down"; // default is fill
  className?: string;
  cacheCategory?: string;
  cacheProperty?: string;
  onImageLoad?: any;
}> = ({ alt, image, width = 800, height = 800, layout = "intrinsic", objectFit = "fill", className, cacheCategory, cacheProperty, onImageLoad }) => {
  const { propertyId, pageId, url, databaseId } = image;
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(url);

  const handleError = async () => {
    const encodedPageId = encodeURIComponent(pageId);
    const encodedPropertyId = encodeURIComponent(propertyId);
    const encodedCacheCategory = encodeURIComponent(cacheCategory);
    const encodedCacheProperty = encodeURIComponent(cacheProperty);

    const res = await fetch(
      `/api/refetch/property-image?pageId=${encodedPageId}&propertyId=${encodedPropertyId}&cacheCategory=${encodedCacheCategory}&cacheProperty=${encodedCacheProperty}`,
    ).then(res => res.json());
    const newImageUrl = res?.imageSrc;

    if (newImageUrl) {
      setImageSrc(newImageUrl);
    } else {
      console.error("Couldn't find the new image URL in the updated cache");
    }
  };

  return (
    <div className={["h-full w-full"].join(" ")}>
      {isLoading ? (
        <div className="my-auto">
          <LoadingAnimation minHeight={`min-h-[${height}px]`} />
        </div>
      ) : null}
      <div style={{ opacity: isLoading ? 0 : 1, height: isLoading ? 0 : "auto" }}>
        <Image
          width={width}
          height={height}
          src={imageSrc}
          alt={alt}
          className={["max-w-fill mx-auto", className].join(" ")}
          onError={handleError}
          unoptimized={true}
          onLoad={() => {
            setIsLoading(false);
            if (onImageLoad) onImageLoad(); // <-- Add this
          }}
          // layout={layout}
          // objectFit={objectFit}
        />
      </div>
    </div>
  );
};
