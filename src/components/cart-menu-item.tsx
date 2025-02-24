'use client';

import Link from 'next/link';

import type { FC } from 'react';
import CartIcon from '~/assets/cart.svg';
import useCart from '~/hooks/use-cart';

const CartMenuItem: FC = () => {
  const { getTotalItemCount } = useCart();

  return (
    <Link href={'/kosar'} className="d-btn-circle" data-pw-e2e="cart-menu-item">
      <div className="p-0">
        <div className="d-btn d-btn-circle d-btn-ghost">
          <div className="d-indicator">
            <CartIcon
              className="h-5 w-5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <span
              data-testid="cart-menu-item-total-count"
              className="d-badge d-indicator-item d-badge-sm"
            >
              {getTotalItemCount()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartMenuItem;
