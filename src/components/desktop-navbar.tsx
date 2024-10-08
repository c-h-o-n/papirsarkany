import Link from 'next/link';

import HomeIcon from '@/assets/home.svg';
import CartMenuItem from './cart-menu-item';
import NavMenuItem from './nav-menu-item';
import { NavbarItems } from './navbar';

type DesktopNavbarProps = {
  navbarItems: NavbarItems;
};

export default function DesktopNavbar({ navbarItems }: DesktopNavbarProps) {
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
            <NavMenuItem
              key={navbarItem.href.toString()}
              href={navbarItem.href}
            >
              {navbarItem.children}
            </NavMenuItem>
          ))}
        </ul>
      </div>
      <div className="d-navbar-end">
        <ul className="d-menu d-menu-horizontal gap-2 text-base font-extrabold">
          {navbarItems.rightItems.map((navbarItem) => (
            <NavMenuItem
              key={navbarItem.href.toString()}
              href={navbarItem.href}
            >
              {navbarItem.children}
            </NavMenuItem>
          ))}
        </ul>
        <div className="flex-none">
          <CartMenuItem />
        </div>
      </div>
    </div>
  );
}
