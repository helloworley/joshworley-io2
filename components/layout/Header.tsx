import Link from "next/link";
import HeaderMenuItems from "./HeaderMenuItems";
import MobileNavDrawer from "./MobileNavDrawer";
import MobileMenuDrawerToggle from "./MobileMenuDrawerToggle";

export const menuItemsData = [
  {
    link: "/about",
    name: "About",
  },
];

export default function Header() {
  return (
    <>
      <nav id="header" className="bg-smoke-70 fixed z-50 w-full">
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:h-[64px] md:px-5 lg:px-8">
          <div>
            <Link href="/" className="flex text-gray-900">
              <p className="text-white">Josh Worley</p>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:inline-block">
              <HeaderMenuItems />
            </div>
            <MobileMenuDrawerToggle nav={<MobileNavDrawer menuItems={menuItemsData} />} />
          </div>
        </div>
      </nav>
    </>
  );
}
