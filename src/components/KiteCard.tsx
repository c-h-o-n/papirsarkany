'use client';

import Link from 'next/link';
import Card from './Card';
import Image from 'next/image';
import { MouseEvent } from 'react';

export default function KiteCard({ kite }: { kite: any }) {
  const addCart = (e: MouseEvent) => {
    e.preventDefault();
    console.log('added to cart');
  };

  return (
    <div className="relative z-0">
      <Link href={`sarkanyok/${kite.slug}`}>
        <Card className="w-full break-inside-avoid-column space-y-2 p-5">
          <h3 className="text-center font-bold">{kite.name}</h3>
          {kite.imageUrl && <Image src={kite.imageUrl} alt={kite.name} className="mx-auto mb-6 rounded-lg" />}
          <h3 className="text-center font-bold text-primary">{kite.price}</h3>
          <div className="flex justify-end">
            <button className="d-btn d-btn-primary " onClick={addCart}>
              +
            </button>
          </div>
        </Card>
      </Link>
    </div>
  );
}
