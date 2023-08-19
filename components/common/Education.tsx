import { NotionPropertyImage } from "./NotionPropertyImage";

export default function Education({ education }) {
  const { certification, dateDisplay, location, logo, name, imageRetry } = education;
  return (
    <div className="flex grid-cols-[64px_1fr] items-center gap-2 md:gap-3">
      <div>
        <NotionPropertyImage image={logo} alt={`${name} logo`} height={64} width={64} responsive={false} />
      </div>
      <div className="w-full md:flex md:justify-between">
        <div>
          <p className="leading-5 text-white">{name}</p>
          <p className="text-mist-60 font-sans-serif leading-5">{certification}</p>
        </div>
        <div className="md:text-right xl:grid xl:w-[400px] xl:grid-cols-2 ">
          <p className="font-sans-serif text-mist-60 leading-5">{location}</p>
          <p className="font-sans-serif text-mist-60 leading-5">{dateDisplay}</p>
        </div>
      </div>
      {/* <a href={url} target="_blank" className="block"> */}
      {/* </a> */}
    </div>
  );
}
