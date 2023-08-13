import HeaderMenuLink from "@/components/layout/HeaderMenuLink";

export const navItems = [
  {
    link: "/design",
    name: "Design",
  },
  {
    link: "/development",
    name: "Development",
  },
  {
    link: "/photography",
    name: "Photography",
  },
  {
    link: "/technologies",
    name: "Technologies",
  },
];

export default function Header() {
  return (
    <nav
      className={[
        "bg-smoke-70 fixed z-50 mr-4 w-full overflow-x-auto",
        "lg:h-screen-64 lg:static lg:flex lg:w-[260px] lg:flex-col lg:justify-center",
      ].join(" ")}
    >
      <div className="flex gap-6 px-4 py-4 lg:flex-col lg:px-10">
        {navItems.map(item => (
          <div className="group" key={item.name}>
            <HeaderMenuLink {...item} key={item.name} />
          </div>
        ))}
      </div>
    </nav>
  );
}
