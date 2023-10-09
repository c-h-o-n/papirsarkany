import MasonryContainer from '@/components/MasonryContainer';
import RodCard from '@/components/RodCard';
import { getRods } from '@/lib/db';
import { ProductCategoryMap } from '@/lib/formatters';

export default async function Materials() {
  const rods = await getRods({ orderBy: { price: 'asc' } });
  const pipes = [];
  const lines = [];
  const handles = [];

  return (
    <div className="container p-8">
      <h1 className="text-center font-bold">Anyagok</h1>

      <h2 className="font-bold">{rods.length > 0 && ProductCategoryMap['PalcakRudak']}</h2>
      <MasonryContainer>
        {rods.map((rod) => (
          <RodCard rod={rod} key={rod.id} />
        ))}
      </MasonryContainer>

      <h2 className="font-bold">{pipes.length > 0 && ProductCategoryMap['Csovek']}</h2>
      <h2 className="font-bold">{lines.length > 0 && ProductCategoryMap['Zsinorok']}</h2>
      <h2 className="font-bold">{handles.length > 0 && ProductCategoryMap['Zsinortartok']}</h2>
    </div>
  );
}
