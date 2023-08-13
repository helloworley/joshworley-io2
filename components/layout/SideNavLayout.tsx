import { PropsWithChildren } from "react";
import SecondaryNav from "@/components/common/SecondaryNav";

type RootLayoutProps = PropsWithChildren<any>;

export default function SideNavLayout({ children }) {
  return (
    <div className="h-screen lg:flex lg:overflow-hidden">
      <SecondaryNav />
      <div className="mx-auto w-full overflow-y-auto">{children}</div>
    </div>
  );
}
