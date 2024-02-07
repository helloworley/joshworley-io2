import React from "react";
import Image from "next/image";

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
}

export interface Media {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: { thumbnail: MediaFormat; medium: MediaFormat; small: MediaFormat };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function StrapiImage({ attributes, className }: { attributes: Media["attributes"]; className?: string }) {
  const { alternativeText, height, url, width } = attributes;

  return <Image src={`${url}`} alt={alternativeText} height={height} width={width} className={className} />;
}
