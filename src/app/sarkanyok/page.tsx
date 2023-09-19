'use client';

import { MouseEvent } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Image from 'next/image';
import Link from 'next/link';

import Card from '@/components/Card';

import Pufi from '@/assets/kites/pufi.jpg';
import Deltoid50Ketszin from '@/assets/kites/deltoid50-ketszin.jpg';
import Deltoid50Nemzeti from '@/assets/kites/deltoid50-nemzeti.jpg';

export default function Kites() {
  const mockData = [
    {
      id: 1,
      name: 'sarkany-01',
      imageUrl: Deltoid50Ketszin,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 2,
      name: 'sarkany-02',
      imageUrl: Pufi,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 3,
      name: 'sarkany-03',
      imageUrl: Deltoid50Nemzeti,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 11,
      name: 'sarkany-04',
      imageUrl: Deltoid50Ketszin,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 22,
      name: 'sarkany-05',
      imageUrl: Pufi,
      price: 2000,
      slug: 'sarkany-slug-',
    },
    {
      id: 33,
      name: 'sarkany-06',
      imageUrl: Deltoid50Nemzeti,
      price: 2000,
      slug: 'sarkany-slug-',
    },
  ];

  const addCart = (e: MouseEvent) => {
    e.preventDefault();
    console.log('added to cart');
  };

  return (
    <div className="sm:container p-8">
      <h1 className="mb-8 text-center font-bold">Sárkányok</h1>

      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 639: 2, 1023: 3 }}>
        <Masonry gutter="24px">
          {mockData.map((kite) => {
            return (
              <div key={kite.id} className="relative z-0">
                <Link href={`sarkanyok/${kite.slug}-${kite.id}`}>
                  <Card className="w-full break-inside-avoid-column space-y-2 p-5">
                    <h3 className="text-center font-bold">{kite.name}</h3>
                    <Image src={kite.imageUrl} alt={kite.name} className="mx-auto mb-6 rounded-lg" />
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
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
