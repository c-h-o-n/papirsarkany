'use client';

import { currencyFormatter } from '@/lib/formatters';
import { FormSchemaArray, FormSchemaObject, OrderMail } from '@/lib/types';
import '@/lib/yupConfig';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutFormStore } from '@/store/useCheckoutFormStore';
import { useStepperStore } from '@/store/useStepperStore';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect, useRouter } from 'next/navigation';
import { Children, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { boolean, object, string } from 'yup';

type CheckoutStepperProps = {
  children: ReactNode;
};

export default function CheckoutStepper({ children }: CheckoutStepperProps) {
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const formData = useCheckoutFormStore((state) => state.formData);
  const setFormData = useCheckoutFormStore((state) => state.setFormData);
  const isSubmitting = useCheckoutFormStore((state) => state.isSubmitting);
  const setIsSubmitting = useCheckoutFormStore(
    (state) => state.setIsSubmitting,
  );

  const step = useStepperStore((state) => state.step);
  const nextStep = useStepperStore((state) => state.nextStep);

  if (cart.length < 1) {
    redirect('/kosar');
  }

  const isLast = step === Children.count(children) - 1;

  const schema: FormSchemaArray = [
    object({
      email: string().required().email().label('Email'),
      firstName: string().required().label('Keresztnév'),
      lastName: string().required().label('Vezetéknév'),
      phoneNumber: string()
        .required()
        .matches(
          /^(?:\+36|06)(?:(?:20|30|31|32|33|34|35|36|70|71|72|73|74|75|76|77|78|79|90|91|92|93|94|95|96|97|99)\d{7})$/,
          'Érvényes magyar telefonszámnak kell lennie pl.: +36201234567 vagy 06201234567',
        )
        .label('Telefonszám'),
      shippingOption: string()
        .required(({ label }) => `Kérlek válassz egy ${label.toLowerCase()}ot`)
        .ensure()
        .label('Szállitási mód'),

      shippingPostcode: string()
        .when('shippingOption', {
          is: 'Postai szállítás',
          then: (schema) => schema.required(),
        })
        .label('Irányítószám'),
      shippingCity: string()
        .when('shippingOption', {
          is: 'Postai szállítás',
          then: (schema) => schema.required(),
        })
        .label('Város'),
      shippingAddress: string()
        .when('shippingOption', {
          is: 'Postai szállítás',
          then: (schema) => schema.required(),
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
      billingPostcode: string().required().label('Irányítószám'),
      billingCity: string().required().label('Város'),
      billingAddress: string().required().label('Cím'),
      billingSubaddress: string().label('Másodlagos cím'),
    }),
    object({
      comment: string(),
    }),
  ];

  // FIXME define types for useForm
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<any>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema[step] as any),
    defaultValues: { ...formData } as FormSchemaObject,
  });

  const onSubmit = async (data: FormSchemaObject) => {
    setFormData(data);

    if (!isLast) {
      nextStep();
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
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
      .catch((error) =>
        alert(`Hiba történt a rendelés leadásakor. \n(${error})`),
      )
      .finally(() => {
        setIsSubmitting(false);
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
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit(data))}
          className="[&>h2]:py-2"
        >
          {Children.toArray(children)[step]}
        </form>
      </FormProvider>
    </div>
  );
}
