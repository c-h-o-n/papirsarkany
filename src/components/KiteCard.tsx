import Image from 'next/image';
import Link from 'next/link';

import { MISSING_IMG_URL, NO_NAME } from '@/lib/constants';
import { currencyFormatter } from '@/lib/formatters';
import { WithImageAsset } from '@/lib/types';
import { Kite } from '@sanity/lib/sanity.types';
import AddToCartButton from './AddToCartButton';

import HoverAnimatedCard from './HoverAnimatedCard';

type KiteCardProps = {
  kite: WithImageAsset<Kite>;
};

export default function KiteCard({ kite }: KiteCardProps) {
  return (
    <div className="relative z-0 cursor-pointer">
      <Link href={`sarkanyok/${kite.slug?.current}`}>
        <HoverAnimatedCard className="w-full space-y-3 p-3 sm:p-4 md:p-5">
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
              src={kite.image?.asset?.url || MISSING_IMG_URL}
              alt={kite.name || NO_NAME}
              width={kite.image.asset?.metadata?.dimensions?.width}
              height={kite.image.asset?.metadata?.dimensions?.height}
              placeholder="blur"
              blurDataURL={kite.image.asset?.metadata?.blurHash}
              loading="lazy"
              className="mx-auto mb-6 rounded-lg object-cover"
            />
          )}

          <h3 className="text-center font-bold text-primary">
            {currencyFormatter(kite.price || 0)}
          </h3>

          <div className="flex justify-end">
            <AddToCartButton product={kite} />
          </div>
        </HoverAnimatedCard>
      </Link>
    </div>
  );
}
