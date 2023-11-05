import MasonryContainer from '@/components/MasonryContainer';
import ReelCard from '@/components/ReelCard';
import RodCard from '@/components/RodCard';
import { getReels, getRods } from '@/lib/db';
import { ProductCategoryMap } from '@/lib/formatters';

export default async function Materials() {
  const reels = await getReels({ orderBy: { price: 'asc' } });
  const rods = await getRods({ orderBy: { price: 'asc' } });
  const pipes = [];
  const lines = [];

  console.log(reels);

  return (
    <div className="container p-8">
      <h1 className="text-center font-bold">Anyagok</h1>

      {reels && reels.length > 0 && (
        <>
          <h2 className="font-bold">{ProductCategoryMap['Zsinortartok']}</h2>
          <MasonryContainer>
            {reels.map((reel) => (
              <ReelCard reel={reel} key={reel.id} />
            ))}
          </MasonryContainer>
        </>
      )}
      
      {rods && rods.length && (
        <>
          <h2 className="font-bold">{ProductCategoryMap['PalcakRudak']}</h2>
          <MasonryContainer>
            {rods.map((rod) => (
              <RodCard rod={rod} key={rod.id} />
            ))}
          </MasonryContainer>
        </>
      )}

      <h2 className="font-bold">{pipes.length > 0 && ProductCategoryMap['Csovek']}</h2>
      <h2 className="font-bold">{lines.length > 0 && ProductCategoryMap['Zsinorok']}</h2>
    </div>
  );
}
