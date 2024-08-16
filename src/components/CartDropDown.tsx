'use client';
import { useRouter } from 'next/navigation';

import CartIcon from '@/assets/cart.svg';
import useCart from '@/hooks/useCart';
import { currencyFormatter } from '@/lib/formatters';
import { blurActiveAnchorElement } from '@/lib/helpers';

export default function CartDropDown() {
  const { getTotalItemCount, getTotalPrice } = useCart();
  const router = useRouter();

  return (
    <div className="d-dropdown p-0 md:d-dropdown-end">
      <label
        tabIndex={0}
        className="d-btn d-btn-circle d-btn-ghost"
        data-pw-e2e="cart-dropdown"
      >
        <div className="d-indicator">
          <CartIcon
            className="h-5 w-5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <span className="d-badge d-indicator-item d-badge-sm">
            {getTotalItemCount()}
          </span>
        </div>
      </label>

      <div className="d-card d-dropdown-content d-card-compact z-[1] mt-5 w-52 bg-base-100 shadow">
        <div className="d-card-body">
          <span className="text-lg font-bold">
            {getTotalItemCount()} termék
          </span>
          <span className="text-info">
            Összesen: {currencyFormatter(getTotalPrice())}
          </span>
          <div className="d-card-actions">
            <button
              className="d-btn d-btn-primary d-btn-block uppercase"
              onClick={() => {
                router.push('/kosar');
                blurActiveAnchorElement();
              }}
            >
              Kosár
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
