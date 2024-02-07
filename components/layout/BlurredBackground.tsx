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
  const _url = typeof image === "string" && image;

  return (
    <div className={["relative flex h-screen flex-col", className].join(" ")}>
      {/* Background Image */}
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${_url})` }}></div>

      {/* Blurred Overlay */}
      <div className={`${bg} fixed bottom-0 left-0 right-0 top-0 z-0 backdrop-blur-3xl`}></div>

      {/* Main Content */}
      <div className="max-w-screen relative z-10 w-full overflow-auto">{children}</div>
    </div>
  );
}
