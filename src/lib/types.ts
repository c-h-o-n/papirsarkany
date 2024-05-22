import { SanityImageMetadata } from '@sanity/lib/sanity.types';
import { Asserts, BooleanSchema, ObjectSchema, StringSchema } from 'yup';

import { MenuItemProps } from '@/components/NavMenuItem';

export type ProductCategoryMapLiterals =
  | 'Egyzsinóros sárkány'
  | 'Pálcák és rudak'
  | 'Csövek'
  | 'Zsinórok'
  | 'Zsinórtartók';

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
}>;

export type ProductTypes = 'kite' | 'rod' | 'reel' | 'twine';

export type CartItem = Required<Product> & {
  quantity: number;
};

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

export type FormSchemaObject = Asserts<FormSchemaArray[0]> &
  Asserts<FormSchemaArray[1]> &
  Asserts<FormSchemaArray[2]>;

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

/**
 * leftItems: on `desktop` rendered on `left` side on `mobile` rendered at the `bottom`
 *
 * rightItems: on `desktop` rendered on `right` side on `mobile` rendered at the `top`
 */
export type NavbarItems = {
  leftItems: MenuItemProps[];
  rightItems: MenuItemProps[];
};
