import Link from "next/link";
import { NotionPropertyImage } from "../common/NotionPropertyImage";

export default function ProjectCard({ project }) {
  const { brand, dateDisplay, industry, logo, name, slug } = project;
  return (
    <Link href={`/design-and-development/${slug}`}>
      <div className="rounded-xl bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${logo})` }}>
        <div className="bg-smoke-70 grid h-full grid-cols-[64px_1fr] gap-3 rounded-xl p-3 backdrop-blur-xl">
          <NotionPropertyImage image={logo} alt={`${brand} logo`} height={64} width={64} />
          <div className="">
            <h1 className="text-white">{name}</h1>
            <p className="text-mist-60 mt-2">{dateDisplay}</p>
            {industry && (
              <ul className="flex gap-3 p-0">
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
