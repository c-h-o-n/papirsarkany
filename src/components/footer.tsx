import FacebookIcon from '@/assets/facebook.svg';
import { FC } from 'react';
const Footer: FC = () => {
  return (
    <footer className="border-t-4 border-solid border-black bg-sky-50 py-6 text-base-content md:py-10">
      <div className="flex flex-col items-center justify-around gap-4 text-center text-sm font-medium md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div>&copy; {new Date().getFullYear()} papirsarkany.hu</div>
          <a
            href="https://www.facebook.com/profile.php?id=61554743192842"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="h-8 w-8" />
          </a>
        </div>
        <a href="aszf" className="">
          ÁSZF
        </a>
      </div>
    </footer>
  );
};

export default Footer;
