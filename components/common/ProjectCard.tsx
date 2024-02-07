import Link from "next/link";
import StrapiImage from "@/components/common/StrapiImage";

export default function ProjectCard({ project }) {
  const { date_display, industries, logo, name, slug, cover } = project;
  return (
    <Link href={`/design-and-development/${slug}`}>
      <div className="bg-cover bg-center bg-no-repeat shadow-xl" style={{ backgroundImage: `url(${logo.url})` }}>
        <div className="bg-smoke-70 hover:border-mist-50 border border-transparent backdrop-blur-xl">
          <StrapiImage {...cover.data} />
          <div className="align-center grid h-full grid-cols-[64px_1fr] gap-3 p-3 lg:grid-cols-[96px_1fr]">
            <StrapiImage {...logo.data} />
            <div className="">
              <h1 className="leading-5 text-white lg:text-lg">{name}</h1>
              <p className="text-mist-60 font-sans-serif leading-4">{date_display}</p>
              {industries && (
                <ul className="flex gap-2 p-0 ">
                  {industries.data.map((industry, i) => {
                    const { name } = industry.attributes;
                    return (
                      <li key={i} className="text-mist-60 list-none">
                        {name}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
