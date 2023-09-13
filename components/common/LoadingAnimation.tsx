import ReactLoading from "react-loading";

interface LoadingAnimationProps {
  message?: string;
  padding?: number;
  minHeight?: string;
  className?: string;
}

export { default as ReactLoader } from "react-loading";

export function _Loader({ size, className, theme }: { size: number; className?: string; theme?: "light" | "dark" }) {
  const textColor = "hsl(0, 0%, 50%, 0.5)";
  return <ReactLoading className={["icon text-5xl", className].join(" ")} type="spin" color={textColor} height={size} width={size} />;
}

const LoadingAnimation = (props: LoadingAnimationProps) => {
  const { className, minHeight = "min-h-[400px]" } = props; // padding defaults to 88
  // const _minHeight = `min-h-[${minHeight}px]`;
  return (
    <div className={[`grid h-full w-full flex-grow place-items-center`, minHeight, className].join(" ")}>
      <div className={["bg-mist-5 flex h-full w-full items-center justify-center", minHeight].join(" ")}>
        {/* <span className="h-full w-full text-transparent">loading...</span> */}
        {/* <_Loader size={size} theme={theme} /> */}
      </div>
    </div>
  );
};

export default LoadingAnimation;
