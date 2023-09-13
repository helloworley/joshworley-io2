import { useSkrimContext } from "@/components/skrim/SkrimProvider";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Icon from "@/components/common/Icon";

export default function MobileMenuDrawerToggle({ nav }) {
  const { width: windowWidth } = useWindowDimensions();
  const { set } = useSkrimContext();

  const handleToggleWalletDrawer = (e: any) => {
    e.preventDefault();
    if (windowWidth < 1024) {
      set(nav);
    }
  };

  return (
    <div onClick={handleToggleWalletDrawer} className="mobile-menu-drawer-toggle ml-2 block lg:hidden">
      <Icon name="menu" className="text-white" />
    </div>
  );
}
