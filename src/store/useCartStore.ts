import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { isInCart } from '@/lib/helpers';
import { CartItem } from '@/lib/types';

type State = {
  _hasHydrated: boolean;
  cart: CartItem[];
  totalItems: number;
  shippingFee: number;
  totalPrice: number;
};

type Actions = {
  setHasHydrated: (hasHydrated: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  decreaseItemQuantity: (item: CartItem) => void;
  setItemQuantity: (item: CartItem, quantity: number) => void;
  setShippingFee: (shippingFee: number) => void;
  resetCart: () => void;
};

const initialState: State = {
  _hasHydrated: false,
  cart: [],
  totalItems: 0,
  shippingFee: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      _hasHydrated: initialState._hasHydrated,
      cart: initialState.cart,
      totalItems: initialState.totalItems,
      shippingFee: initialState.shippingFee,
      totalPrice: initialState.totalPrice,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      setItemQuantity(product, quantity) {
        if (quantity < 1 || quantity > 999) {
          return;
        }
        const cart = get().cart;
        const cartItem = cart.find(
          (item) => isInCart(item, product) && item.name === product.name,
        );

        if (!cartItem) {
          return;
        }

        const updatedCart = cart.map((item) =>
          isInCart(item, product) ? { ...item, quantity } : item,
        );

        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems + (quantity - product.quantity),
          totalPrice:
            state.totalPrice + product.price * (quantity - product.quantity) + state.shippingFee,
        }));
      },
      addToCart(product) {
        const cart = get().cart;
        const cartItem = cart.find((item) => isInCart(item, product));
        if (cartItem) {
          const updatedCart = cart.map((item) =>
            isInCart(item, product)
              ? { ...item, quantity: (item.quantity as number) + 1 }
              : item,
          );

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price + state.shippingFee,
          }));
          return;
        }

        const updatedCart = [...cart, { ...product, quantity: 1 }];

        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price + state.shippingFee,
        }));
      },
      decreaseItemQuantity(product) {
        const cart = get().cart;

        const cartItem = cart.find((item) => isInCart(item, product));

        if (!cartItem) {
          throw new Error('No cart item found.');
        }

        if (cartItem.quantity > 1) {
          const updatedCart = cart.map((item) =>
            isInCart(item, product)
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price + state.shippingFee,
          }));
          return;
        }

        get().removeFromCart(product);
      },
      removeFromCart(product) {
        set((state) => ({
          cart: state.cart.filter((item) => !isInCart(item, product)),
          totalItems: state.totalItems - product.quantity,
          totalPrice: state.totalPrice - product.price * product.quantity + state.shippingFee,
        }));
      },
      setShippingFee(shippingFee) {
        set({
          shippingFee,
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
