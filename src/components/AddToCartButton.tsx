'use client'
import { Kite } from '@/lib/db';
import { MouseEvent } from 'react';

export default function AddToCartButton({ kite }: { kite: Kite }) {
  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    console.log('added to cart', kite);
  };

  return (
    <button className="d-btn d-btn-primary " onClick={addToCart}>
      +
    </button>
  );
}
