import { menuItemsData } from "./Header";
import HeaderMenuLink from "./HeaderMenuLink";

export default function HeaderMenuItems() {
  return (
    <ul className="m-0 flex gap-4 p-0">
      {menuItemsData.map(menuItem => (
        <div className="hover:bg-gray-1200 group relative" key={menuItem.name}>
          <span className="flex items-center gap-2">
            <HeaderMenuLink {...menuItem} key={menuItem.name} />
          </span>
        </div>
      ))}
    </ul>
  );
}
