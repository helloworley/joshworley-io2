import Link from "next/link";
import { useSkrimContext } from "../skrim/SkrimProvider";
import Icon from "@/components/common/Icon";

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
        "bg-smoke-70 absolute bottom-0 right-0 h-full w-[calc(100%-64px)] max-w-[400px] transform cursor-pointer overflow-y-auto backdrop-blur-lg transition-all duration-150 ease-in-out",
        onEnter ? "translate-x-0" : "translate-x-full",
        className,
      ].join(" ")}
    >
      <Icon name="close" className="absolute right-4 top-5 text-white" onClick={() => clear()} />

      <div className="mb-16 mt-20 flex items-center justify-center">
        <Link href="/" className="flex">
          Josh Worley
        </Link>
      </div>

      <ul className="z-50">
        {menuItems.map((item, i) => {
          const { link, name } = item;
          return (
            <li key={i}>
              <Link href={link} onClick={() => clear()}>
                <p className="px-6 py-4 text-white">{name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
