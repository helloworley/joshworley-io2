import Link from "next/link";
import { useSkrimContext } from "../skrim/SkrimProvider";
import Icon from "@/components/common/Icon";
import Socials from "./Socials";
import AvatarLogo from "./AvatarLogo";

interface MobilNavDrawerProps {
  menuItems: {
    link: string;
    name: string;
    children?: {
      link: string;
      name: string;
    }[];
  }[];
  className?: string;
}

export default function MobileNavDrawer(props: MobilNavDrawerProps) {
  const { menuItems, className } = props;
  const { onEnter, clear } = useSkrimContext();

  return (
    <div
      className={[
        "bg-smoke-70 absolute bottom-0 right-0 h-full w-[calc(100%-64px)] max-w-[400px] transform cursor-pointer overflow-y-auto px-6 backdrop-blur-lg transition-all duration-150 ease-in-out",
        onEnter ? "translate-x-0" : "translate-x-full",
        className,
      ].join(" ")}
    >
      <Icon name="close" className="absolute right-4 top-5 text-white" onClick={() => clear()} />

      <div className="flex h-full flex-col justify-between pb-8 pt-12">
        <div></div>
        <ul className="z-50 mt-4">
          {menuItems.map((item, i) => {
            const { link, name } = item;
            return (
              <li key={i}>
                <Link href={link} onClick={() => clear()}>
                  <p className="py-4 text-white">{name}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <Socials />
      </div>
    </div>
  );
}
