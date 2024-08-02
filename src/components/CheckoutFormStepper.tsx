'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect, useRouter } from 'next/navigation';
import { Children, ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCart from '@/hooks/useCart';
import { formSchemaArray } from '@/lib/order-form-schema';
import { OrderRequestBody, OrderFormSchemaObject } from '@/lib/types';
import '@/lib/yupConfig';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutFormStore } from '@/store/useCheckoutFormStore';
import StepProgress from './StepProgress';
import { useFoxpostParcelBoxStore } from '@/store/useFoxpostParcelBoxStore';

type CheckoutStepperProps = {
  children: ReactNode;
};

export default function CheckoutStepper({ children }: CheckoutStepperProps) {
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

  const foxpostOperatorId = useFoxpostParcelBoxStore((state) => state.destination)

  const isLast = step === Children.count(children) - 1;

  // FIXME define types for useForm
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<any>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(formSchemaArray[step] as any),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',

      shippingOption: null,

      shippingPostcode: '',
      shippingCity: '',
      shippingAddress: '',
      shippingSubaddress: '',

      paymentOption: null,

      isSameAdressAsShipping: true,

      billingPostcode: '',
      billingCity: '',
      billingAddress: '',
      billingSubaddress: '',

      comment: '',
    } as OrderFormSchemaObject,
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  useEffect(() => {
    return () => {
      setStep(0);
      setShippingFee(0);
      setBillingFee(0);
    };
  }, [setBillingFee, setShippingFee, setStep]);

  const onSubmit = async (data: OrderFormSchemaObject) => {
    if (!isLast) {
      nextStep();
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      const res = await sendOrder(data);

      if (!res.ok) {
        throw new Error(res.statusText);
      }
      if (res.status !== 200) {
        return;
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

  const sendOrder = (formData: OrderFormSchemaObject) => {
    const totalPrice = getTotalPrice();
    return fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({
        formData,
        cart,
        totalPrice,
        foxpostOperatorId
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
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(async (data) => await onSubmit(data))}
          className="[&>h2]:py-2 space-y-4"
        >
          <div className="mx-auto max-w-screen-md">
            <StepProgress />
          </div>
          {Children.toArray(children)[step]}
        </form>
      </FormProvider>
    </div>
  );
}
