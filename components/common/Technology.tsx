import Image from "next/image";

export default function Technology({ tech }) {
  const { name, icon, url, type } = tech;
  return (
    <div className="flex grid-cols-[64px_1fr] items-center gap-2 md:gap-3">
      <a href={url} target="_blank" className="block">
        <Image className="rounded-xl" src={icon} alt={`${name} logo`} height={64} width={64} />
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
