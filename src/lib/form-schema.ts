import { boolean, mixed, object, string } from 'yup';

import { FormSchemaArray } from '@/lib/types';
import '@/lib/yupConfig';

const formSchema: FormSchemaArray = [
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
];

export default formSchema;
