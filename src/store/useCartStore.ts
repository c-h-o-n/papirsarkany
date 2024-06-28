import 'client-only';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CartItem } from '@/lib/types';

type State = {
  _hasHydrated: boolean;
  cart: CartItem[];
  shippingFee: number;
  billingFee: number;
};

type Actions = {
  setHasHydrated: (hasHydrated: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  increaseItemQuantity: (item: CartItem) => void;
  decreaseItemQuantity: (item: CartItem) => void;
  setItemQuantity: (item: CartItem, quantity: number) => void;
  setShippingFee: (shippingFee: number) => void;
  setBillingFee: (billingFee: number) => void;
  resetCart: () => void;
};

const initialState: State = {
  _hasHydrated: false,
  cart: [],
  shippingFee: 0,
  billingFee: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      addToCart(productToAdd) {
        const { cart, increaseItemQuantity } = get();
        const cartItem = cart.find(
          (item) =>
            item._id === productToAdd._id && item.name === productToAdd.name,
        );

        if (cartItem) {
          increaseItemQuantity(cartItem);
          return;
        }

        const newProductToAdd: CartItem = { ...productToAdd, quantity: 1 };

        set(() => ({
          cart: [...cart, newProductToAdd],
        }));
      },
      increaseItemQuantity(item) {
        item.quantity++;

        set((state) => ({ cart: [...state.cart] }));
      },
      decreaseItemQuantity(product) {
        if (product.quantity <= 1) {
          const { removeFromCart } = get();
          removeFromCart(product);
          return;
        }

        product.quantity--;

        set((state) => ({
          cart: [...state.cart],
        }));
      },
      setItemQuantity(product, quantity) {
        if (quantity < 1 || quantity > 999) {
          return;
        }

        product.quantity = quantity;

        set((state) => ({
          cart: [...state.cart],
        }));
      },
      removeFromCart(product) {
        set((state) => ({
          cart: state.cart.filter(
            (item) => item._id !== product._id || item.name !== product.name,
          ),
        }));
      },
      setShippingFee(shippingFee) {
        set({
          shippingFee,
        });
      },
      setBillingFee(billingFee) {
        set({
          billingFee,
        });
      },
      resetCart() {
        set((state) => ({
          ...initialState,
          _hasHydrated: state._hasHydrated,
        }));
      },
    }),
    {
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
