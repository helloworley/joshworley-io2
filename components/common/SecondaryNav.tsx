import HeaderMenuLink from "@/components/layout/HeaderMenuLink";

export const navItems = [
  {
    name: "Design & Development",
    link: "/design-and-development",
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
        "bg-smoke-70 fixed z-50 w-full overflow-x-auto backdrop-blur-3xl",
        // "lg:h-screen-64 lg:static lg:flex lg:w-[260px] lg:flex-col lg:justify-center",
        "top-16 lg:sticky lg:h-screen lg:w-80 lg:overflow-y-auto",
      ].join(" ")}
    >
      <div className="flex gap-6 px-4 py-4 lg:h-full lg:flex-col lg:justify-center lg:px-10">
        {navItems.map(item => (
          <div className="group" key={item.name}>
            <HeaderMenuLink {...item} key={item.name} />
          </div>
        ))}
      </div>
    </nav>
  );
}
