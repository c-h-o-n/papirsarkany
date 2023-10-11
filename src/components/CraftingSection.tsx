import CraftingIcon from '@/assets/crafting.svg';

export default function CraftingSection() {
  return (
    <section id="sarkany-keszites" className=" py-12">
      <div className="flex justify-center pb-4 sm:float-left sm:pr-4">
        <CraftingIcon className="h-32 w-32" />
      </div>
      <div>
        <h2 className="font-bold">Sárkányépítő foglalkozások</h2>

        <p>
          A sárkánykészítés és -repítés régebben mindennapos dolog volt a gyerekek hétköznapjaiban. Ez a
          &quot;tudomány&quot; apáról fiúra szállt, illetve a nagyobbaktól lesték el a kisebbek. A gyerekek mára
          elfelejtették ezt a szép régi játékot.
        </p>

        <p>
          Vállalom sárkányépítő foglalkozások vezetését gyerekrendezvények, -intézmények és céges rendezvények számára.
        </p>

        <p>Anyagot biztosítok. (Szelet a megrendelő biztosít.) Ár egyedi megállapodás alapján.</p>
      </div>
    </section>
  );
}
