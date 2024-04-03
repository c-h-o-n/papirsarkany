import Card from './Card';
import Link from 'next/link';
import { currencyFormatter } from '@/lib/formatters';
import AddToCartButton from './AddToCartButton';
import { WithImageAsset } from '@/lib/types';
import { Reel } from '@sanity/lib/sanity.types';
import Image from 'next/image';

type Props = {
  reel: WithImageAsset<Reel>;
};

export default function ReelCard({ reel }: Props) {
  return (
    <Card className="w-full space-y-3 p-5">
      <div>
        <h3 className="text-center font-bold">{reel.name}</h3>
      </div>

      {reel.image && (
        <Image
          src={reel.image.asset?.url || 'no-url'}
          alt={reel.name || 'no-name'}
          width={reel.image.asset?.metadata?.dimensions?.width}
          height={reel.image.asset?.metadata?.dimensions?.height}
          placeholder="blur"
          blurDataURL={reel.image.asset?.metadata?.blurHash}
          className="mx-auto mb-6 max-h-32 rounded-lg"
        />
      )}

      {reel.price && (
        <h3 className="text-center font-bold text-primary">
          {currencyFormatter(reel.price)}
        </h3>
      )}

      <div className="flex justify-end">
        <AddToCartButton product={reel} />
      </div>
    </Card>
  );
}
