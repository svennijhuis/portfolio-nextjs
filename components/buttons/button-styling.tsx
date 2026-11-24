import { Icon } from "./icon-button";
import styles from "./link.module.scss";
import { cn } from "@/utils/class-merge";
import clsx from "clsx";

interface ButtonStylingProps {
  children: React.ReactNode;
  className?: string;
  icon?: string;
  iconHover?: string;
  color: "black" | "gray";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonStyling = ({
  children,
  onClick,
  icon,
  iconHover,
  color,
  className,
}: ButtonStylingProps) => {
  return (
    <button
      style={{ scrollMarginTop: "-200px" }}
      className={clsx(
        "flex h-[32px] w-fit flex-row items-center justify-center gap-1 rounded-full py-[5px] pl-1 pr-[5px] text-14 font-light transition-all duration-500 ease-in-out hover:-rotate-3 hover:scale-105",
        className,
        styles.linkStyling,
        {
          "bg-black text-white": color === "black",
          "bg-gray text-black": color === "gray",
        }
      )}
      type="button"
      onClick={onClick}
    >
      {children}
      <div
        className={clsx(
          "h-[24px] w-[24px] overflow-hidden rounded-full",
          className,
          {
            "bg-white": color === "black",
            "bg-black": color === "gray",
          }
        )}
      >
        <span className={cn({ invert: color === "gray" })}>
          {icon && <Icon icon={icon} />}
        </span>
        <span className={cn({ invert: color === "gray" })}>
          {iconHover && <Icon icon={iconHover} />}
        </span>
      </div>
    </button>
  );
};

export default ButtonStyling;
