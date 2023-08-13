import { PropsWithChildren } from "react";
import SecondaryNav from "@/components/common/SecondaryNav";

type RootLayoutProps = PropsWithChildren<any>;

export default function PageLayout({ aside, content }: RootLayoutProps) {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_5fr]">
      <SecondaryNav />
      <div className="mx-auto w-full lg:grid lg:h-full lg:max-w-6xl lg:grid-cols-[1fr_5fr]">
        <div className="">{aside}</div>
        <div className="w-full lg:h-full lg:pt-12">{content}</div>
      </div>
    </div>
  );
}
