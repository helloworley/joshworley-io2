"use client";
import Image from "next/image";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

export default function BlockRendererClient({ content, textClasses }: { readonly content: BlocksContent; textClasses?: string }) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => {
          return <Image className="my-8" src={image.url} width={image.width} height={image.height} alt={image.alternativeText || ""} />;
        },
        list: ({ children }) => {
          return <ul className={`pl-4 ${textClasses}`}>{children}</ul>;
        },
        "list-item": ({ children }) => {
          return <li className="text-mist-70 list-disc">{children}</li>;
        },
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className={`text-white ${textClasses}`}>{children}</h1>;
            case 2:
              return <h2 className={`mb-2 mt-8 text-4xl text-white ${textClasses}`}>{children}</h2>;
            case 3:
              return <h3 className={`mb-1 mt-4 text-2xl text-white ${textClasses}`}>{children}</h3>;
            case 4:
              return <h4 className={`${textClasses}`}>{children}</h4>;
            case 5:
              return <h5>{children}</h5>;
            case 6:
              return <h6>{children}</h6>;
            default:
              return <h2>{children}</h2>;
          }
        },
        paragraph: ({ children }) => <p className={`text-mist-70 ${textClasses}`}>{children}</p>,
      }}
    />
  );
}
