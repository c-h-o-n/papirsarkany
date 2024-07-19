import { SanityImageMetadata } from '@sanity/lib/sanity.types';
import { Asserts, BooleanSchema, ObjectSchema, StringSchema } from 'yup';
import { MixedSchema } from 'yup/lib/mixed';

import { validateOrderForm } from './helpers';

/**
 * All properties must be  NOT undefined values
 */
export type NullableDeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]>
    ? T[K]
    : NullableDeepRequired<T[K]>;
}>;

export type WithImageAsset<T> = Omit<T, 'image'> & {
  image: {
    asset: {
      url: string | null;
      metadata: SanityImageMetadata | null;
    } | null;
  } | null;
};

export type Product = WithImageAsset<{
  _id: string;
  name?: string;
  price?: number;
  packageInfo?: {
    x?: number;
    y?: number;
    z?: number;
    weight?: number;
  };
}>;

export type ProductTypes = 'kite' | 'rod' | 'reel' | 'twine';

export type CartItem = NullableDeepRequired<Product> & {
  quantity: number;
};

export type ValidatedOrderForm = Awaited<ReturnType<typeof validateOrderForm>>;

export type OrderFormSchemaArray = [
  ObjectSchema<{
    email: StringSchema;
    firstName: StringSchema;
    lastName: StringSchema;
    phoneNumber: StringSchema;

    shippingOption: MixedSchema<ShippingOptionValue | null>;

    shippingPostcode: StringSchema;
    shippingCity: StringSchema;
    shippingAddress: StringSchema;
    shippingSubaddress: StringSchema;
  }>,
  ObjectSchema<{
    isSameAdressAsShipping: BooleanSchema;
    paymentOption: MixedSchema<BillingOptionValue | null>;
    billingPostcode: StringSchema;
    billingCity: StringSchema;
    billingAddress: StringSchema;
    billingSubaddress: StringSchema;
  }>,
  ObjectSchema<{
    comment: StringSchema;
  }>,
];

export type OrderFormSchemaObject = Asserts<OrderFormSchemaArray[0]> &
  Asserts<OrderFormSchemaArray[1]> &
  Asserts<OrderFormSchemaArray[2]>;

export type OrderFormRequestBody = {
  formData: OrderFormSchemaObject;
  cart: CartItem[];
  totalPrice: number;
};

export type ShippingOptionValue =
  | 'Személyes átvétel'
  | 'Postai szállítás'
  | 'Foxpost automatába';

export type BillingOptionValue =
  | 'Átvételkor készpénzel'
  | 'Előreutalással'
  | 'Átvételkor bankártyával';

export type NewOrder = {
  contact: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  shippingOption: ShippingOptionValue;
  paymentOption: BillingOptionValue;

  shipping: {
    postcode?: string;
    city?: string;
    address?: string;
    subaddress?: string;
  };

  billing: {
    postcode: string;
    city: string;
    address: string;
    subaddress?: string;
  };

  comment?: string;
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

export type FoxpostSelectMessageData = {
  place_id: number;
  operator_id: string;
  name: string;
  vapt: string;
  olapt: string;
  japt: string;
  ssapt: string;
  sdapt: string;
  group: string;
  address: string;
  zip: string;
  city: string;
  street: string;
  findme: string;
  geolat: number;
  geolng: number;
  allowed2: string;
  depot: string;
  load: string;
  isOutdoor: boolean;
  apmType: string;
  substitutes?:
    | ({
        place_id: number;
        operator_id: string;
      } | null)[]
    | null;
  open: {
    hetfo: string;
    kedd: string;
    szerda: string;
    csutortok: string;
    pentek: string;
    szombat: string;
    vasarnap: string;
  };
  fillEmptyList?:
    | {
        emptying: string;
        filling: string;
      }[]
    | null;
};

export type FoxpostPackageHandlingFees = {
  range: number[];
  fee: number;
  feeType: string;
}[];
