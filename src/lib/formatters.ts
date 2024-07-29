import { $Enums } from '@prisma/client';

import { BillingOptionValue, ProductTypes, ShippingOptionValue } from './types';

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

export const SanityCategoryMap: Record<ProductTypes, string> = {
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
