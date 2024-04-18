import { CartItem } from './types';

export function isInCart(itemToCheck: CartItem, itemInCart: CartItem) {
  return (
    itemToCheck._id === itemInCart._id && itemToCheck.name === itemInCart.name
  );
}
