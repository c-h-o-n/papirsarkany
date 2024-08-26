import { env } from './env';
import { currencyFormatter } from './formatters';
import {  ShippingFee, ValidatedOrderForm } from './types';
import { mergedFormSchemaObject, OrderForm } from './validation-schemas';

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

export async function validateOrderForm(data: OrderForm) {
  return await mergedFormSchemaObject.parseAsync(data);
}

export function normalizeOrderForm(data: ValidatedOrderForm) {
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
