import Link from "next/link";
import React from "react";
import { useSkrimContext } from "../skrim/SkrimProvider";

export default function HeaderMenuLink({ name, link, className }: { name: string; link: string; className?: string }) {
  const { clear } = useSkrimContext();
  return (
    <li>
      <Link href={link} className={["hover:text-gray-30 flex items-center leading-4 text-white md:h-[64px]", className].join(" ")} onClick={clear}>
        {name}
      </Link>
    </li>
  );
}
