import KiteCard from '@/components/KiteCard';
import MasonryContainer from '@/components/MasonryContainer';
import { getAllKites } from '@/lib/sanity';

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
