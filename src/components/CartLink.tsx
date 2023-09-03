'use client';

import CartIcon from '@/assets/cart.svg';
import Link from 'next/link';
import { useState } from 'react';

export default function CartLink() {
  const [cartQuantity] = useState(8);
  const [totalPrice] = useState(30000);

  return (
    <div className="d-dropdown sm:d-dropdown-end ">
      <label tabIndex={0} className="d-btn d-btn-ghost d-btn-circle">
        <div className="d-indicator">
          <CartIcon className="h-5 w-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <span className="d-badge d-badge-sm d-indicator-item">{cartQuantity}</span>
        </div>
      </label>

      <div tabIndex={0} className="mt-3 z-[1] d-card d-card-compact d-dropdown-content w-52 bg-base-100 shadow">
        <div className="d-card-body">
          <span className="font-bold text-lg">{cartQuantity}</span>
          <span className="text-info">Összeg: {totalPrice} Ft</span>
          <div className="d-card-actions">
            <Link href={'/kosar'} className="d-btn d-btn-primary d-btn-block">
              Kosár
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
