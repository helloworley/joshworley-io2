import HeaderMenuLink from "@/components/layout/HeaderMenuLink";
import { menuItemsData } from "./Header";
import AvatarLogo from "./AvatarLogo";
import Socials from "./Socials";

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
      <div className="flex h-full flex-col justify-between px-4 py-4">
        <AvatarLogo />
        <div className="flex gap-6 lg:h-full lg:flex-col lg:justify-center">
          {menuItemsData.map(item => (
            <div className="group" key={item.name}>
              <HeaderMenuLink {...item} key={item.name} />
            </div>
          ))}
        </div>
        <Socials />
      </div>
    </nav>
  );
}
