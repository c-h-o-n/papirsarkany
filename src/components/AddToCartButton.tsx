'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { CartItem, Product } from '@/lib/types';

type AddToCartProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isShowAlert, setIsShowAlert] = useState(false);

  const onClick = (e: MouseEvent) => {
    e.preventDefault();

    if (!product.name || !product.price) {
      throw Error('No name or price provided');
    }

    setIsShowAlert(true);
    setTimeout(() => setIsShowAlert(false), 3000);

    const cartItem: CartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    addToCart(cartItem);
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

      <button className="d-btn d-btn-primary uppercase" onClick={onClick}>
        Kosárba
      </button>
    </>
  );
}
