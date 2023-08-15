import SecondaryNav from "@/components/common/SecondaryNav";

export default function SideNavLayout({ children }) {
  return (
    <div className="h-screen lg:flex lg:overflow-hidden">
      <SecondaryNav />
      <div className="mx-auto w-full overflow-y-auto pt-12 lg:pt-0">{children}</div>
    </div>
  );
}
