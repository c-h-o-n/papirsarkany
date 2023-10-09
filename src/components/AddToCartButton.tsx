'use client';

import { useCartStore } from '@/store/useCartStore';
import { Products } from '@prisma/client';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';

export default function AddToCartButton({ kite }: { kite: Products }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isShowAlert, setIsShowAlert] = useState(false);

  const onclick = (e: MouseEvent) => {
    e.preventDefault();

    setIsShowAlert(true);
    setTimeout(() => setIsShowAlert(false), 3000);

    addToCart({ ...kite, quantity: 1 });
  };

  return (
    <>
      {isShowAlert &&
        createPortal(
          <Link href="/kosar">
            <div className="d-toast d-toast-end d-toast-bottom z-50">
              <div className="d-alert d-alert-success" id="asd">
                <span>Sikeresen hozzádva a kosárhoz.</span>
              </div>
            </div>
          </Link>,
          document.body,
        )}

      <button className="d-btn d-btn-primary " onClick={onclick}>
        Kosárba
      </button>
    </>
  );
}
