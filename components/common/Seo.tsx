import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export default function Seo({ title, image, description, url }: { title?: string; image?: string; description?: string; url?: string }) {
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <NextSeo
      title={`${title} | Josh Worley`}
      description={description}
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: currentUrl,
        site_name: "Josh Worley",
        title: title,
        description: description,
        images: [
          {
            url: "https://joshworley.io/og-image-default.jpg",
            width: 1200,
            height: 628,
            alt: "Josh Worley's Portfolio Website",
          },
        ],
      }}
    />
  );
}
