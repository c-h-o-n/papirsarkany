import { getKites } from '@/lib/db';

import Pufi from '@/assets/kites/pufi.jpg';
import Deltoid50Ketszin from '@/assets/kites/deltoid50-ketszin.jpg';
import Deltoid50Nemzeti from '@/assets/kites/deltoid50-nemzeti.jpg';



import MasonryContainer from '@/components/MasonryContainer';
import KiteCard from '@/components/KiteCard';



export default async function Kites() {
  const mockData = [
    {
      id: 1,
      name: 'sarkany-01',
      imageUrl: Deltoid50Ketszin,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 2,
      name: 'sarkany-02',
      imageUrl: Pufi,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 3,
      name: 'sarkany-03',
      imageUrl: Deltoid50Nemzeti,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 11,
      name: 'sarkany-04',
      imageUrl: Deltoid50Ketszin,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 22,
      name: 'sarkany-05',
      imageUrl: Pufi,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 33,
      name: 'sarkany-06',
      imageUrl: Deltoid50Nemzeti,
      price: 2000,
      slug: 'sarkany-slug-',
    },
  ];


  
  const kites = await getKites();

  console.log(kites);

  return (
    <div className="p-8 sm:container">
      <h1 className="mb-8 text-center font-bold">Sárkányok</h1>

      <MasonryContainer>
        {kites.map((kite) => (
          <KiteCard kite={kite} key={kite.id} />
        ))}
      </MasonryContainer>
    </div>
  );
}
