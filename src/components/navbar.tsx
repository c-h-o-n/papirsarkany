'use client';

import useMedia from 'use-media';

import twConfig from '~/lib/tailwind-theme.preval';
import { FC } from 'react';
import DesktopNavbar from './desktop-navbar';
import MobileNavbar from './mobile-navbar';
import { MenuItemProps } from './nav-menu-item';

// TODO: move this to types.ts
/**
 * leftItems: on `desktop` rendered on `left` side on `mobile` rendered at the `bottom`
 *
 * rightItems: on `desktop` rendered on `right` side on `mobile` rendered at the `top`
 */
export type NavbarItems = {
  leftItems: MenuItemProps[];
  rightItems: MenuItemProps[];
};

export const navbarItems: NavbarItems = {
  leftItems: [
    {
      children: 'A vállalkozásról',
      href: '/#vallalkozas',
    },
    {
      children: 'Sárkány készítés',
      href: '/#sarkany-keszites',
    },
    {
      children: 'Elérhetőség',
      href: '/#elerhetoseg',
    },
  ],
  rightItems: [
    {
      children: 'Sárkányok',
      href: '/sarkanyok',
    },
    {
      children: 'Anyagok',
      href: '/anyagok',
    },
  ],
};

const Navbar: FC = () => {
  const isDesktop = useMedia({ minWidth: twConfig.screens.md });

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
