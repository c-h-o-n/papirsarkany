import Link from 'next/link';

import CartDropDown from './CartDropDown';
import HomeIcon from '@/assets/home.svg';
import HamburgerIcon from '@/assets/hamburger.svg';
import NavMenuItem, { MenuItemProps } from './NavMenuItem';
import { randomUUID } from 'crypto';

/**
 * leftItems: on `desktop` rendered on `left` side on `mobile` rendered at the `bottom`
 *
 * rightItems: on `desktop` rendered on `right` side on `mobile` rendered at the `top`
 */
const navbarItems: {
  leftItems: MenuItemProps[];
  rightItems: MenuItemProps[];
} = {
  leftItems: [
    {
      children: 'A vállalkozásró',
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
  return (
    <div className="sticky top-0 z-10">
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}

function DesktopNavbar() {
  return (
    <div className="d-navbar border-b-4 border-black bg-white">
      <div className="d-navbar-start gap-1">
        <Link
          href={'/#hello'}
          className="d-btn d-btn-ghost py-1 text-xl normal-case hover:!bg-sky-200"
          aria-label="home"
        >
          <HomeIcon className="h-full" />
        </Link>
        <ul className="d-menu d-menu-horizontal flex-nowrap gap-2 text-base font-extrabold">
          {navbarItems.leftItems.map((navbarItem) => (
            <NavMenuItem key={randomUUID()} href={navbarItem.href}>
              {navbarItem.children}
            </NavMenuItem>
          ))}
        </ul>
      </div>
      <div className="d-navbar-end">
        <ul className="d-menu d-menu-horizontal gap-2 text-base font-extrabold">
          {navbarItems.rightItems.map((navbarItem) => (
            <NavMenuItem key={randomUUID()} href={navbarItem.href}>
              {navbarItem.children}
            </NavMenuItem>
          ))}
        </ul>
        <div className="flex-none">
          <CartDropDown />
        </div>
      </div>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="d-navbar sticky top-0 border-b-4 border-black bg-white">
      <div className="d-navbar-start gap-1">
        <div className="d-dropdown">
          <div
            tabIndex={0}
            role="button"
            className="d-btn d-btn-ghost lg:hidden"
          >
            <HamburgerIcon className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="d-menu d-dropdown-content z-[1] mt-5 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {navbarItems.rightItems.map((navbarItem) => (
              <NavMenuItem key={randomUUID()} href={navbarItem.href}>
                {navbarItem.children}
              </NavMenuItem>
            ))}
            <div className="d-divider m-0"></div>
            {navbarItems.leftItems.map((navbarItem) => (
              <NavMenuItem key={randomUUID()} href={navbarItem.href}>
                {navbarItem.children}
              </NavMenuItem>
            ))}
          </ul>
        </div>

        <div className="flex-none">
          <CartDropDown />
        </div>
      </div>

      <div className="d-navbar-end">
        <Link
          href={'/'}
          className="d-btn d-btn-ghost normal-case min-[320px]:text-xl"
        >
          papirsarkany.hu
        </Link>
      </div>
    </div>
  );
}
