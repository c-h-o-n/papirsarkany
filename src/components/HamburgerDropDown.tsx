import HamburgerIcon from '@/assets/hamburger.svg';
import NavMenuItem from './NavMenuItem';

export default function HamburgerDropDown() {
  return (
    <div className="d-dropdown">
      <div tabIndex={0} role="button" className="d-btn d-btn-ghost lg:hidden">
        <HamburgerIcon className="h-5 w-5" />
      </div>
      <ul
        tabIndex={0}
        className="d-menu d-dropdown-content z-[1] mt-5 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        <NavMenuItem href={'/sarkanyok'}>Sárkányok</NavMenuItem>
        <NavMenuItem href={'/anyagok'}>Anyagok</NavMenuItem>
        <NavMenuItem href={'/#vallalkozas'}>A vállalkozásról</NavMenuItem>
        <NavMenuItem href={'/#sarkany-keszites'}>Sárkány készítés</NavMenuItem>
        <NavMenuItem href={'/#elerhetoseg'}>Elérhetőség</NavMenuItem>
      </ul>
    </div>
  );
}
