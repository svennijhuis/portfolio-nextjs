"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LinkStyling from "../buttons/link-styling";
import MobileNavbar from "./mobile-navbar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // The logo always brings you home: close the menu, and when you are
  // already on the home page, scroll back to the top.
  const goHome = () => {
    setIsOpen(false);
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex h-6 items-center bg-white md:h-8">
      <div className="container grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <Link className="relative z-10 block" href="/" onClick={goHome}>
            <p className="text-18 md:text-20 font-medium text-black uppercase">
              Sven <span className="text-grayDark">Nijhuis</span>
            </p>
          </Link>
        </div>
        <div className="col-span-1 flex justify-end gap-2">
          <LinkStyling
            href="/#contact"
            color="gray"
            icon="arrow"
            iconHover="mail"
            className="relative z-10"
          >
            Contact
          </LinkStyling>
          <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
};
export default Header;
