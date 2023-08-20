import { PropsWithChildren } from "react";
import SecondaryNav from "@/components/common/SecondaryNav";

type RootLayoutProps = PropsWithChildren<any>;

export default function PageLayout({ aside, content }: RootLayoutProps) {
  return (
    <div className="bottom-0 h-screen lg:flex">
      <SecondaryNav />
      {/* <div className="lg:mt-12 mx-auto mt-12 w-full lg:grid lg:h-full lg:max-w-6xl lg:grid-cols-[1fr_5fr] lg:gap-8"> */}
      {aside ? (
        <div className="mx-auto grid w-full gap-10 p-4 py-20 lg:h-screen lg:max-w-6xl lg:flex-1 lg:grid-cols-[1fr_5fr] lg:gap-12 lg:overflow-y-auto lg:py-0">
          <div className="overflow-y-auto lg:sticky lg:top-0 lg:h-screen lg:pt-20">{aside}</div>
          <div className="w-full lg:h-screen lg:pt-20">{content}</div>
        </div>
      ) : (
        <div className="mx-auto grid w-full gap-10 p-4 py-20 lg:h-screen lg:max-w-5xl lg:flex-1 lg:overflow-y-auto lg:py-0">
          <div className="w-full lg:h-screen lg:pt-20">{content}</div>
        </div>
      )}
    </div>
  );
}
