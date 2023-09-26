import Card from '@/components/Card';

import Logo from '@/assets/logo.svg';
import AboutBusinessIcon from '@/assets/about-business.svg';
import ContactIcon from '@/assets/contact.svg';
import CraftingIcon from '@/assets/crafting.svg';

export default function Splash() {
  return (
    <div className="grid h-[calc(100vh-68px)] place-items-center content-center gap-4 bg-red-400 sm:h-[calc(100vh-72px)]">
      <div className="container">
        <Logo className="mx-auto hidden sm:block sm:w-[368px] mb-8" />
        <div className=" hidden justify-evenly gap-8 sm:flex">
          <Card className="p-12">
            <AboutBusinessIcon className="h-full w-full" />
          </Card>
          <Card className="p-12">
            <CraftingIcon className="h-full w-full" />
          </Card>
          <Card className="p-12">
            <ContactIcon className="h-full w-full" />
          </Card>
        </div>
        <div className="d-btm-nav sm:hidden">
          <button>
            <a href="#vallalkozas">
              <AboutBusinessIcon className="h-5 w-5" />
            </a>
          </button>
          <button className="active">
            <CraftingIcon className="h-5 w-5" />
          </button>
          <button>
            <ContactIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
