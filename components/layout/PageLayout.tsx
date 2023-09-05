import { PropsWithChildren } from "react";
import SecondaryNav from "@/components/common/SecondaryNav";

type RootLayoutProps = PropsWithChildren<any>;

export default function PageLayout({ aside, content, cover }: RootLayoutProps) {
  return (
    <div className="bottom-0 mt-20 h-screen lg:mt-12 lg:flex">
      <SecondaryNav />
      {/* <div className="lg:mt-12 mx-auto mt-12 w-full lg:grid lg:h-full lg:max-w-6xl lg:grid-cols-[1fr_5fr] lg:gap-8"> */}
      <div className="w-full p-4 lg:h-screen lg:overflow-y-auto">
        {cover && <div className="mx-auto pb-12 pt-20 lg:pb-4 lg:pt-4 xl:p-4">{cover}</div>}
        {aside ? (
          <div className="lg:h-screenk mx-auto grid w-full gap-10 overflow-y-auto lg:max-w-6xl lg:flex-1 lg:grid-cols-[1fr_5fr] lg:gap-12 lg:py-0">
            <div className="lg:sticky lg:top-0 lg:h-screen lg:pt-20">{aside}</div>
            <div className="w-full lg:h-screen lg:pt-20">{content}</div>
          </div>
        ) : (
          <div className="mx-auto grid w-full gap-10 lg:flex-1 lg:py-0 xl:px-12">
            <div className="w-full lg:h-screen lg:pt-20">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
}
