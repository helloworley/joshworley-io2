import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AvatarLogo() {
  return (
    <Link href="/" className="text-gray-90 flex items-center gap-3">
      <Image src="/josh-worley-avatar.png" alt="Josh Worley" height={40} width={40} />
      <p className="font-serif text-lg text-white">Josh Worley</p>
    </Link>
  );
}
