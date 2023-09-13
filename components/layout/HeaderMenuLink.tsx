import Link from "next/link";
import { useSkrimContext } from "../skrim/SkrimProvider";
import { useRouter } from "next/router";

export default function HeaderMenuLink({ name, link, className }: { name: string; link: string; className?: string }) {
  const { clear } = useSkrimContext();
  const router = useRouter();
  const isActive = router.pathname.includes(link);

  return (
    <li className="list-none">
      <Link
        href={link}
        className={["hover:text-mist-70 break-none w-max-content flex items-center", isActive ? "text-white" : "text-mist-40", className].join(" ")}
        onClick={clear}
      >
        {name}
      </Link>
    </li>
  );
}
