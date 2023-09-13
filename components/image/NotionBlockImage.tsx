import Image from "next/image";
import { useState } from "react";
import LoadingAnimation from "../common/LoadingAnimation";

export const NotionBlockImage: React.FC<{
  src: string;
  alt: string;
  blockId: string;
}> = ({ src, alt, blockId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = async () => {
    const res = await fetch(`/api/block-image?blockId=${blockId}`).then(res => res.json());
    // TODO: Use Vercel Blob (Joined Waitlist) for storing and serving the files, instead of fething from notion API each time.
    setImageSrc(res.imageSrc);
    setIsLoading(false);
  };

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <div className="my-auto">
          <LoadingAnimation />
        </div>
      ) : null}
      <div style={{ opacity: isLoading ? 0 : 1, height: isLoading ? 0 : "auto" }}>
        <Image
          width={900}
          height={900}
          src={imageSrc}
          alt={alt}
          className="mx-auto rounded"
          onError={handleError}
          unoptimized={true}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};
