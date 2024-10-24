import { env } from './env';
import { OrderForm } from './validation-schemas';

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
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
