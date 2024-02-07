export default function Technology({ tech }) {
  const { name, icon, type, url } = tech;

  return (
    <div className="flex grid-cols-[64px_1fr] items-center gap-2 md:gap-3">
      <a href={url} target="_blank" rel="noreferrer" className="block h-16 w-16">
        <img src={icon?.data?.attributes?.url} alt={icon?.data?.attributes?.alternativeText} />
      </a>
      <div className="flex flex-col gap-0">
        <p className="text-white">{name}</p>
        <p className="text-mist-40 font-sans-serif text-sm">{type}</p>
      </div>
    </div>
  );
}
