import MasonryContainer from '@/components/MasonryContainer';
import ReelCard from '@/components/ReelCard';
import RodCard from '@/components/RodCard';
import TubeCard from '@/components/TubeCard';
import { getReels, getRods, getTubes } from '@/lib/db';
import { ProductCategoryMap } from '@/lib/formatters';

export default async function Materials() {
  const reels = await getReels({ orderBy: { price: 'asc' } });
  const rods = await getRods({ orderBy: { name: 'asc' } });
  const tubes = await getTubes({ orderBy: { name: 'asc' } });
  const lines = [];

  return (
    <div className="container space-y-8 p-8">
      <h1 className="text-center font-bold">Anyagok</h1>

      {reels && reels.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bold">{ProductCategoryMap['Zsinortartok']}</h2>
          <MasonryContainer>
            {reels.map((reel) => (
              <ReelCard reel={reel} key={reel.id} />
            ))}
          </MasonryContainer>
        </div>
      )}

      {rods && rods.length && (
        <div className="space-y-4">
          <h2 className="font-bold">{ProductCategoryMap['PalcakRudak']}</h2>
          <MasonryContainer>
            {rods.map((rod) => (
              <RodCard rod={rod} key={rod.id} />
            ))}
          </MasonryContainer>
        </div>
      )}

      {tubes && tubes.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bold">{ProductCategoryMap['Csovek']}</h2>

          <MasonryContainer>
            {tubes.map((tube) => (
              <TubeCard tube={tube} key={tube.id} />
            ))}
          </MasonryContainer>
        </div>
      )}

      <h2 className="font-bold">
        {lines.length > 0 && ProductCategoryMap['Zsinorok']}
      </h2>
    </div>
  );
}
