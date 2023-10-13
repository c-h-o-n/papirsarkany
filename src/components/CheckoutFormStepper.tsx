'use client';

import { currencyFormatter } from '@/lib/formatters';
import { FormSchemaObject, FormSchemaArray, OrderMail } from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutFormStore } from '@/store/useCheckoutFormStore';
import { useStepperStore } from '@/store/useStepperStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect, useRouter } from 'next/navigation';
import { Children, ReactNode, cloneElement, isValidElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { boolean, object, string } from 'yup';

type Props = {
  children: ReactNode;
};

export default function CheckoutStepper({ children }: Props) {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const formData = useCheckoutFormStore((state) => state.formData);
  const setFormData = useCheckoutFormStore((state) => state.setFormData);

  const step = useStepperStore((state) => state.step);
  const nextStep = useStepperStore((state) => state.nextStep);

  if (cart.length < 1) {
    redirect('/kosar');
  }

  const isLast = step === Children.count(children) - 1;

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
      billingPostcode: string()
        .required(({ label }) => `${label} kötelező mező`)
        .label('Irányítószám'),
      billingCity: string()
        .required(({ label }) => `${label} kötelező mező`)
        .label('Város'),
      billingAddress: string()
        .required(({ label }) => `${label} kötelező mező`)
        .label('Cím'),
      billingSubaddress: string().label('Másodlagos cím'),
    }),
    object({
      comment: string(),
    }),
  ];

  const methods = useForm<any>({
    resolver: yupResolver(schema[step] as any),
    defaultValues: { ...formData } as FormSchemaObject,
  });

  const onSubmit = (data: FormSchemaObject) => {
    setFormData(data);

    if (!isLast) {
      nextStep();
      return;
    }

    sendOrder(data)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        if (res.status !== 200) {
          return;
        }
        router.push('/sikeres-rendeles');
      })
      .catch((error) => alert(`Hiba történt a rendelés leadásakor. (${error})`));
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
      total: currencyFormatter(totalPrice),
      products: cart.map((product) => ({
        name: product.name,
        price: currencyFormatter(product.price),
        quantity: product.quantity.toString(),
      })),
    };

    return fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ data, cart, orderEmailData }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <div className={`container p-8 ${!isLast && 'max-w-screen-md'}`}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data), console.log)}>
          {Children.toArray(children)[step]}
        </form>
      </FormProvider>
    </div>
  );
}
