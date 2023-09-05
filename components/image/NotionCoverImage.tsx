import Image from "next/image";
import { useState } from "react";
import LoadingAnimation from "../common/LoadingAnimation";

export interface NotionCoverImageTypes {
  pageId: string;
  url: string;
  cacheCategory: string;
}

export const NotionCoverImage: React.FC<{
  alt: string;
  image: NotionCoverImageTypes;
  width?: number;
  height?: number;
  layout?: "responsive" | "fill" | "fixed" | "intrinsic" | "clamped"; // default is intrinsic
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down"; // default is fill
  className?: string;
  cacheCategory?: string;
  cacheProperty?: string;
  onImageLoad?: Function;
}> = ({ alt, image, width = 320, height = 320, layout = "intrinsic", objectFit = "fill", className, cacheCategory, onImageLoad }) => {
  const { pageId, url } = image;
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(url);

  const handleError = async () => {
    const encodedPageId = encodeURIComponent(pageId);
    const encodedCacheCategory = encodeURIComponent(cacheCategory);

    const res = await fetch(`/api/cover-image?pageId=${encodedPageId}&cacheCategory=${encodedCacheCategory}`).then(res => res.json());
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
          <LoadingAnimation size={24} minHeight={`min-h-[${height}px]`} />
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
