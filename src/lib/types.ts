import { Products } from '@prisma/client';
import { Asserts, BooleanSchema, StringSchema, ObjectSchema } from 'yup';

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
    isBeginner?: boolean;
    size?: string;
    material?: string;
    windSpeed?: string;
  };
};

export type Rod = Products & {
  category: 'PalcakRudak';
  properties: {
    diameters:       {
      name: string;
      pricePerMeter: number;
      lengths: number[];
    }[

    ];
  };
};

export type Line = Products & {
  properties: {
    diameters: [
      {
        name: string;
        pricePerMeter: number;
      },
    ];
    tensileStegth: string;
  };
};

export type NewOrder = {
  contact: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  shippingOption: string;
  paymentOption: string;

  shipping: {
    postcode: string;
    city: string;
    address: string;
    subaddress: string;
  };

  billing: {
    postcode: string;
    city: string;
    address: string;
    subaddress: string;
  };

  comment: string;
};

export type OrderMail = NewOrder & {
  subject: string;
  products: {
    name: string;
    price: string;
    quantity: string;
  }[];
  total: string;
};
