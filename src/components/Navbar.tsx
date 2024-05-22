'use client';
import useMedia from 'use-media';

import twConfig from '@/lib/tailwind-theme.preval';
import { NavbarItems } from '@/lib/types';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

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

export default function Navbar() {
  const isDesktop = useMedia({ minWidth: twConfig.screens.md });

  return (
    <div className='sticky top-0 z-10'>
      {isDesktop ? (
        <DesktopNavbar navbarItems={navbarItems} />
      ) : (
        <MobileNavbar navbarItems={navbarItems} />
      )}
    </div>
  );
}
