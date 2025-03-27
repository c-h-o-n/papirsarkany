"use client";

import type { FC } from "react";
import useMedia from "use-media";

import type { NavbarItems } from "~/lib/types";
import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";

let breakPoint: string;

if (typeof window !== "undefined") {
  const styles = getComputedStyle(document.documentElement);
  breakPoint = styles.getPropertyValue("--breakpoint-md");
}

const navbarItems: NavbarItems = {
  leftItems: [
    {
      children: "A vállalkozásról",
      href: "/#vallalkozas",
    },
    {
      children: "Sárkány készítés",
      href: "/#sarkany-keszites",
    },
    {
      children: "Elérhetőség",
      href: "/#elerhetoseg",
    },
  ],
  rightItems: [
    {
      children: "Sárkányok",
      href: "/sarkanyok",
    },
    {
      children: "Anyagok",
      href: "/anyagok",
    },
  ],
};

const Navbar: FC = () => {
  const isDesktop = useMedia({ minWidth: breakPoint }, true);

  return (
    <div className="sticky top-0 z-40">
      {isDesktop ? (
        <DesktopNavbar navbarItems={navbarItems} />
      ) : (
        <MobileNavbar navbarItems={navbarItems} />
      )}
    </div>
  );
};

export default Navbar;
