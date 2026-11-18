"use client";

import styling from "./header.module.scss";
import ArrowIcon from "@/public/icons/arrow-icon";
import EyeIcon from "@/public/icons/eye-icon";
import clsx from "clsx";
import { Squeeze as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useState } from "react";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navbarData = [
    {
      name: "About me",
      url: "/#about-me",
    },
    {
      name: "Work",
      url: "/#work",
    },
    {
      name: "Blog",
      url: "/blog",
    },
    {
      name: "Experience",
      url: "/#experience",
    },
    {
      name: "Contact",
      url: "/#contact",
    },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Smooth-scroll only when the target section is on the current page;
    // otherwise (e.g. /blog, or /#contact from a blog page) let Next navigate.
    const href = e.currentTarget.href;
    const elem = href.includes("#")
      ? document.getElementById(href.replace(/.*\#/, ""))
      : null;
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <menu className="flex">
        <button
          className={clsx(
            styling.mobile_navbar_button,
            styling.open_button,
            "z-[10] ml-auto h-[32px] w-[32px] rounded-full bg-gray"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            size={18}
            direction="right"
            distance="sm"
            label="Show menu"
            color="#000"
          />
        </button>
      </menu>
      <div
        className={clsx(styling.mobile_navbar, "z-[5]", {
          [styling.open]: isOpen,
        })}
      >
        <div className="mx-[8px] mt-[8px] h-fit overflow-hidden rounded-2xl bg-white lg:h-[400px]">
          <nav
            className={clsx("h-full transition-all", {
              "opacity-100 delay-300 duration-1000": isOpen,
              "opacity-0 ": !isOpen,
            })}
          >
            <ul className="grid h-full grid-cols-1 lg:grid-cols-4">
              {navbarData.map((item, index) => (
                <li
                  key={index}
                  className="col-span-1 flex h-full border-t-[1px] border-t-gray py-3 first-of-type:pt-7 lg:border-r-[1px] lg:border-r-gray lg:pb-3 lg:pt-0"
                >
                  <Link
                    onClick={handleScroll}
                    className={clsx(
                      "mx-[15px] mt-auto flex h-full w-full items-end  justify-between overflow-hidden text-25 font-light uppercase text-black lg:mx-3",
                      styling.link_hover
                    )}
                    href={item.url}
                  >
                    {item.name}
                    <div className="mb-[8px] hidden h-2 overflow-hidden xl:block">
                      <span className="flex h-auto w-2">
                        <ArrowIcon />
                      </span>
                      <span className="flex h-auto w-2">
                        <EyeIcon />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "fixed left-0 top-0 z-[3] h-screen w-screen bg-black/60 backdrop-blur-[2px] transition-all delay-300 duration-1000 ease-in-out",
          {
            block: isOpen,
            hidden: !isOpen,
          }
        )}
      ></div>
    </>
  );
};

export default MobileNavbar;
