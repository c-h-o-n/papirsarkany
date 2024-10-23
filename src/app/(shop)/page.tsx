import Link from 'next/link';

import AboutBusinessIcon from '~/assets/about-business.svg';
import ContactIcon from '~/assets/contact.svg';
import CraftingIcon from '~/assets/crafting.svg';
import HomeSection from '~/components/home-section';
import ScrollTriggeredAnimatedCard from '~/components/scroll-triggered-animated-card';
import Splash from '~/components/splash';
import { env } from '~/lib/env';

// revalidate page every week
export const revalidate = 604800;

export default function Home() {
  return (
    <div>
      <Splash />

      <div className="container mx-auto max-w-screen-lg">
        <HomeSection id="vallalkozas">
          <HomeSection.Icon>
            <AboutBusinessIcon />
          </HomeSection.Icon>
          <HomeSection.Content>
            <h1 className="text-center font-bold">A vállalkozásról</h1>

            <ScrollTriggeredAnimatedCard className="p-5 text-center font-semibold sm:p-10">
              <h4>
                Üzletem nincs, ezért postai utánvétellel szállítok, melynek
                költsége a megrendelőt terheli.
                <br />
                Személyesen{' '}
                <Link className="underline" href="#elerhetoseg">
                  Nagykovácsiban
                </Link>{' '}
                (63-as BKV busszal megközelíthető) is vásárolhat
              </h4>
            </ScrollTriggeredAnimatedCard>

            <ScrollTriggeredAnimatedCard className="p-5 text-center font-semibold sm:p-10">
              <h4>
                Sárkányaim repülési és nyolc napos pénzvisszafizetési
                garanciával kaphatók.
              </h4>
              <h4>A visszaküldés költsége a vevőt terheli.</h4>
              <h4>
                Minden érdeklődőnek egy óra ingyenes oktatás sárkány
                biztosításával - vásárlási kötelezettség nélkül -
                Nagykovácsiban. (Telefonos időpont egyeztetés után.)
              </h4>

              <h4>Mindenkinek kellemes sárkányeresztést kívánok</h4>
            </ScrollTriggeredAnimatedCard>

            <ScrollTriggeredAnimatedCard className="p-5 text-center sm:p-10">
              <h2 className="font-bold">Ducsai Barnabás</h2>
              <h5>
                <b>Adószám:</b> 61090938-1-33
              </h5>
              <h5>
                <b>Számlaszám:</b> Erste Bank 11600006-00000000-76709302
              </h5>
            </ScrollTriggeredAnimatedCard>
          </HomeSection.Content>
        </HomeSection>

        <HomeSection id="sarkany-keszites">
          <HomeSection.Icon>
            <CraftingIcon />
          </HomeSection.Icon>
          <HomeSection.Content>
            <h1 className="text-center font-bold">
              Sárkányépítő foglalkozások
            </h1>

            <ScrollTriggeredAnimatedCard className="p-5 text-center font-semibold sm:p-10">
              <h4>
                A sárkánykészítés és -repítés régebben mindennapos dolog volt a
                gyerekek hétköznapjaiban. Ez a &quot;tudomány&quot; apáról fiúra
                szállt, illetve a nagyobbaktól lesték el a kisebbek. A gyerekek
                mára elfelejtették ezt a szép régi játékot.
              </h4>
            </ScrollTriggeredAnimatedCard>

            <ScrollTriggeredAnimatedCard className="p-5 text-center font-semibold sm:p-10">
              <h4>
                Vállalom sárkányépítő foglalkozások vezetését
                gyerekrendezvények, -intézmények és céges rendezvények számára.
                <br />
                Anyagot biztosítok. (Szelet a megrendelő biztosít.) Ár egyedi
                megállapodás alapján.
              </h4>
            </ScrollTriggeredAnimatedCard>
          </HomeSection.Content>
        </HomeSection>

        <HomeSection id="elerhetoseg">
          <HomeSection.Icon>
            <ContactIcon />
          </HomeSection.Icon>

          <HomeSection.Content>
            <h1 className="text-center font-bold">Elérhetőség</h1>

            <div className="text-center font-semibold">
              <h4>{env.VENDOR_EMAIL_ADDRESS}</h4>
              <h4>+36 30 9754 786</h4>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.6105816797208!2d18.87852618960264!3d47.57870829362802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xceefc53f4870d42e!2swww.papirsarkany.hu!5e0!3m2!1shu!2shu!4v1579197549648!5m2!1shu!2shu"
              className="h-[600px] w-full rounded-3xl"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title='Google map'
            ></iframe>
          </HomeSection.Content>
        </HomeSection>
      </div>
    </div>
  );
}
