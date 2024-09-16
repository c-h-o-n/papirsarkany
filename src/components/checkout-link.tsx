'use client';

import useCart from '@/hooks/use-cart';
import Link from 'next/link';

export default function CheckoutLink() {
  const { getTotalItemCount } = useCart();

  if (getTotalItemCount() < 1) {
    return;
  }

  return (
    <div className="flex justify-end">
      <Link href={'/penztar'}>
        <button className="d-btn d-btn-primary uppercase">
          Tovább a fizetéshez
        </button>
      </Link>
    </div>
  );
}
