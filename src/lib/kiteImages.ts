import ConyeDelta from '../../public/kites/conye-delta.webp';
import Delta from '../../public/kites/delta.webp';
import Deltoid100 from '../../public/kites/deltoid100.webp';
import Deltoid50FiveColors from '../../public/kites/deltoid50-5szin.webp';
import Deltoid50TwoColors from '../../public/kites/deltoid50-ketszin.webp';
import Deltoid50National from '../../public/kites/deltoid50-nemzeti.webp';
import Deltoid50Panda from '../../public/kites/deltoid50-panda.webp';
import Deltoid50Zebra from '../../public/kites/deltoid50-zebra.webp';
import Deltoid66National from '../../public/kites/deltoid66-nemzeti.webp';
import Deltoid66 from '../../public/kites/deltoid66.webp';
import Doboz from '../../public/kites/doboz.webp';
import Genki from '../../public/kites/genki.webp';
import DevilNestling from '../../public/kites/ordogfioka.webp';
import Pufi from '../../public/kites/pufi.webp';
import WindBag from '../../public/kites/szelzsak.webp';
import Heart from '../../public/kites/sziv.webp';

import MissingImage from '../../public/missing-image.webp';
import { StaticImageData } from 'next/image';

const imgMap: Record<string, StaticImageData> = {
  '/kites/conye-delta.webp': ConyeDelta,
  '/kites/delta.webp': Delta,
  '/kites/deltoid100.webp': Deltoid100,
  '/kites/deltoid50-5szin.webp': Deltoid50FiveColors,
  '/kites/deltoid50-ketszin.webp': Deltoid50TwoColors,
  '/kites/deltoid50-nemzeti.webp': Deltoid50National,
  '/kites/deltoid50-panda.webp': Deltoid50Panda,
  '/kites/deltoid50-zebra.webp': Deltoid50Zebra,
  '/kites/deltoid66-nemzeti.webp': Deltoid66National,
  '/kites/deltoid66.webp': Deltoid66,
  '/kites/doboz.webp': Doboz,
  '/kites/genki.webp': Genki,
  '/kites/ordogfioka.webp': DevilNestling,
  '/kites/pufi.webp': Pufi,
  '/kites/szelzsak.webp': WindBag,
  '/kites/sziv.webp': Heart,
};

export function getKiteStaticImageData(imageUrl: string) {
  return imgMap[imageUrl] || MissingImage;
}
