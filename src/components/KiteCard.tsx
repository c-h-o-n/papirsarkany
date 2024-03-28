import Link from 'next/link';

import Card from './Card';
import AddToCartButton from './AddToCartButton';
import { currencyFormatter } from '@/lib/formatters';

import Image from 'next/image';

import { getKiteStaticImageData } from '@/lib/kiteImages';
import { GetAllKitesQueryResult } from '../../sanity/lib/sanity.types';

export default function KiteCard({ kite }: { kite: GetAllKitesQueryResult[0] }) {
  return (
    <div className="relative z-0 cursor-pointer">
      <Link href={`sarkanyok/${kite.slug?.current}`}>
        <Card className="w-full space-y-3 p-5">
          <div>
            <h3 className="text-center font-bold">{kite.name}</h3>

            {kite.isBeginner && (
              <div className="text-center font-bold text-primary underline">
                Kezdőknek ajánlott!
              </div>
            )}
          </div>

          {kite.image && (
            <Image
              src={kite.image.asset?.url || 'no-url'}
              width={kite.image.asset?.metadata?.dimensions?.width}
              height={kite.image.asset?.metadata?.dimensions?.height}
              placeholder="blur"
              blurDataURL={kite.image.asset?.metadata?.blurHash}
              alt={kite.name || 'no-name'}
              loading="lazy"
              className="mx-auto mb-6 rounded-lg object-cover"
            />
          )}

          <h3 className="text-center font-bold text-primary">
            {currencyFormatter(kite.price || 0)}
          </h3>

          <div className="flex justify-end">
            {/* <AddToCartButton product={kite} /> */}
          </div>
        </Card>
      </Link>
    </div>
  );
}
