import Card from './Card';
import { currencyFormatter } from '@/lib/formatters';
import AddToCartButton from './AddToCartButton';
import { WithImageAsset } from '@/lib/types';
import { Reel } from '@sanity/lib/sanity.types';
import Image from 'next/image';
import { MISSING_IMG_URL, NO_NAME } from '@/lib/constants';

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
          src={reel.image.asset?.url || MISSING_IMG_URL}
          alt={reel.name || NO_NAME}
          width={reel.image.asset?.metadata?.dimensions?.width}
          height={reel.image.asset?.metadata?.dimensions?.height}
          placeholder="blur"
          blurDataURL={reel.image.asset?.metadata?.blurHash}
          className="mx-auto mb-6 max-h-32 rounded-lg object-contain"
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
