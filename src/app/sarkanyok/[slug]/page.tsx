import AddToCartButton from '@/components/AddToCartButton';
import { getKitebySlug, getKites } from '@/lib/db';
import { currencyFormatter } from '@/lib/formatters';
import { getKiteStaticImageData } from '@/lib/kiteImages';
import { Kite } from '@/lib/types';
import Image from 'next/image';
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
    <>
      <div className="hidden h-full md:block">
        <DesktopKitePage kite={kite} />
      </div>
      <div className="block md:hidden">
        <MobileLayout kite={kite} />
      </div>
    </>
  );
}

function DesktopKitePage({ kite }: { kite: Kite }) {
  return (
    <div className="grid h-full grid-cols-3 gap-4 p-8">
      <div className="col-span-2 flex flex-col items-center space-y-4">
        {kite.imageUrl && (
          <Image
            className="h-3/4 w-full max-w-fit rounded-lg object-cover"
            src={getKiteStaticImageData(kite.imageUrl)}
            alt={kite.name}
            placeholder="blur"
          />
        )}

        {kite.properties?.isBeginner && (
          <h2 className="text-center font-bold text-primary underline underline-offset-8">
            Kezdőknek ajánlott!
          </h2>
        )}
      </div>

      <div className="space-y-4 text-3xl">
        <div className="space-y-2 text-left">
          <h1 className="font-bold">{kite.name}</h1>
          <div className="font-bold text-primary">
            {currencyFormatter(kite.price)}
          </div>
          <AddToCartButton product={kite} />
        </div>

        <div className="space-y-1">
          {kite.properties?.size && <h3>Méret: {kite.properties.size}</h3>}
          {kite.properties?.material && (
            <h3>Anyag: {kite.properties.material}</h3>
          )}
          {kite.properties?.windSpeed && (
            <h3>Szél: {kite.properties.windSpeed}</h3>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileLayout({ kite }: { kite: Kite }) {
  return (
    <div className="h-full space-y-4 p-8">
      <div className="space-y-4 text-center">
        <div>
          <h1 className="font-bold">{kite.name}</h1>
          {kite.properties?.isBeginner && (
            <h2 className=" font-bold text-primary underline underline-offset-8">
              Kezdőknek ajánlott!
            </h2>
          )}
        </div>

        {kite.imageUrl && (
          <Image
            className="mx-auto h-3/4 rounded-lg object-cover"
            src={getKiteStaticImageData(kite.imageUrl)}
            alt={kite.name}
            placeholder="blur"
          />
        )}

        <div className="space-y-2 ">
          <h2 className="font-bold text-primary">
            {currencyFormatter(kite.price)}
          </h2>
          <AddToCartButton product={kite} />
        </div>
      </div>

      <div className="space-y-1">
        {kite.properties?.size && <h2>Méret: {kite.properties.size}</h2>}
        {kite.properties?.material && (
          <h2>Anyag: {kite.properties.material}</h2>
        )}
        {kite.properties?.windSpeed && (
          <h2>Szél: {kite.properties.windSpeed}</h2>
        )}
      </div>
    </div>
  );
}
