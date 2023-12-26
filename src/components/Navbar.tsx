import Link from 'next/link';

import CartLink from './CartLink';
import HomeIcon from '@/assets/home.svg';
import HamburgerIcon from '@/assets/hamburger.svg';
import MobileNavLink from './MobileNavLink';

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10">
      <div className="hidden sm:block">
        <DesktopNavbar />
      </div>
      <div className="block sm:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}

function DesktopNavbar() {
  return (
    <div className="d-navbar border-b-4 border-black bg-white">
      <div className="d-navbar-start gap-1">
        <Link href={'/'} className="d-btn d-btn-ghost py-1 text-xl normal-case hover:!bg-sky-200">
          <HomeIcon className="h-full" />
        </Link>
      </div>
      <div className="d-navbar-end">
        <ul className="d-menu d-menu-horizontal gap-2 text-base font-extrabold">
          <li>
            <Link href={'/sarkanyok'}>Sárkányok</Link>
          </li>
          <li>
            <Link href={'/anyagok'}>Anyagok</Link>
          </li>
        </ul>
        <div className="flex-none">
          <CartLink />
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
          <label tabIndex={0} className="d-btn d-btn-ghost">
            <HamburgerIcon className="h-5 w-5" />
          </label>
          <ul tabIndex={0} className="d-menu d-dropdown-content rounded-box z-[1] mt-5 w-52 bg-base-100 p-2 shadow">
            <li>
              <MobileNavLink href={'/sarkanyok'}>Sárkányok</MobileNavLink>
            </li>
            <li>
              <MobileNavLink href={'/anyagok'}>Anyagok</MobileNavLink>
            </li>
          </ul>
        </div>

        <div className="flex-none">
          <CartLink />
        </div>
      </div>

      <div className="d-navbar-end">
        <Link href={'/'} className="d-btn d-btn-ghost normal-case min-[320px]:text-xl">
          papirsarkany.hu
        </Link>
      </div>
    </div>
  );
}
