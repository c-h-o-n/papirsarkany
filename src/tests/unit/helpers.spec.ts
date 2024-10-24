import { describe, expect, test, vi } from 'vitest';

import { LOCAL_PICKUP_ADDRESS } from '~/lib/constants';
import { delay, normalizeOrderForm } from '~/lib/helpers';
import { OrderForm } from '~/lib/validation-schemas';

test('delay - resolves after the given time', async () => {
  const delayTime = 6000;

  vi.useFakeTimers();
  const getDelaySpy = vi.fn(delay);

  const start = Date.now();

  const delayPromise = getDelaySpy(delayTime);
  vi.advanceTimersByTimeAsync(delayTime);
  await delayPromise;

  const end = Date.now();

  expect(end - start).toBe(delayTime);
  expect(getDelaySpy).toHaveResolved();

  vi.useRealTimers();
});

describe('normalizeOrderForm', () => {
  test('set shipping information to undefined if "Személyes átvétel" is selected', () => {
    const formData: OrderForm = {
      firstName: 'János',
      lastName: 'Kulka',
      email: 'janos.kulka@gmail.com',
      shippingOption: 'Személyes átvétel',
      shippingPostcode: LOCAL_PICKUP_ADDRESS.shippingPostcode,
      shippingCity: LOCAL_PICKUP_ADDRESS.shippingCity,
      shippingAddress: LOCAL_PICKUP_ADDRESS.shippingAddress,
      isSameAdressAsShipping: false,
      paymentOption: 'Átvételkor készpénzel',
      phoneNumber: '+36201234567',
      billingPostcode: '1025',
      billingCity: 'Budapest',
      billingAddress: 'Felső Zöldmáli út 13.',
      billingSubaddress: '3. ajtó',
      comment: 'just a unit test',
    };
  
    const normalizedOrderFormData = normalizeOrderForm(formData);
  
    expect(normalizedOrderFormData).toEqual({
      ...formData,
      shippingPostcode: undefined,
      shippingCity: undefined,
      shippingAddress: undefined,
      shippingSubaddress: undefined,
    });
  });
  
  test('returns the same object if "Postai szállítás" is selected', () => {
    const formData: OrderForm = {
      firstName: 'János',
      lastName: 'Kulka',
      email: 'janos.kulka@gmail.com',
      shippingOption: 'Postai szállítás',
      shippingPostcode: '1025',
      shippingCity: 'Budapest',
      shippingAddress: 'Felső Zöldmáli út 13.',
      shippingSubaddress: '3. ajtó',
      isSameAdressAsShipping: true,
      paymentOption: 'Átvételkor készpénzel',
      phoneNumber: '+36201234567',
      billingPostcode: '1025',
      billingCity: 'Budapest',
      billingAddress: 'Felső Zöldmáli út 13.',
      billingSubaddress: '3. ajtó',
      comment: 'just a unit test',
    };
  
    const normalizedOrderFormData = normalizeOrderForm(formData);
  
    expect(normalizedOrderFormData).toBe(formData);
  });
})


