'use client'

import { useCartStore } from '@/store/useCartStore';
import { Products } from '@prisma/client';
import { MouseEvent } from 'react';

export default function AddToCartButton({ kite }: { kite: Products }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const onclick = (e: MouseEvent) => {
    e.preventDefault();

    addToCart({...kite, quantity: 1})
  };

  return (
    <button className="d-btn d-btn-primary " onClick={onclick}>
      Kosárba
    </button>
  );
}
