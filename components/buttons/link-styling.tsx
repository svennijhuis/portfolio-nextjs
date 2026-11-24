"use client";

import { Icon } from "./icon-button";
import styles from "./link.module.scss";
import { cn } from "@/utils/class-merge";
import clsx from "clsx";
import Link from "next/link";

interface LinkStylingProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  icon?: string;
  iconHover?: string;
  color: "black" | "gray";
  target?: string;
}

const LinkStyling = ({
  children,
  href,
  icon,
  iconHover,
  color,
  className,
  target,
}: LinkStylingProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior

    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    if (href && href.includes("#")) {
      const targetId = href.replace(/.*\#/, "");
      // Only smooth-scroll when the section exists on this page; otherwise
      // (e.g. "/#contact" from a blog page) navigate normally.
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Link
      target={target}
      onClick={handleScroll}
      className={clsx(
        "flex h-[32px] w-fit flex-row items-center justify-center gap-1 rounded-full py-[5px] pl-1 pr-[5px] text-13 font-light transition-all duration-500 ease-in-out hover:-rotate-3 hover:scale-105 md:text-14",
        className,
        styles.linkStyling,
        {
          "bg-black text-white": color === "black",
          "bg-gray text-black": color === "gray",
        }
      )}
      href={href}
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
    </Link>
  );
};

export default LinkStyling;
