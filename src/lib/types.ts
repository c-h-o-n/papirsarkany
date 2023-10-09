import { Products } from '@prisma/client';
import { Asserts, BooleanSchema, StringSchema } from 'yup';
import ObjectSchema, { TypeOfShape } from 'yup/lib/object';

export type CartItem = Products & { quantity: number };

export type FormSchemaArray = [
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

export type FormSchemaObject = Asserts<FormSchemaArray[0]> & Asserts<FormSchemaArray[1]> & Asserts<FormSchemaArray[2]>;

export type ProductCategoryMapLiterals =
  | 'Egyzsinóros sárkány'
  | 'Pálcák és rudak'
  | 'Csövek'
  | 'Zsinórok'
  | 'Zsinórtartók';

export type Kite = Products & {
  category: 'Egyzsinoros';
  properties: {
    isBeginner: boolean;
    size: string;
    material: string;
    windSpeed: string;
  };
};

export type Rod = Products & {
  category: 'PalcakRudak';
  properties: {
    diameters: [{
      name: string;
      pricePerMeter: number;
    }];
    lengths: number[];
  };
};

export type Line = Products & {
  properties: {
    diameters: [{
      name: string;
      pricePerMeter: number;
    }];
    tensileStegth: string;
  };
};
