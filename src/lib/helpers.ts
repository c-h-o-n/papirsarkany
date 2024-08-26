import { env } from './env';
import { currencyFormatter } from './formatters';
import { ShippingFee } from './types';
import { OrderForm } from './validation-schemas';

export function blurActiveAnchorElement() {
  const element = document.activeElement as HTMLAnchorElement;

  if (element) {
    element.blur();
  }
}

export function isProdEnv(): boolean {
  return (
    process.env.NODE_ENV === 'production' && env.VERCEL_ENV === 'production'
  );
}

export function isPreviewEnv(): boolean {
  return process.env.NODE_ENV === 'production' && env.VERCEL_ENV === 'preview';
}

export function normalizeOrderForm(data: OrderForm) {
  const { shippingOption, ...restData } = data;

  if (shippingOption === 'Személyes átvétel') {
    return {
      ...restData,
      shippingOption,
      shippingPostcode: undefined,
      shippingCity: undefined,
      shippingAddress: undefined,
      shippingSubaddress: undefined,
    };
  }

  return data;
}

export function formatShippingFee(shippingFee: ShippingFee) {
  if (typeof shippingFee === 'number') {
    return `+${currencyFormatter(shippingFee)}`;
  }

  return `+${shippingFee}`;
}
