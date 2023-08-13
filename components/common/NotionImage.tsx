import Image from "next/image";
import { useState } from "react";
import LoadingAnimation from "@/components/common/LoadingAnimation";

export const NotionImage: React.FC<{
  src: string;
  alt: string;
  blockId: string;
}> = ({ src, alt, blockId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = async () => {
    const res = await fetch(`/api/image?blockId=${blockId}`).then(res => res.json());
    // TODO: Use Vercel Blob (Joined Waitlist) for storing and serving the files, instead of fething from notion API each time.
    setImageSrc(res.imageSrc);
    setIsLoading(false);
  };

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <div className="my-auto">
          <LoadingAnimation size={24} />
        </div>
      ) : null}
      <div style={{ opacity: isLoading ? 0 : 1, height: isLoading ? 0 : "auto" }}>
        <Image
          width={1000}
          height={1000}
          layout="responsive"
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
