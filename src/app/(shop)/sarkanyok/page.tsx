
import KiteCard from '@/components/kite-card';
import MasonryContainer from '@/components/masonry-container';
import { getAllKites } from '@/lib/cms';

export default async function Kites() {
  const kites = await getAllKites();

  return (
    <div className="container p-8">
      <div className="mb-8 text-center font-bold">
        <h1 className="">Sárkányok</h1>
        <h3>A vételár tartalmaz 100m eresztőzsinórt és zsinórtartót.</h3>
      </div>

      <MasonryContainer>
        {kites.map((kite) => (
          <KiteCard kite={kite} key={kite._id} />
        ))}
      </MasonryContainer>
    </div>
  );
}
