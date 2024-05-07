"use client";
import { useCartStore } from "@/store/useCartStore";

if (typeof window !== "undefined") {
  useCartStore.persist.rehydrate();
}

export default function CartStoreRehydrate() {
  return null;
}
