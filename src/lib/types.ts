import { Products } from '@prisma/client';
import { Asserts, BooleanSchema, InferType, StringSchema } from 'yup';
import ObjectSchema, { TypeOfShape } from 'yup/lib/object';
import { AnyObject } from 'yup/lib/types';

export type CartItem = Products & { quantity: number };

export type FormSchema = {
  email: StringSchema;
  firstName: StringSchema;
  lastName: StringSchema;
  phoneNumber: StringSchema;

  shippingOption: StringSchema;

  shippingPostcode: StringSchema;
  shippingCity: StringSchema;
  shippingAddress: StringSchema;
  shippingSubaddress: StringSchema;

  isSameAdressAsShipping: BooleanSchema;
  paymentOption: StringSchema;
  billingPostcode: StringSchema;
  billingCity: StringSchema;
  billingAddress: StringSchema;
  billingSubaddress: StringSchema;

  comment: StringSchema;
};

export type FSArray = [
  ObjectSchema<{
    email: StringSchema;
    firstName: StringSchema;
    lastName: StringSchema;
    phoneNumber: StringSchema;

    shippingOption: StringSchema;

    shippingPostcode: StringSchema;
    shippingCity: StringSchema;
    shippingAddress: StringSchema;
    shippingSubaddress: StringSchema;
  }>,
  ObjectSchema<{
    isSameAdressAsShipping: BooleanSchema;
    paymentOption: StringSchema;
    billingPostcode: StringSchema;
    billingCity: StringSchema;
    billingAddress: StringSchema;
    billingSubaddress: StringSchema;
  }>,
  ObjectSchema<{
    comment: StringSchema;
  }>,
];

export type FS = Asserts<FSArray[0]> & Asserts<FSArray[1]> & Asserts<FSArray[2]>;

export type ProductCategoryMapLiterals = 'Egyzsinóros sárkány' | 'Pálcák és rudak' | 'Csövek' | 'Zsinórok' | 'Zsinórtartók';

export type Kite = Products & {
  category: 'Egyzsinoros';
  properties: {
    isBeginner: boolean;
    size: string;
    material: string;
    windSpeed: string;
  };
};

export type Rods = Products & {
  properties: {};
};
