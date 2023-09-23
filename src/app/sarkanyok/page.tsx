import { getKites } from '@/lib/db';

import MasonryContainer from '@/components/MasonryContainer';
import KiteCard from '@/components/KiteCard';
import { Prisma } from '@prisma/client';


type Kite = Prisma.ProductsSelect & {
  properties: {
    isBeginner: boolean;
  }
}  ; 
export default async function Kites() {
  const kites = await getKites();

  return (
    <div className="p-8 sm:container">
      <div className="mb-8 text-center font-bold">
        <h1 className="">Sárkányok</h1>
        <h3>A vételár tartalmaz 100m eresztőzsinórt és fogantyút.</h3>
      </div>
    
      <MasonryContainer>
        {kites.map((kite) => (
          <KiteCard kite={kite} key={kite.id} />
        ))}
      </MasonryContainer>
    </div>
  );
}
