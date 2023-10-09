'use client';

import { FormSchemaObject, FormSchemaArray } from '@/lib/types';
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

  const onSubmit = (data: FormSchemaObject) => {
    nextStep();

    if (isLast) {
      console.log({data, cart});
    }
  };

  const schema: FormSchemaArray = [
    object({
      email: string()
        .required(({ label }) => `${label} kötelező mező`)
        .email()
        .label('Email'),
      firstName: string()
        .required(({ label }) => `${label} kötelező mező`)
        .label('Keresztnév'),
      lastName: string()
        .required(({ label }) => `${label} kötelező mező`)
        .label('Vezetéknév'),
      phoneNumber: string()
        .required(({ label }) => `${label} kötelező mező`)
        .matches(/^(?:\+36|06)/, 'Érvényes magyar telefonszámnak kell lennie pl.: +36123456789 vagy 06123456789')
        .label('Telefonszám'),

      shippingOption: string()
        .required(({ label }) => `Kérlek válassz egy ${label.toLowerCase()}ot`)
        .ensure()
        .label('Szállitási mód'),

      shippingPostcode: string()
        .when('shippingOption', {
          is: 'Postai szállítás',
          then: (schema) => schema.required(({ label }) => `${label} kötelező mező`),
        })
        .label('Irányítószám'),
      shippingCity: string()
        .when('shippingOption', {
          is: 'Postai szállítás',
          then: (schema) => schema.required(({ label }) => `${label} kötelező mező`),
        })
        .label('Város'),
      shippingAddress: string()
        .when('shippingOption', {
          is: 'Postai szállítás',
          then: (schema) => schema.required(({ label }) => `${label} kötelező mező`),
        })
        .label('Cím'),
      shippingSubaddress: string().label('Másodlagos cím'),
    }),
    object({
      paymentOption: string()
        .required(({ label }) => `Kérlek válassz egy ${label.toLowerCase()}ot`)
        .ensure()
        .label('Fizetési mód'),
      isSameAdressAsShipping: boolean().default(true),
      billingPostcode: string().required(({label}) => `${label} kötelező mező`).label('Irányítószám'),
      billingCity: string().required(({label}) => `${label} kötelező mező`).label('Város'),
      billingAddress: string().required(({label}) => `${label} kötelező mező`).label('Cím'),
      billingSubaddress: string().label('Másodlagos cím'),
    }),
    object({
      comment: string(),
    }),
  ];

  const methods = useForm<any>({
    resolver: yupResolver(schema[step] as any),
    defaultValues: { isSameAdressAsShipping: true } as FormSchemaObject,
  });

  const sendOrder = () => {
    console.log('order');
  };

  return (
    <div className={`container  p-8 ${!isLast && 'max-w-screen-md'}`}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data), console.log)}>
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
