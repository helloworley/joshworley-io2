import { PropsWithChildren } from "react";
import Head from "next/head";

import Header from "@/components/layout/Header";

type RootLayoutProps = PropsWithChildren<any>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Head>
        <title>Josh Worley</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className="bg-gray-1200 bottom-0 mb-0">
        <div className="">
          <Header className="lg:hidden" />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
