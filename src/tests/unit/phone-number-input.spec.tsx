import { expect } from '@playwright/test';
import {
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { afterEach, test } from 'vitest';

import PhoneNumberInput from '~/components/phone-number-input';

afterEach(cleanup);

test('should render phone number input value in a formatted way', () => {
  const {
    result: {
      current: { register },
    },
  } = renderHook(() => useForm());
  render(<PhoneNumberInput {...register('phoneNumber')} />);

  const phoneNumberInput = screen.getByRole('textbox') as HTMLInputElement;

  expect(phoneNumberInput).toBeDefined();
  expect(phoneNumberInput.getAttribute('placeholder')).toBe('+36 20 123 4567');

  fireEvent.input(phoneNumberInput, { target: { value: '+36707654321' } });

  expect(phoneNumberInput.value).toBe('+36 70 765 4321');
});

test('should regsiter raw phone number (without formatting)', () => {
  const {
    result: {
      current: { register, getValues },
    },
  } = renderHook(() => useForm());
  render(<PhoneNumberInput {...register('phoneNumber')} />);

  fireEvent.input(screen.getByRole('textbox'), {
    target: { value: '+36707654321' },
  });
  expect(getValues('phoneNumber')).toBe('+36707654321');
});
