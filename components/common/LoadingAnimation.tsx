import React from "react";
import ReactLoading from "react-loading";

interface LoadingAnimationProps {
  theme?: "light" | "dark";
  message?: string;
  size?: number;
  padding?: number;
  className?: string;
}

export { default as ReactLoader } from "react-loading";

export function _Loader({ size, className, theme }: { size: number; className?: string; theme?: "light" | "dark" }) {
  const textColor = "hsl(0, 0%, 100%, 0.5)";
  return <ReactLoading className={["icon text-5xl", className].join(" ")} type="spin" color={textColor} height={size} width={size} />;
}

const LoadingAnimation = (props: LoadingAnimationProps) => {
  const { theme = "light", message, size = 88, className } = props; // padding defaults to 88
  return (
    <div className={["grid h-full min-h-[400px] w-full flex-grow place-items-center", className].join(" ")}>
      <div>
        <_Loader size={size} theme={theme} />
        {message && <p className={`text-${theme === "light" ? "gray-800" : "gray-100"} mt-2 font-bold`}>{message}</p>}
      </div>
    </div>
  );
};

export default LoadingAnimation;
