import AddToCartButton from '@/components/AddToCartButton';

import { currencyFormatter } from '@/lib/formatters';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllKites, getKiteBySlug } from '@/lib/sanity';
import { Kite } from '@sanity/lib/sanity.types';
import { WithImageAsset } from '@/lib/types';

type Params = {
  slug: string
}

export async function generateStaticParams(): Promise<Partial<Params>[]> {
  const kites = await getAllKites();

  return kites.map((kite) => ({
    slug: kite.slug?.current,
  }));
}

export default async function Kite({ params }: { params: Params }) {
  const kite = await getKiteBySlug(params.slug);

  // TODO remove this after BUG is fixed in not-found.tsx
  if (!kite) {
    notFound();
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

function DesktopKitePage({ kite }: { kite: WithImageAsset<Kite> }) {
  return (
    <div className="grid h-full grid-cols-3 gap-4 p-8">
      <div className="col-span-2 flex flex-col items-center space-y-4">
        {kite.image && (
          <Image
            className="h-3/4 w-full max-w-fit rounded-lg object-cover"
            src={kite.image.asset?.url || 'no-url'}
            width={kite.image.asset?.metadata?.dimensions?.width}
            height={kite.image.asset?.metadata?.dimensions?.height}
            alt={kite.name || 'no-name'}
            placeholder="blur"
            blurDataURL={kite.image.asset?.metadata?.blurHash}
          />
        )}

        {kite.isBeginner && (
          <h2 className="text-center font-bold text-primary underline underline-offset-8">
            Kezdőknek ajánlott!
          </h2>
        )}
      </div>

      <div className="space-y-4 text-3xl">
        <div className="space-y-2 text-left">
          <h1 className="font-bold">{kite.name}</h1>
          {kite.price && (
            <div className="font-bold text-primary">
              {currencyFormatter(kite.price)}
            </div>
          )}
          <AddToCartButton product={kite} />
        </div>

        <div className="space-y-1">
          {kite.size && <h3>Méret: {kite.size}</h3>}
          <h3>Anyag:{kite.materials?.map((material) => material)}</h3>
          {kite.windSpeed && <h3>Szél: {kite.windSpeed}</h3>}
        </div>
      </div>
    </div>
  );
}

function MobileLayout({ kite }: { kite: WithImageAsset<Kite> }) {
  return (
    <div className="h-full space-y-4 p-8">
      <div className="space-y-4 text-center">
        <div>
          <h1 className="font-bold">{kite.name}</h1>
          {kite.isBeginner && (
            <h2 className=" font-bold text-primary underline underline-offset-8">
              Kezdőknek ajánlott!
            </h2>
          )}
        </div>

        {kite.image && (
          <Image
            className="mx-auto h-3/4 rounded-lg object-cover"
            src={kite.image.asset?.url || 'no-url'}
            width={kite.image.asset?.metadata?.dimensions?.width}
            height={kite.image.asset?.metadata?.dimensions?.height}
            alt={kite.name || 'no-name'}
            placeholder="blur"
            blurDataURL={kite.image.asset?.metadata?.blurHash}
          />
        )}

        <div className="space-y-2 ">
          {kite.price && <h2 className="font-bold text-primary">
            {currencyFormatter(kite.price)}
          </h2>}
          <AddToCartButton product={kite} />
        </div>
      </div>

      <div className="space-y-1">
        {kite?.size && <h2>Méret: {kite.size}</h2>}

          <h2>Anyag:{kite.materials?.map((material) => material)}</h2>

        {kite.windSpeed && (
          <h2>Szél: {kite.windSpeed}</h2>
        )}
      </div>
    </div>
  );
}
