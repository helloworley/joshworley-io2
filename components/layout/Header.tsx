import MobileNavDrawer from "./MobileNavDrawer";
import MobileMenuDrawerToggle from "./MobileMenuDrawerToggle";

import HeaderMenuItems from "./HeaderMenuItems";
import AvatarLogo from "./AvatarLogo";

export const menuItemsData = [
  {
    name: "Design & Development",
    link: "/design-and-development",
    showOnDesktop: true,
  },
  {
    name: "Photography",
    link: "/photography",
    showOnDesktop: true,
  },
  {
    name: "Technologies",
    link: "/technologies",
    showOnDesktop: true,
  },
  {
    name: "About",
    link: "/about",
    showOnDesktop: true,
  },
  {
    name: "Resume",
    link: "https://drive.google.com/file/d/1fcSVZ3M1go1M1OUeZ8VAQmZk5mKuLvjT/view?usp=sharing",
    showOnDesktop: true,
  },
];

export default function Header(props: { className?: string }) {
  const { className } = props;
  return (
    <>
      <nav id="header" className={`bg-smoke-60 fixed top-0 z-50 w-full backdrop-blur-2xl ${className}`}>
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:h-[64px] md:px-5 lg:px-10">
          <AvatarLogo />
          <div className="flex items-center gap-1 lg:gap-4">
            <div className="hidden lg:block">
              <HeaderMenuItems />
            </div>

            <MobileMenuDrawerToggle nav={<MobileNavDrawer menuItems={menuItemsData} />} />
          </div>
        </div>
      </nav>
    </>
  );
}
