import { PropsWithChildren } from "react";
import SecondaryNav from "@/components/common/SecondaryNav";

type RootLayoutProps = PropsWithChildren<any>;

export default function PageLayout({ aside, content }: RootLayoutProps) {
  return (
    <div className="h-screen lg:flex lg:overflow-hidden">
      <SecondaryNav />
      {/* <div className="lg:mt-12 mx-auto mt-12 w-full lg:grid lg:h-full lg:max-w-6xl lg:grid-cols-[1fr_5fr] lg:gap-8"> */}
      <div className="mx-auto grid w-full gap-10 p-4 py-20 lg:max-w-6xl lg:flex-1 lg:grid-cols-[1fr_5fr] lg:gap-12 lg:overflow-y-auto">
        <div className="lg:h-screen-64 overflow-y-auto lg:sticky lg:top-0">{aside}</div>
        <div className="w-full lg:h-full">{content}</div>
      </div>
    </div>
  );
}
