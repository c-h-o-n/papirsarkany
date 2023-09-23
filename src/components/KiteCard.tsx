/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import Card from './Card';
import { currencyFormatter } from '@/lib/formatters';
import { Kite } from '@/lib/db';
import AddToCartButton from './AddToCartButton';


export default function KiteCard({ kite }: { kite: Kite }) {

  return (
    <div className="relative z-0 cursor-pointer">
      <Link href={`sarkanyok/${kite.slug}`}>
        <Card className="w-full break-inside-avoid-column space-y-2 p-5">
          <h3 className="text-center font-bold">{kite.name}</h3>
          
          {kite.imageUrl && <img src={kite.imageUrl} alt={kite.name} className="mx-auto mb-6 rounded-lg" />}
          
          {kite.properties?.isBeginner && <div className='text-center text-primary underline'>Kezdőknek ajánlott!</div>} 
          <h3 className="text-center font-bold text-primary">{currencyFormatter(kite.price)}</h3>
          <div className="flex justify-end">
            <AddToCartButton kite={kite}/>
          
          </div>
        </Card>
      </Link>
    </div>
  );
}
