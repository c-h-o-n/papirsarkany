/* eslint-disable @next/next/no-img-element */
import AddToCartButton from '@/components/AddToCartButton';
import { getKitebySlug, getKites } from '@/lib/db';
import { currencyFormatter } from '@/lib/formatters';
import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  const kites = await getKites();

  return kites.map((kite) => ({
    slug: kite.slug,
  }));
}

export default async function Kite({ params }: { params: { slug: string } }) {
  const kite = await getKitebySlug(params.slug);

  if (!kite) {
    redirect('/404');
  }

  return (
    <div className="h-full p-8 sm:grid sm:grid-cols-2 sm:gap-4">
      <div className="flex flex-col items-center space-y-4">
        {kite.imageUrl && <img className="h-3/4 rounded-lg object-cover" src={kite.imageUrl} alt={kite.name} />}

        <AddToCartButton kite={kite} />
      </div>
      <div className="space-y-4 text-3xl">
        <div className="text-center sm:text-left">
          <h2 className="font-bold">{kite.name}</h2>
          <div className="font-bold text-primary">{currencyFormatter(kite.price)}</div>
        </div>

        <div>
          <div>Meret</div>
          <div>Anyag</div>
          <div>Szelerosseg</div>
          <div>Kezdoknek ajonlott</div>
        </div>
      </div>
    </div>
  );
}
