/**
 * /* eslint-disable-next-line @typescript-eslint/no-var-requires
 *
 * @format
 */

/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mist: {
          10: "hsl(0, 0%, 100%, 0.1)",
          20: "hsl(0, 0%, 100%, 0.2)",
          30: "hsl(0, 0%, 100%, 0.3)",
          40: "hsl(0, 0%, 100%, 0.4)",
          50: "hsl(0, 0%, 100%, 0.5)",
          60: "hsl(0, 0%, 100%, 0.6)",
          70: "hsl(0, 0%, 100%, 0.7)",
          75: "hsl(0, 0%, 100%, 0.75)",
          80: "hsl(0, 0%, 100%, 0.8)",
          85: "hsl(0, 0%, 100%, 0.85)",
          90: "hsl(0, 0%, 100%, 0.9)",
          95: "hsl(0, 0%, 100%, 0.95)",
        },
        smoke: {
          10: "hsla(0, 0%, 0%, 0.1)",
          20: "hsla(0, 0%, 0%, 0.2)",
          30: "hsla(0, 0%, 0%, 0.3)",
          40: "hsla(0, 0%, 0%, 0.4)",
          50: "hsla(0, 0%, 0%, 0.5)",
          60: "hsla(0, 0%, 0%, 0.6)",
          70: "hsla(0, 0%, 0%, 0.7)",
          75: "hsla(0, 0%, 0%, 0.75)",
          80: "hsla(0, 0%, 0%, 0.8)",
          85: "hsla(0, 0%, 0%, 0.85)",
          90: "hsla(0, 0%, 0%, 0.9)",
          95: "hsla(0, 0%, 0%, 0.95)",
        },
        gray: {
          10: "hsl(0, 0%, 90%)",
          20: "hsl(0, 0%, 80%)",
          30: "hsl(0, 0%, 70%)",
          40: "hsl(0, 0%, 60%)",
          50: "hsl(0, 0%, 50%)",
          60: "hsl(0, 0%, 40%)",
          70: "hsl(0, 0%, 30%)",
          75: "hsl(0, 0%, 25%)",
          80: "hsl(0, 0%, 20%)",
          85: "hsl(0, 0%, 15%)",
          90: "hsl(0, 0%, 10%)",
          95: "hsl(0, 0%, 5%)",
        },
      },
      fontFamily: {
        serif: ['"Big Moore"', "serif"], // Add the default fallback font family if "Big Moore" fails to load
        "sans-serif": ['"Basic Sans"', "sans-serif"], // Add the default fallback font family if "Basic Sans" fails to load
      },
      height: {
        "screen-64": "calc(100vh - 64px)",
      },
    },
  },
  plugins: [],
};
export default config;
