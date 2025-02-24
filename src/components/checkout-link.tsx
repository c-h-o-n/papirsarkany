'use client';

import Link from 'next/link';
import type { FC } from 'react';
import useCart from '~/hooks/use-cart';

const CheckoutLink: FC = () => {
  const { getTotalItemCount } = useCart();

  if (getTotalItemCount() < 1) {
    return;
  }

  return (
    <div className="flex justify-end">
      <Link href={'/penztar'}>
        <button className="d-btn d-btn-primary uppercase" type="button">
          Tovább a fizetéshez
        </button>
      </Link>
    </div>
  );
};

export default CheckoutLink;
