'use client';
import { useCartStore } from '@/store/use-cart-store';

if (typeof window !== 'undefined') {
  useCartStore.persist.rehydrate();
}

export default function CartStoreRehydrate() {
  return null;
}
