import { CartItem } from './types';

export function isInCart(itemToCheck: CartItem, itemInCart: CartItem) {
  return (
    itemToCheck._id === itemInCart._id && itemToCheck.name === itemInCart.name
  );
}

export function blurActiveAnchorElement() {
  const element = document.activeElement as HTMLAnchorElement;

  if (element) {
    element.blur();
  }
}

export function isProdEnv() {
  return (
    process.env.NODE_ENV === 'production' &&
    process.env.VERCEL_ENV === 'production'
  );
}

export function isPreviewEnv() {
  return (
    process.env.NODE_ENV === 'production' &&
    process.env.VERCEL_ENV === 'preview'
  );
}
