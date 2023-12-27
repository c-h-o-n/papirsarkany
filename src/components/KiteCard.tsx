import Link from 'next/link';

import Card from './Card';
import AddToCartButton from './AddToCartButton';
import { currencyFormatter } from '@/lib/formatters';
import { Kite } from '@/lib/types';

export default function KiteCard({ kite }: { kite: Kite }) {
  return (
    <div className="relative z-0 cursor-pointer">
      <Link href={`sarkanyok/${kite.slug}`}>
        <Card className="w-full space-y-3 p-5">
          <div>
            <h3 className="text-center font-bold">{kite.name}</h3>

            {kite.properties?.isBeginner && (
              <div className="text-center font-bold text-primary underline">
                Kezdőknek ajánlott!
              </div>
            )}
          </div>

          {kite.imageUrl && (
            <img
              src={kite.imageUrl}
              alt={kite.name}
              className="mx-auto mb-6 rounded-lg"
            />
          )}

          <h3 className="text-center font-bold text-primary">
            {currencyFormatter(kite.price)}
          </h3>

          <div className="flex justify-end">
            <AddToCartButton product={kite} />
          </div>
        </Card>
      </Link>
    </div>
  );
}
