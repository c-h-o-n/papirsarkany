'use client';

import { FS, FSArray } from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { Children, ReactNode, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { boolean, object, string } from 'yup';

type Props = {
  children: ReactNode;
};

export default function CheckoutStepper({ children }: Props) {
  const cart = useCartStore((state) => state.cart);

  if (cart.length < 1) {
    redirect('/kosar');
  }

  const [step, setStep] = useState(0);

  const isFirst = step === 0;
  const isLast = step === Children.count(children) - 1;

  const prevStep = () => {
    console.log('prev', step);
    if (isFirst) {
      return;
    }
    setStep(step - 1);
  };

  const nextStep = () => {
    if (isLast) {
      console.log('send form');
      return;
    }

    setStep(step + 1);
  };

  const onSubmit = (data: FS) => {
    nextStep();

    if (isLast) {
      console.log(data);
    }
  };

  const schema: FSArray = [
    object({
      email: string()
        // .required(({ label }) => `${label} kötelezo mezo`)
        .email()
        .label('Email'),
      firstName: string(),
      lastName: string(),
      phoneNumber: string(),

      shippingOption: string().required().ensure(),

      shippingPostcode: string(),
      shippingCity: string(),
      shippingAddress: string(),
      shippingSubaddress: string(),
    }),
    object({
      paymentOption: string().required().ensure(),
      isSameAdressAsShipping: boolean().default(true),
      billingPostcode: string(),
      billingCity: string(),
      billingAddress: string(),
      billingSubaddress: string(),
    }),
    object({
      comment: string(),
    }),
  ];

  const methods = useForm<any>({
    resolver: yupResolver(schema[step] as any),
    defaultValues: { isSameAdressAsShipping: true } as FS,
  });

  const sendOrder = () => {
    console.log('order');
  };

  return (
    <div className={`container  p-8 ${!isLast && 'max-w-screen-md'}`}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data))}>
          {Children.toArray(children)[step]}

          <div className="flex flex-wrap justify-between gap-4">
            {!isFirst && (
              <button type="button" className="d-btn d-btn-neutral d-btn-outline max-sm:d-btn-block" onClick={prevStep}>
                Vissza
              </button>
            )}
            {isFirst && <div></div>}

            <button type="submit" className={`d-btn max-sm:d-btn-block ${isLast ? 'd-btn-success' : 'd-btn-primary'}`}>
              {isLast ? 'Megrendelem' : 'Tovább'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
