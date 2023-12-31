import { menuItemsData } from "./Header";
import HeaderMenuLink from "./HeaderMenuLink";

export default function HeaderMenuItems() {
  return (
    <ul className="m-0 flex gap-6 p-0">
      {menuItemsData.map(
        menuItem =>
          menuItem?.showOnDesktop && (
            <div className="hover:bg-gray-1200 group relative" key={menuItem.name}>
              <span className="flex items-center">
                <HeaderMenuLink {...menuItem} key={menuItem.name} />
              </span>
            </div>
          ),
      )}
    </ul>
  );
}
