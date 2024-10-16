'use client';

import { useCartStore } from '@/store/use-cart-store';

if (typeof window !== 'undefined') {
  useCartStore.persist.rehydrate();
}

const CartStoreRehydrate = () => {
  return null;
};

export default CartStoreRehydrate;
