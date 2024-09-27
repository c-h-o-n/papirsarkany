import FacebookIcon from '@/assets/facebook.svg';
import { FC } from 'react';
const Footer: FC = () => {
  return (
    <footer className="border-t-4 border-solid border-black bg-sky-50 py-6 text-base-content md:py-10">
      <div className="flex flex-col items-center justify-center gap-x-2 gap-y-4 text-center text-sm font-medium md:flex-row">
        {/* Links */}
        <a href="aszf" className="">
          ÁSZF
        </a>

        <div className="d-divider d-divider-neutral d-divider-horizontal hidden md:flex"></div>

        {/* Copyright */}
        <div className="order-last md:order-none">
          &copy; {new Date().getFullYear()} papirsarkany.hu
        </div>

        <div className="d-divider d-divider-neutral d-divider-horizontal hidden md:flex"></div>

        {/* Social Media */}
        <a
          href="https://www.facebook.com/profile.php?id=61554743192842"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon className="h-8 w-8" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
