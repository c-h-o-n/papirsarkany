import { getKites } from '@/lib/db';

import MasonryContainer from '@/components/MasonryContainer';
import KiteCard from '@/components/KiteCard';

export default async function Kites() {
  const kites = await getKites({ orderBy: { price: 'asc' } });

  return (
    <div className="container p-8">
      <div className="mb-8 text-center font-bold">
        <h1 className="">Sárkányok</h1>
        <h3>A vételár tartalmaz 100m eresztőzsinórt és zsinórtartót.</h3>
      </div>

      <MasonryContainer>
        {kites.map((kite) => (
          <KiteCard kite={kite} key={kite.id} />
        ))}
      </MasonryContainer>
    </div>
  );
}
