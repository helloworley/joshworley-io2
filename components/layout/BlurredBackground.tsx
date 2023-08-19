import Image from "next/image";
import { NotionPropertyImage, NotionPropertyImageTypes } from "../common/NotionPropertyImage";

export default function BlurredBackground({
  children,
  image,
  bg = "bg-smoke-40",
  className,
}: {
  children: any;
  image?: NotionPropertyImageTypes | string;
  bg?: string;
  className?: string;
}) {
  const renderBackgroundImage = () => {
    if (typeof image === "string") {
      return <Image src={image} alt="Background" layout="fill" objectFit="cover" objectPosition="center" className="fixed left-0 top-0 z-0" />;
    } else if (image?.url) {
      return (
        <NotionPropertyImage
          image={image}
          alt="Background"
          objectFit="cover"
          className="left-50% top-50% -translate-x-50% -translate-y-50% absolute z-0 transform overflow-hidden"
          width={3000}
          height={3000}
        />
      );
    }
    return null;
  };

  return (
    <div className={["relative flex h-screen flex-col", className].join(" ")}>
      {/* Background Image */}
      {/* {image && renderBackgroundImage()} */}
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}></div>

      {/* Blurred Overlay */}
      <div className={`${bg} fixed bottom-0 left-0 right-0 top-0 z-0 backdrop-blur-3xl`}></div>

      {/* Main Content */}
      <div className="max-w-screen relative z-10 w-full overflow-auto">{children}</div>
    </div>
  );
}
