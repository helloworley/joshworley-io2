import Link from "next/link";
import React from "react";

export default function CircleButton({ data }: { data: { name: string; link: string; className?: string } }) {
  const { name, link, className } = data;
  return (
    <Link
      href={link}
      className={["bg-mist-5 hover:bg-mist-10 flex h-32 w-32 items-center justify-center rounded-full border border-white", className].join(" ")}
    >
      <p className="font-sans-serif text-white">{name}</p>
    </Link>
  );
}
