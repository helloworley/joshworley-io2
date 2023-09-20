import HeaderMenuLink from "@/components/layout/HeaderMenuLink";
import { menuItemsData } from "../layout/Header";

export default function Header({ className }: { className?: string }) {
  return (
    <nav
      className={[
        "bg-smoke-70 fixed z-50 w-full overflow-x-auto backdrop-blur-3xl",
        // "lg:h-screen-64 lg:static lg:flex lg:w-[260px] lg:flex-col lg:justify-center",
        "top-16 lg:sticky lg:h-screen lg:w-80 lg:overflow-y-auto",
        className,
      ].join(" ")}
    >
      <div className="flex gap-6 px-4 py-4 lg:h-full lg:flex-col lg:justify-center lg:px-10">
        {menuItemsData.map(item => (
          <div className="group" key={item.name}>
            <HeaderMenuLink {...item} key={item.name} />
          </div>
        ))}
      </div>
    </nav>
  );
}
