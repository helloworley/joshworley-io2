import { PropsWithChildren } from "react";

type RootLayoutProps = PropsWithChildren<any>;

export default function PageLayout({ aside, content, cover }: RootLayoutProps) {
  return (
    <div className="mt-16 h-screen pb-16 lg:mt-0 lg:flex">
      <div className="w-full">
        {cover && <div className="mx-auto max-w-6xl">{cover}</div>}
        {aside ? (
          <div className="mx-auto grid w-full gap-10 overflow-y-auto p-4 lg:h-screen lg:max-w-6xl lg:flex-1 lg:grid-cols-[1fr_5fr] lg:gap-12 lg:py-0">
            <div className="lg:sticky lg:top-0 lg:h-screen lg:pt-20">{aside}</div>
            <div className="w-full lg:h-screen lg:pt-12">{content}</div>
          </div>
        ) : (
          <div className="mx-auto grid w-full gap-10 p-4 lg:flex-1 lg:py-0 xl:px-12">
            <div className="w-full lg:h-screen lg:pt-12">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
}
