import Link from "next/link";

import AboutBusinessIcon from "~/assets/about-business.svg";
import ContactIcon from "~/assets/contact.svg";
import CraftingIcon from "~/assets/crafting.svg";
import HomeSection from "~/components/home-section";
import ScrollTriggeredAnimatedCard from "~/components/scroll-triggered-animated-card";
import Splash from "~/components/splash";
import { env } from "~/lib/env";

// revalidate page every week
export const revalidate = 604800;

export default function Home() {
  return (
    <div>
      <Splash />

      <div className="container mx-auto max-w-screen-lg ">
        <HomeSection id="vallalkozas">
          <HomeSection.Icon>
            <AboutBusinessIcon />
          </HomeSection.Icon>
          <HomeSection.Content>
            <h1 className="text-center font-bold">A vállalkozásról</h1>

            <ScrollTriggeredAnimatedCard
              animationDirection="right-to-left"
              className="p-5 text-center font-semibold sm:p-10"
            >
              <h3>
                <span className="font-bold text-primary">Üzletem nincs</span>,
                ezért{" "}
                <span className="font-bold text-primary">
                  postai utánvétellel
                </span>{" "}
                szállítok, melynek költsége a megrendelőt terheli.
                <br />
                <span className="font-bold text-primary">
                  Személyesen{" "}
                  <Link className="underline" href="#elerhetoseg">
                    Nagykovácsiban
                  </Link>{" "}
                </span>
                (63-as BKV busszal megközelíthető) is vásárolhat
              </h3>
            </ScrollTriggeredAnimatedCard>

            <ScrollTriggeredAnimatedCard
              animationDirection="left-to-right"
              className="p-5 text-center font-semibold sm:p-10"
            >
              <h3>
                Sárkányaim repülési és{" "}
                <span className="font-bold text-primary">nyolc napos </span>
                pénzvisszafizetési garanciával kaphatók.
                <br />A visszaküldés költsége a vevőt terheli.
                <br />
                Minden érdeklődőnek{" "}
                <span className="font-bold text-primary">
                  egy óra ingyenes oktatás
                </span>{" "}
                sárkány biztosításával &mdash; vásárlási kötelezettség nélkül
                &mdash;{" "}
                <span className="font-bold text-primary">Nagykovácsiban</span>.
                <br />
                (Telefonos időpont egyeztetés után.)
                <br />
                <span className="font-bold text-primary">
                  Mindenkinek kellemes sárkányeresztést kívánok!
                </span>
              </h3>
            </ScrollTriggeredAnimatedCard>

            <ScrollTriggeredAnimatedCard
              animationDirection="right-to-left"
              className="space-y-2 p-5 text-center sm:p-10"
            >
              <h3 className="font-bold">Ducsai Barnabás</h3>
              <h4>
                <b>Adószám:</b> 61090938-1-33
                <br />
                <b>Számlaszám:</b> Erste Bank 11600006-00000000-76709302
              </h4>
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

            <ScrollTriggeredAnimatedCard
              animationDirection="left-to-right"
              className="p-5 text-center font-semibold sm:p-10"
            >
              <h3>
                A{" "}
                <span className="font-bold text-primary">
                  sárkánykészítés és -repítés{" "}
                </span>{" "}
                régebben mindennapos dolog volt a gyerekek hétköznapjaiban. Ez a
                &quot;tudomány&quot; apáról fiúra szállt, illetve a nagyobbaktól
                lesték el a kisebbek. A gyerekek mára elfelejtették ezt a szép
                régi játékot.
              </h3>
            </ScrollTriggeredAnimatedCard>

            <ScrollTriggeredAnimatedCard
              animationDirection="right-to-left"
              className="p-5 text-center font-semibold sm:p-10"
            >
              <h3>
                Vállalom{" "}
                <span className="font-bold text-primary">
                  sárkányépítő foglalkozások
                </span>{" "}
                vezetését gyerekrendezvények, -intézmények és céges rendezvények
                számára.
                <br />
                Anyagot biztosítok.
                <br />
                (Szelet a megrendelő biztosít.)
                <br />
                Ár egyedi megállapodás alapján.
              </h3>
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
              <h3>{env.VENDOR_EMAIL_ADDRESS}</h3>
              <h3>+36 30 9754 786</h3>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1131.6105816797208!2d18.87852618960264!3d47.57870829362802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xceefc53f4870d42e!2swww.papirsarkany.hu!5e0!3m2!1shu!2shu!4v1579197549648!5m2!1shu!2shu"
              className="h-[600px] w-full rounded-3xl"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google map"
            />
          </HomeSection.Content>
        </HomeSection>
      </div>
    </div>
  );
}
