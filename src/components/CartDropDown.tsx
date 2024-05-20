"use client";

import Link from "next/link";

import CartIcon from "@/assets/cart.svg";
import { currencyFormatter } from "@/lib/formatters";
import { useCartStore } from "@/store/useCartStore";
import { blurActiveAnchorElement } from "@/lib/helpers";

export default function CartDropDown() {
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <div className="d-dropdown p-0 sm:d-dropdown-end">
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
            {totalItems}
          </span>
        </div>
      </label>

      <div
        tabIndex={0}
        className="d-card d-dropdown-content d-card-compact z-[1] mt-5 w-52 bg-base-100 shadow"
      >
        <div className="d-card-body">
          <span className="text-lg font-bold">{totalItems} termék</span>
          <span className="text-info">
            Összesen: {currencyFormatter(totalPrice)}
          </span>
          <div className="d-card-actions">
            <Link
              href={"/kosar"}
              className="d-btn d-btn-primary d-btn-block uppercase"
              onClick={blurActiveAnchorElement}
            >
              Kosár
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
