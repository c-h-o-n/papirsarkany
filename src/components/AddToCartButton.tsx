'use client';

import { useCartStore } from '@/store/useCartStore';
import { Products } from '@prisma/client';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  product: Products & { price: number };
};

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isShowAlert, setIsShowAlert] = useState(false);

  const onclick = (e: MouseEvent) => {
    e.preventDefault();

    setIsShowAlert(true);
    setTimeout(() => setIsShowAlert(false), 3000);

    addToCart({ ...product, quantity: 1 });
  };

  return (
    <>
      {isShowAlert &&
        createPortal(
          <Link href="/kosar">
            <div className="d-toast d-toast-end d-toast-bottom z-50">
              <div className="d-alert d-alert-success">
                <span>Sikeresen hozzádva a kosárhoz.</span>
              </div>
            </div>
          </Link>,
          document.body,
        )}

      <button className="d-btn d-btn-primary uppercase" onClick={onclick}>
        Kosárba
      </button>
    </>
  );
}
