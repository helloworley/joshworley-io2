import { NextSeo } from "next-seo";
import React from "react";

interface GenerateSeoPropsArgs {
  title: string;
  url: string;
}

export function generateSeoProps({ title, url }: GenerateSeoPropsArgs) {
  return {
    fields: {
      description: "",
      siteName: "",
      title: `Josh Worley - ${title}`,
      image: {
        fields: {
          description: `Josh Worley - ${title} OG Image`,
          // TODO: replace with the absolute URL of the preview image
          file: {
            url: "/og-image.png",
          },
        },
      },
      url,
    },
  };
}

export interface SeoProps {
  fields: {
    description: string;
    siteName: string;
    title: string;
    image: {
      fields: {
        description: string;
        file: { url: string };
      };
    };
    url: string;
  };
}

interface OtherSeoProps extends SeoProps {
  titleOverride?: string;
  urlOverride?: string;
}

export default function Seo(props: OtherSeoProps) {
  const { titleOverride = "", urlOverride = "" } = props;
  const { description, siteName, title, image, url } = props?.fields || {};
  return (
    <NextSeo
      title={titleOverride || title}
      description={description}
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: urlOverride || url,
        site_name: siteName,
        title: titleOverride || title,
        description: description,
        images: [
          {
            url: `https:${image?.fields?.file?.url}`,
            width: 1200,
            height: 628,
            alt: image?.fields?.description,
          },
        ],
      }}
    />
  );
}
