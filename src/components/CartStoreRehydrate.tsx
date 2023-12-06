'use client';
import { useCartStore } from '@/store/useCartStore';
import { useEffect } from 'react';

export default function CartStoreRehydrate() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}
