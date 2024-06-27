'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect, useRouter } from 'next/navigation';
import { Children, ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import useCart from '@/hooks/useCart';
import formSchema from '@/lib/form-schema';
import { currencyFormatter } from '@/lib/formatters';
import { FormSchemaObject, OrderMail } from '@/lib/types';
import '@/lib/yupConfig';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutFormStore } from '@/store/useCheckoutFormStore';
import StepProgress from './StepProgress';

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

  const isLast = step === Children.count(children) - 1;

  // FIXME define types for useForm
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<any>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(formSchema[step] as any),
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
    } as FormSchemaObject,
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

  const onSubmit = async (data: FormSchemaObject) => {
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

  const sendOrder = (data: FormSchemaObject) => {
    const orderEmailData: OrderMail = {
      contact: {
        email: data.email!,
        firstName: data.firstName!,
        lastName: data.lastName!,
        phone: data.phoneNumber!,
      },
      shippingOption: data.shippingOption!,
      shipping: {
        postcode: data.shippingPostcode!,
        city: data.shippingCity!,
        address: data.shippingAddress!,
        subaddress: data.shippingSubaddress!,
      },
      paymentOption: data.paymentOption!,
      billing: {
        postcode: data.billingPostcode!,
        city: data.billingCity!,
        address: data.billingAddress!,
        subaddress: data.billingSubaddress!,
      },
      comment: data.comment!,
      subject: 'papirsarkany.hu - Köszönöm rendelését!',
      total: currencyFormatter(getTotalPrice()),
      products: cart.map((product) => ({
        name: product.name,
        price: currencyFormatter(product.price),
        quantity: product.quantity.toString(),
      })),
    };

    return fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({ data, cart, orderEmailData }),
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
