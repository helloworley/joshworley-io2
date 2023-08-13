import Article from "@material-symbols/svg-600/outlined/article.svg";
import Cancel from "@material-symbols/svg-600/outlined/cancel.svg";
import ChevronLeft from "@material-symbols/svg-600/outlined/chevron_left.svg";
import ChevronRight from "@material-symbols/svg-600/outlined/chevron_right.svg";
import Close from "@material-symbols/svg-600/outlined/close.svg";
import Description from "@material-symbols/svg-600/outlined/description.svg";
import Event from "@material-symbols/svg-600/outlined/event.svg";
import ExpandLess from "@material-symbols/svg-600/outlined/expand_less.svg";
import ExpandMore from "@material-symbols/svg-600/outlined/expand_more.svg";
import Menu from "@material-symbols/svg-600/outlined/menu.svg";
import PinDrop from "@material-symbols/svg-600/outlined/pin_drop.svg";
import Redeem from "@material-symbols/svg-600/outlined/redeem.svg";
import Schedule from "@material-symbols/svg-600/outlined/schedule.svg";
import Search from "@material-symbols/svg-600/outlined/search.svg";
import SmartPhone from "@material-symbols/svg-600/outlined/smartphone.svg";
import { FC, memo } from "react";
import classNames from "classnames";

const icons: Record<string, FC> = {
  article: Article,
  cancel: Cancel,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  close: Close,
  description: Description,
  event: Event,
  expand_less: ExpandLess,
  expand_more: ExpandMore,
  menu: Menu,
  pindrop: PinDrop,
  redeem: Redeem,
  schedule: Schedule,
  search: Search,
  smartphone: SmartPhone,
};

type IconProps = {
  containerClassName?: string;
  className?: string;
  name: string;
  when?: boolean;
  onClick?: () => void;
  size?: number;
  color?: string;
};

export default memo(function Icon({ when = true, containerClassName, className, name, onClick, size = 24, color = "currentColor" }: IconProps) {
  const SvgIcon = icons[name] as FC<{ className?: string; style?: React.CSSProperties }>;
  if (!SvgIcon) {
    console.error(`Icon "${name}" not found in the icons list.`);
  }
  if (!when) return <div className="hidden" />;
  return SvgIcon ? (
    <span className={classNames(containerClassName)} onClick={() => onClick?.()}>
      <SvgIcon className={classNames("icon", className)} style={{ width: size, height: size, fill: color }} />
    </span>
  ) : (
    <span className="hidden" />
  );
});
