import { $Enums } from '@prisma/client';

import { ZodError } from 'zod';
import {
  BillingOptionValue,
  ProductTypes,
  ShippingFee,
  ShippingOptionValue,
} from './types';

export function currencyFormatter(value: number): string {
  const formatter = Intl.NumberFormat('hu', {
    style: 'currency',
    currency: 'HUF',
    useGrouping: true,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
}

export function pricePerMeterFormatter(value: number): string {
  return currencyFormatter(value) + ' / m';
}

export function formatZodErrors(error: ZodError): string {
  return error.errors.map((error) => `${error.message}`).join('; ') + '.';
}

export function formatShippingFee(shippingFee: ShippingFee) {
  if (typeof shippingFee === 'number') {
    return `+${currencyFormatter(shippingFee)}`;
  }

  return `+${shippingFee}`;
}

export function formatPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) {
    return '';
  }

  const cleaned = phoneNumber.replace(/[^\d+]/g, '');

  let formatted = cleaned;

  if (cleaned.startsWith('+36')) {
    // Start formatting from +36
    if (cleaned.length > 3) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    }
    if (cleaned.length > 5) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5)}`;
    }
    if (cleaned.length > 8) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
  }

  return formatted;
}

export const sanityProductCategoryMap: Record<ProductTypes, string> = {
  kite: 'Egyzsinóros sárkány',
  reel: 'Zsinórtartók',
  rod: 'Pálcák, rudak és csövek',
  twine: 'Zsinórok',
};

export const prismaShippingModeMap: Record<
  ShippingOptionValue,
  $Enums.ShippingMode
> = {
  'Személyes átvétel': 'PersonalPickup',
  'Postai szállítás': 'Post',
  'Foxpost automatába': 'Foxpost',
};

export const prismaPaymentModeMap: Record<
  BillingOptionValue,
  $Enums.PaymentMode
> = {
  'Átvételkor készpénzel': 'Cash',
  Előreutalással: 'Transfer',
  'Átvételkor bankártyával': 'Card',
};
