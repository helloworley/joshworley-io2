import SecondaryNav from "@/components/layout/SecondaryNav";

export default function SideNavLayout({ children }) {
  return (
    <div className="lg:flex lg:h-screen lg:overflow-hidden">
      <SecondaryNav className="hidden lg:block" />
      <div className="mx-auto w-full overflow-y-auto lg:pt-0">{children}</div>
    </div>
  );
}
