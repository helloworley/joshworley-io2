import StrapiImage from "@/components/common/StrapiImage";

export default function Education({ education }) {
  const { certification, date_display, location, logo, name } = education;
  return (
    <div className="flex grid-cols-[64px_1fr] items-center gap-2 md:gap-3">
      <div>
        <StrapiImage {...logo.data} className="w-20 rounded-lg" />
      </div>
      <div className="w-full md:flex md:justify-between">
        <div>
          <p className="leading-5 text-white">{name}</p>
          <p className="text-mist-60 font-sans-serif leading-5">{certification}</p>
        </div>
        <div className="md:text-right xl:grid xl:w-[400px] xl:grid-cols-2 ">
          <p className="font-sans-serif text-mist-60 leading-5">{location}</p>
          <p className="font-sans-serif text-mist-60 leading-5">{date_display}</p>
        </div>
      </div>
      {/* <a href={url} target="_blank" className="block"> */}
      {/* </a> */}
    </div>
  );
}
