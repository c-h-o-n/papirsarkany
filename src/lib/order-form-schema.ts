import { boolean, mixed, object, string } from 'yup';

import '@/lib/yupConfig';

export const formSchemaArray = [
  object({
    email: string().required().email().label('Email'),
    firstName: string().required().label('Keresztnév'),
    lastName: string().required().label('Vezetéknév'),
    phoneNumber: string()
      .required()
      .matches(
        /^(\+36)(20|30|31|70|50|51)\d{7}$/,
        'Érvényes magyar telefonszámnak kell lennie +36 formátumban pl.: +36201234567',
      )
      .matches(
        /^(\+36)(20|30|31|70|50|51)\d{7}$/,
        'Érvényes magyar telefonszámnak kell lennie pl.: +36201234567',
      )
      .label('Telefonszám'),
    shippingOption: mixed()
      .required(({ label }) => `Kérlek válassz egy ${label.toLowerCase()}ot`)
      .oneOf(
        ['Személyes átvétel', 'Postai szállítás', 'Foxpost automatába'],
        'Érvénytelen szállítási mód',
      )
      .label('Szállitási mód'),

    shippingPostcode: string()
      .when('shippingOption', {
        is: 'Foxpost automatába',
        then: (schema) => schema.required(),
      })
      .label('Irányítószám'),
    shippingCity: string()
      .when('shippingOption', {
        is: 'Foxpost automatába',
        then: (schema) => schema.required(),
      })
      .label('Város'),
    shippingAddress: string()
      .when('shippingOption', {
        is: 'Foxpost automatába',
        then: (schema) => schema.required(),
      })
      .label('Cím'),
    shippingSubaddress: string().label('Másodlagos cím'),
  }),
  object({
    paymentOption: mixed()
      .required(({ label }) => `Kérlek válassz egy ${label.toLowerCase()}ot`)
      .oneOf(
        ['Előreutalással', 'Átvételkor készpénzel', 'Átvételkor bankártyával'],
        'Érvénytelen fizetési mód',
      )
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
] as const;

export const mergedFormSchemaObject = formSchemaArray.reduce(
  (acc, schema) => acc.shape(schema.fields),
  object(),
) as (typeof formSchemaArray)[0] &
  (typeof formSchemaArray)[1] &
  (typeof formSchemaArray)[2];
