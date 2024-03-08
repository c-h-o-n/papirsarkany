import Link from 'next/link';

import CartDropDown from './CartDropDown';
import HomeIcon from '@/assets/home.svg';
import HamburgerIcon from '@/assets/hamburger.svg';
import NavMenuItem from './NavMenuItem';
import HamburgerDropDown from './HamburgerDropDown';

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
          <NavMenuItem href={'/#vallalkozas'}>A vállalkozásról</NavMenuItem>
          <NavMenuItem href={'/#sarkany-keszites'}>
            Sárkány készítés
          </NavMenuItem>
          <NavMenuItem href={'/#elerhetoseg'}>Elérhetőség</NavMenuItem>
        </ul>
      </div>
      <div className="d-navbar-end">
        <ul className="d-menu d-menu-horizontal gap-2 text-base font-extrabold">
          <NavMenuItem href={'/sarkanyok'}>Sárkányok</NavMenuItem>

          <NavMenuItem href={'/anyagok'}>Anyagok</NavMenuItem>
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
        <HamburgerDropDown />

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
