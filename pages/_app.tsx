import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/components/layout/layout";
import { SkrimProvider } from "@/components/skrim/SkrimProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SkrimProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SkrimProvider>
  );
}
