'use client';

import { MouseEvent, useState } from 'react';
import { ZodError } from 'zod';

import { formatZodErrors } from '@/lib/formatters';
import { InferredProduct } from '@/lib/types';
import { cartItemValidationSchema } from '@/lib/validation-schemas';
import { useCartStore } from '@/store/use-cart-store';
import ErrorToast from './error-toast';
import SuccessToast from './success-toast';

type AddToCartProps = {
  product: InferredProduct & { price?: number };
  onClick?(): () => void;
};

export default function AddToCartButton({ product, onClick }: AddToCartProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>();

  const addToCart = useCartStore((state) => state.addToCart);

  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault();

    try {
      if (onClick) {
        onClick();
      }

      const cartItem = Object.assign(
        { image: product.image },
        cartItemValidationSchema.parse({
          ...product,
          quantity: 1,
        }),
      );

      addToCart(cartItem);

      setIsSuccess(true);

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }

      if (error instanceof ZodError) {
        console.log(error.errors);
        setError(formatZodErrors(error));
      }

      setTimeout(() => setError(undefined), 5000);
    }
  };

  return (
    <>
      {isSuccess ? (
        <SuccessToast href="/kosar" message="Sikeresen hozzádva a kosárhoz." />
      ) : undefined}

      {error ? <ErrorToast message={`Hiba: ${error}.`} /> : undefined}

      <button
        className="d-btn d-btn-primary uppercase active:!scale-105"
        onClick={onButtonClick}
      >
        Kosárba
      </button>
    </>
  );
}
