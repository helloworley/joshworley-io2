import Link from "next/link";
import { NotionPropertyImage } from "./NotionPropertyImage";

export default function ProjectCard({ project }) {
  const { brand, dateDisplay, industry, logo, name, slug } = project;
  return (
    <Link href={`/design-and-development/${slug}`}>
      <div className="rounded-xl bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${logo.url})` }}>
        <div className="bg-smoke-70 hover:border-mist-50 grid h-full grid-cols-[64px_1fr] gap-3 rounded-xl border border-transparent p-3 backdrop-blur-xl lg:grid-cols-[96px_1fr]">
          <NotionPropertyImage
            image={logo}
            alt={`${brand} logo`}
            // height={64}
            // width={64}
            cacheCategory="projects"
            cacheProperty="logo"
            className="rounded-lg"
          />
          <div className="">
            <h1 className="leading-5 text-white lg:mt-2">{name}</h1>
            <p className="text-mist-60 font-sans-serif mt-2 leading-4">{dateDisplay}</p>
            {industry && (
              <ul className="flex gap-2 p-0 ">
                {industry.map((industry, i) => {
                  return (
                    <li key={i} className="text-mist-60 list-none">
                      {industry}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
