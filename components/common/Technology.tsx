import { NotionPropertyImage } from "@/components/image/NotionPropertyImage";

export default function Technology({ tech }) {
  const { name, icon, type, url } = tech;
  return (
    <div className="flex grid-cols-[64px_1fr] items-center gap-2 md:gap-3">
      <a href={url} target="_blank" rel="noreferrer" className="block">
        <NotionPropertyImage alt={tech.name} image={icon} width={64} height={64} cacheCategory="technologies" cacheProperty="icon" />
      </a>
      <div>
        <p className="text-white">{name}</p>
        {type.map((item, i) => (
          <p key={i} className="text-mist-60 font-sans-serif">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
