'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { redirect, useRouter } from 'next/navigation';
import { Children, FC, ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCart from '@/hooks/use-cart';
import { OrderRequestBody } from '@/lib/types';
import { OrderForm, orderFormSchema } from '@/lib/validation-schemas';
import { useCartStore } from '@/store/use-cart-store';
import { useCheckoutFormStore } from '@/store/use-checkout-form-store';
import { useFoxpostParcelBoxStore } from '@/store/use-foxpost-parcel-box-store';
import StepProgress from './step-progress';

type CheckoutStepperProps = {
  children: ReactNode;
};

const CheckoutFormStepper: FC<CheckoutStepperProps> = ({ children }) => {
  const router = useRouter();

  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const cart = useCartStore((state) => state.cart);

  const resetCart = useCartStore((state) => state.resetCart);
  const setShippingFee = useCartStore((state) => state.setShippingFee);
  const setBillingFee = useCartStore((state) => state.setBillingFee);

  const { getTotalPrice } = useCart();

  const step = useCheckoutFormStore((state) => state.step);
  const setStep = useCheckoutFormStore((state) => state.setStep);
  const nextStep = useCheckoutFormStore((state) => state.nextStep);
  const formValues = useCheckoutFormStore((state) => state.formValues);
  const setFormValues = useCheckoutFormStore((state) => state.setFormValues);

  const foxpostOperatorId = useFoxpostParcelBoxStore(
    (state) => state.destination,
  );

  const isLast = step === Children.count(children) - 1;

  const formMethods = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema[step]),
    defaultValues: {
      isSameAdressAsShipping: true,
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = formMethods;

  useEffect(() => {
    return () => {
      setStep(0);
      setShippingFee(0);
      setBillingFee(0);
    };
  }, [setBillingFee, setShippingFee, setStep]);

  const onSubmit = async (data: OrderForm) => {
    setFormValues(data);

    if (!isLast) {
      nextStep();
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      const fullFormData = { ...formValues, ...data };
      const res = await sendOrder(fullFormData);

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      await resetFormStores();

      router.push('/sikeres-rendeles');
    } catch (error) {
      alert(`Hiba történt a rendelés leadásakor. \n(${error})`);
    }
  };

  const resetFormStores = (): Promise<void> => {
    return new Promise((resolve) => {
      resetCart();
      reset();
      resolve();
    });
  };

  const sendOrder = (formData: OrderForm) => {
    const totalPrice = getTotalPrice();

    return fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({
        formData,
        cart,
        totalPrice,
        foxpostOperatorId,
      } satisfies OrderRequestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  if (!hasHydrated) {
    return;
  }

  if (cart.length < 1) {
    redirect('/kosar');
  }

  return (
    <div className={`container py-8 ${!isLast && 'max-w-screen-xl'}`}>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(async (data) => await onSubmit(data))}
          className="space-y-4 [&>h2]:py-2"
        >
          <div className="mx-auto max-w-screen-md">
            <StepProgress />
          </div>
          {Children.toArray(children)[step]}
        </form>
      </FormProvider>
    </div>
  );
};

export default CheckoutFormStepper;
