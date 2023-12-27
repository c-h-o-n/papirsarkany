import { Reel } from '@/lib/types';
import Card from './Card';
import Link from 'next/link';
import { currencyFormatter } from '@/lib/formatters';
import AddToCartButton from './AddToCartButton';

type Props = {
  reel: Reel;
};

export default function ReelCard({ reel }: Props) {
  return (
    <Card className="w-full space-y-3 p-5">
      <div>
        <h3 className="text-center font-bold">{reel.name}</h3>
      </div>

      {reel.imageUrl && (
        <img
          src={reel.imageUrl}
          alt={reel.name}
          className="mx-auto mb-6 max-h-32 rounded-lg"
        />
      )}

      <h3 className="text-center font-bold text-primary">
        {currencyFormatter(reel.price)}
      </h3>

      <div className="flex justify-end">
        <AddToCartButton product={reel} />
      </div>
    </Card>
  );
}
