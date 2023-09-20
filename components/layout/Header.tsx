import Link from "next/link";
import MobileNavDrawer from "./MobileNavDrawer";
import MobileMenuDrawerToggle from "./MobileMenuDrawerToggle";
import Image from "next/image";

import { LinkedIn, Twitter, Github } from "../common/SocialIcons";
import HeaderMenuItems from "./HeaderMenuItems";

export const socials = [
  {
    link: "https://github.com/helloworley",
    icon: <Github />,
    name: "Github",
  },
  {
    link: "https://twitter.com/joshworley_io",
    icon: <Twitter />,
    name: "Twitter",
  },
  {
    link: "https://www.linkedin.com/in/joshworley-io",
    icon: <LinkedIn />,
    name: "LinkedIn",
  },
];

export const menuItemsData = [
  {
    name: "Ikigai",
    link: "/",
    showOnDesktop: true,
  },
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

export default function Header() {
  return (
    <>
      <nav id="header" className="bg-smoke-60 fixed top-0 z-50 w-full backdrop-blur-2xl">
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:h-[64px] md:px-5 lg:px-10">
          <div>
            <Link href="/" className="text-gray-90 flex items-center gap-3">
              <Image src="/josh-worley-avatar.png" alt="Josh Worley" height={40} width={40} />
              <p className="font-serif text-lg text-white">Josh Worley</p>
            </Link>
          </div>
          <div className="flex items-center gap-1 lg:gap-4">
            <div className="hidden lg:block">
              <HeaderMenuItems />
            </div>

            <div className="flex items-center gap-3">
              {socials.map(social => {
                return (
                  <a href={social.link} className="h-6" target="_blank" rel="noreferrer" key={social.name}>
                    {/* <Image src={social.icon} alt={`Josh Worley's ${social.name}`} width={24} height={24} />; */}
                    <div className="lg:text-mist-40 cursor-pointer text-white hover:text-white">{social.icon}</div>
                  </a>
                );
              })}
            </div>
            <MobileMenuDrawerToggle nav={<MobileNavDrawer menuItems={menuItemsData} />} />
          </div>
        </div>
      </nav>
    </>
  );
}
