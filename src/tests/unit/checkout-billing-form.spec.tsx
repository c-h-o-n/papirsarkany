import { cleanup, render, renderHook, screen } from '@testing-library/react';

import { FormProvider, useForm } from 'react-hook-form';
import { afterEach, expect, test, vi } from 'vitest';
import CheckoutBillingForm from '~/components/checkout-billing-form';
import { OrderForm } from '~/lib/validation-schemas';

afterEach(cleanup);

test('should throw error if shipping option was not selected', () => {
  // Mock console error to suppress expected errors during the test
  const consoleErrorMock = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  const {
    result: { current: methods },
  } = renderHook(() => useForm<OrderForm>());

  expect(() => {
    render(
      <FormProvider {...methods}>
        <CheckoutBillingForm />
      </FormProvider>,
    );
  }).toThrowError('Érvénytelen szállitási mód');

  consoleErrorMock.mockRestore();
});

test('should render isSameAdressAsShipping checkbox connected to the form if "Postai szállítás" was selected ', () => {
  const {
    result: { current: methods },
  } = renderHook(() =>
    useForm<OrderForm>({
      defaultValues: {
        shippingOption: 'Postai szállítás',
        isSameAdressAsShipping: true,
      },
    }),
  );

  render(
    <FormProvider {...methods}>
      <CheckoutBillingForm />
    </FormProvider>,
  );

  const isSameAdressAsShippingCheckbox = screen.getByLabelText(
    'A számlázási adataim megegyeznek a szállítási címemmel',
  );

  expect(isSameAdressAsShippingCheckbox).toBeDefined();

  expect(methods.getValues('isSameAdressAsShipping')).toBe(true);

  isSameAdressAsShippingCheckbox.click();

  expect(methods.getValues('isSameAdressAsShipping')).toBe(false);
});

test('should  rendered billing information inputs', () => {
  const {
    result: { current: methods },
  } = renderHook(() =>
    useForm<OrderForm>({
      defaultValues: {
        shippingOption: 'Személyes átvétel',
      },
    }),
  );

  render(
    <FormProvider {...methods}>
      <CheckoutBillingForm />
    </FormProvider>,
  );

  expect(screen.getAllByRole('textbox')).toHaveLength(4);
});
