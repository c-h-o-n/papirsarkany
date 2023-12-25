'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export default function CheckoutLink() {
  const totalCartItems = useCartStore((state) => state.totalItems);

  if (totalCartItems < 1) {
    return;
  }
  return (
    <div className="flex justify-end">
      <Link href={'/penztar'}>
        <button className="d-btn d-btn-primary uppercase">Tovább a fizetéshez</button>
      </Link>
    </div>
  );
}
