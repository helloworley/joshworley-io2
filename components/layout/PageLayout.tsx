import { PropsWithChildren } from "react";
import SecondaryNav from "@/components/common/SecondaryNav";

type RootLayoutProps = PropsWithChildren<any>;

export default function PageLayout({ aside, content }: RootLayoutProps) {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_5fr]">
      <SecondaryNav />
      <div className="lg:mt- mx-auto mt-12 w-full lg:grid lg:h-full lg:max-w-6xl lg:grid-cols-[1fr_5fr] lg:gap-8">
        <div className="">{aside}</div>
        <div className="w-full lg:h-full">{content}</div>
      </div>
    </div>
  );
}
