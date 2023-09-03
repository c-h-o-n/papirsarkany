import Link from 'next/link';

import Home from '@/assets/home.svg';
import CartLink from './CartLink';

export default function Navbar() {
  return (
    <>
      <MobileNavbar />

      {/* <div className="hidden sm:block">
        <MobileNavbar />
      </div>
      <div className="block sm:hidden">
        <MobileNavbar />
      </div> */}
    </>
  );
}

function DesktopNavbar() {
  return (
    <div className="d-navbar bg-sky-100">
      <div className="flex-1">
        <Link href={'/'} className="d-btn d-btn- hover:!bg-sky-300 py-1 normal-case text-xl">
          <Home className="h-full" />
        </Link>
      </div>

      <div className="flex-none">
        <ul className="d-menu d-menu-horizontal px-1">
          <li>
            <Link href={'/sarkanyok'}>Sárkányok</Link>
          </li>

          <li>
            <Link href={'/anyagok'}>Anyagok</Link>
          </li>
        </ul>
      </div>

      <div className="flex-none">
        <CartLink />
      </div>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="d-drawer">
      <input id="my-drawer-3" type="checkbox" className="d-drawer-toggle" />
      <div className="d-drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full d-navbar bg-sky-100">
          <div className="flex-none sm:hidden">
            <label htmlFor="my-drawer-3" className="d-btn d-btn-square d-btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-none block sm:hidden">
            <CartLink />
          </div>

          <div className="flex-1 px-2 mx-2 justify-end sm:justify-start">
            <Link href={'/'} className="d-btn d-btn-ghost hover:!bg-sky-200 py-1 normal-case text-xl">
              <Home className="h-full hidden sm:block" />
              <div className="block sm:hidden">papirsarkany.hu</div>
            </Link>
          </div>


          <div className="flex-none hidden sm:block">
            <ul className="d-menu d-menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <Link href={'/sarkanyok'}>Sárkányok</Link>
              </li>
              <li>
                <Link href={'/anyagok'}>Anyagok</Link>
              </li>
            </ul>
          </div>
          <div className="flex-none hidden sm:block">
            <CartLink />
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className="d-drawer-side z-10">
        <label htmlFor="my-drawer-3" className="d-drawer-overlay"></label>
        <ul className="d-menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <li>
            <Link href={'/sarkanyok'}>Sárkányok</Link>
          </li>
          <li>
            <Link href={'/anyagok'}>Anyagok</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
