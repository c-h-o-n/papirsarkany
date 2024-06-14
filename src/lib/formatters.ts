import { $Enums } from '@prisma/client';
import { ProductTypes } from './types';

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

export const prismaShippingModeMap: Record<string, $Enums.ShippingMode> = {
  'Személyes átvétel': 'PersonalPickup',
  'Postai szállítás': 'Post',
};

export const prismaPaymentModeMap: Record<string, $Enums.PaymentMode> = {
  'Átvételkor készpénzel': 'Cash',
  Előreutalással: 'Transfer',
};
