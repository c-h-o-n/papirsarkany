'use client';

import { CartItem, Product } from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';

type AddToCartProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();

    try {
      if (!product.name) {
        throw new Error('Hiányzó név');
      }

      if (typeof product.price !== 'number') {
        throw new Error('Hiányzó vagy érvénytelen ár');
      }

      if (!product.packageInfo) {
        throw new Error('Hiányzó csomag információk');
      }

      if (
        typeof product.packageInfo.x !== 'number' ||
        typeof product.packageInfo.y !== 'number' ||
        typeof product.packageInfo.z !== 'number' ||
        typeof product.packageInfo.weight !== 'number'
      ) {
        throw new Error('Hiányzó vagy érvénytelen csomag információk');
      }

      setIsSuccess(true);

      setTimeout(() => setIsSuccess(false), 3000);

      const cartItem: CartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        packageInfo: {
          x: product.packageInfo.x,
          y: product.packageInfo.y,
          z: product.packageInfo.z,
          weight: product.packageInfo.weight,
        },
        quantity: 1,
      };

      addToCart(cartItem);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);

        setTimeout(() => setError(undefined), 3000);
      }
    }
  };

  return (
    <>
      {isSuccess
        ? createPortal(
            <Link href="/kosar">
              <div className="d-toast d-toast-end d-toast-bottom z-50">
                <div className="d-alert d-alert-success">
                  <span>Sikeresen hozzádva a kosárhoz.</span>
                </div>
              </div>
            </Link>,
            document.body,
          )
        : undefined}

      {error
        ? createPortal(
            <div className="d-toast d-toast-end d-toast-bottom z-50">
              <div className="d-alert d-alert-error ">
                <span className="text-white font-semibold">Hiba: {error}.</span>
              </div>
            </div>,
            document.body,
          )
        : undefined}

      <button className="d-btn d-btn-primary uppercase" onClick={onClick}>
        Kosárba
      </button>
    </>
  );
}
