export default function BlurredBackground({
  children,
  image,
  bg = "bg-smoke-40",
  className,
}: {
  children: any;
  image?: string;
  bg?: string;
  className?: string;
}) {
  return (
    <div className={["relative flex  flex-col", className].join(" ")}>
      <div className="overflow-hidden">
        {/* Background Image */}
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}></div>

        {/* Blurred Overlay */}
        <div className={`${bg} fixed bottom-0 left-0 right-0 top-0 backdrop-blur-3xl`}></div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen relative z-10 w-full">{children}</div>
    </div>
  );
}
