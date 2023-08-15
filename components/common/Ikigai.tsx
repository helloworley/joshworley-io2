import Image from "next/image";

const rotatingText = ["・ What you love", "What you're good at", "What the world needs", "What makes you a living"].join(" ・ ").toUpperCase();
const w = 440;

export default function Ikigai() {
  return (
    <>
      {/* mobile */}
      <div className="relative block h-[320px] w-[320px] md:hidden">
        <Image
          className="absolute left-1/2 top-1/2 max-h-[556px] -translate-x-1/2 -translate-y-1/2 transform"
          src="/ikigai-text.svg"
          alt="Ikigai Japanese Text"
          width={94}
          height={386}
        />
        <Image
          className="absolute left-1/2 top-1/2 max-h-[304px] -translate-x-1/2 -translate-y-1/2 transform"
          src="/ikigai-circles.svg"
          alt="Ikigai Circles"
          width={210}
          height={210}
        />
        <div className="flex h-full items-center justify-center">
          <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`} style={{ animation: "rotate 80s linear infinite" }}>
            <path id="circlePath" d={`M${w / 2} 0 a${w / 2} ${w / 2} 0 0 1 0 ${w} a${w / 2} ${w / 2} 0 0 1 0 -${w}`} fill="transparent" />
            <text text-anchor="middle" fill="white" font-size="16" font-family="Basic Sans" letter-spacing="7.15" dy="20">
              <textPath href="#circlePath" startOffset="50%">
                {rotatingText}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      {/* tablet^ */}
      <div className="relative hidden h-[556px] w-[556px] md:block">
        <Image
          className="absolute left-1/2 top-1/2 max-h-[556px] -translate-x-1/2 -translate-y-1/2 transform"
          src="/ikigai-text.svg"
          alt="Ikigai Japanese Text"
          layout="responsive"
          width={136}
          height={556}
        />
        <Image
          className="absolute left-1/2 top-1/2 max-h-[304px] -translate-x-1/2 -translate-y-1/2 transform"
          src="/ikigai-circles.svg"
          alt="Ikigai Circles"
          layout="responsive"
          width={304}
          height={304}
        />
        <div className="flex h-full items-center justify-center">
          <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`} style={{ animation: "rotate 80s linear infinite" }}>
            <path id="circlePath" d={`M${w / 2} 0 a${w / 2} ${w / 2} 0 0 1 0 ${w} a${w / 2} ${w / 2} 0 0 1 0 -${w}`} fill="transparent" />
            <text text-anchor="middle" fill="white" font-size="16" font-family="Basic Sans" letter-spacing="7.15" dy="20">
              <textPath href="#circlePath" startOffset="50%">
                {rotatingText}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}
