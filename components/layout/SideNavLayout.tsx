import SecondaryNav from "@/components/common/SecondaryNav";

export default function SideNavLayout({ children }) {
  return (
    <div className="lg:flex lg:h-screen lg:overflow-hidden">
      <SecondaryNav className="hidden lg:sticky lg:mt-16" />
      <div className="mx-auto w-full overflow-y-auto pt-12 lg:pt-0">{children}</div>
    </div>
  );
}
