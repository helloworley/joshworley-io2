import Link from "next/link";

const footerItems = [
  {
    title: "",
    links: [
      {
        text: "",
        linkText: "",
        linkUrl: "",
        linkTitle: "",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-abyss-gradient-blue text-gray-500">
      <div className="mx-auto grid max-w-7xl px-4 py-16 md:grid-cols-2 md:gap-8 lg:grid-cols-2 lg:justify-center xl:grid-cols-[1fr_3fr] xl:gap-16">
        <div className="mb-12 md:mb-0">
          <Link href="/">Josh Worley</Link>
        </div>
        <div>
          <div className="mb-12 grid gap-6 md:mb-0 xl:grid-cols-3 xl:gap-16">
            {footerItems.map((item, i) => {
              return (
                <div key={i}>
                  <p className="border-white-20 text-white-100 mb-4 border-b pb-2">{item.title}</p>
                  <div className="flex flex-col gap-3">
                    {item.links.map((link, i) => {
                      const { text, linkText, linkUrl, linkTitle } = link;
                      return (
                        <div key={i} className="inline-block leading-5">
                          {`${text} `}
                          <a href={linkUrl} className="font-bold text-blue-700" title={linkTitle}>
                            {linkText}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
