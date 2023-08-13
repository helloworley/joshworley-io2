export default function BlurredBackground({ children, image, bg = "bg-smoke-40" }: { children: any; image?: string; bg?: string }) {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}></div>

      {/* Blurred Overlay */}
      <div className={`${bg} fixed bottom-0 left-0 right-0 top-0 backdrop-blur-3xl`}></div>

      {/* Main Content */}
      <div className="max-w-screen relative z-10">{children}</div>
    </div>
  );
}
