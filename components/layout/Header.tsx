import Link from "next/link";
import HeaderMenuItems from "./HeaderMenuItems";
import MobileNavDrawer from "./MobileNavDrawer";
import MobileMenuDrawerToggle from "./MobileMenuDrawerToggle";
import Image from "next/image";

import { LinkedIn, Twitter, Github } from "../common/SocialIcons";

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
    link: "/about",
    name: "About",
  },
  {
    link: "https://file.notion.so/f/s/f2e6822f-6831-4908-8747-151b0f2d24f3/joshua_worley_resume_210326.pdf?id=945d4e6e-d0ab-436a-8e98-39b53b1efbc7&table=block&spaceId=4817a77d-0789-45fb-81c6-86cd20f57143&expirationTimestamp=1692230400000&signature=8-H-FJchGrp_7pdkPFPkDZiXRzUeKpHUbDBs22CfiwI&downloadName=joshua_worley_resume_210326.pdf",
    name: "Resume",
  },
];

export default function Header() {
  return (
    <>
      <nav id="header" className="bg-smoke-70 fixed top-0 z-50 w-full backdrop-blur-2xl">
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:h-[64px] md:px-5 lg:px-10">
          <div>
            <Link href="/" className="text-gray-90 flex items-center gap-3">
              <Image src="/josh-worley-avatar.png" alt="Josh Worley" height={40} width={40} />
              <p className="font-serif text-lg text-white">Josh Worley</p>
            </Link>
          </div>
          <div className="flex items-center gap-1 lg:gap-4">
            <div className="flex items-center gap-3">
              {socials.map(social => {
                return (
                  <a href={social.link} className="h-6" target="_blank">
                    {/* <Image src={social.icon} alt={`Josh Worley's ${social.name}`} width={24} height={24} />; */}
                    <div className="lg:text-mist-40 cursor-pointer text-white hover:text-white">{social.icon}</div>
                  </a>
                );
              })}
            </div>
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
