import { isInCart } from '@/lib/helpers';
import { CartItem } from '@/lib/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type Actions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  decreaseItemQuantity: (item: CartItem) => void;
  setItemQuantity: (item: CartItem, quantity: number) => void;
  resetCart: () => void;
};

const initialState: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      cart: initialState.cart,
      totalItems: initialState.totalItems,
      totalPrice: initialState.totalPrice,
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
            state.totalPrice + product.price * (quantity - product.quantity),
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
            totalPrice: state.totalPrice + product.price,
          }));
          return;
        }

        const updatedCart = [...cart, { ...product, quantity: 1 }];

        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
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
            totalPrice: state.totalPrice - product.price,
          }));
          return;
        }

        get().removeFromCart(product);
      },
      removeFromCart(product) {
        set((state) => ({
          cart: state.cart.filter((item) => !isInCart(item, product)),
          totalItems: state.totalItems - product.quantity,
          totalPrice: state.totalPrice - product.price * product.quantity,
        }));
      },
      resetCart() {
        set(() => ({
          ...initialState,
        }));
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
