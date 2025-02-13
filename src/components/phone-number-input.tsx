'use client';

import { forwardRef, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { formatPhoneNumber } from '~/lib/formatters';

type PhoneNumberInputProps = UseFormRegisterReturn;

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  (register, ref) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const rawPhoneNumber = useRef('');

    const getRawPhoneNumber = (phoneNumber: string) => {
      return phoneNumber.replaceAll(' ', '');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      rawPhoneNumber.current = getRawPhoneNumber(e.target.value);
      if (rawPhoneNumber.current.length > 12) {
        return;
      }

      const formatted = formatPhoneNumber(e.target.value);
      setPhoneNumber(formatted);

      e.target.value = rawPhoneNumber.current;
      register.onChange(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.value = rawPhoneNumber.current;
      register.onBlur(e);
    };

    return (
      <input
        type="text"
        autoComplete="tel"
        className="d-input d-input-bordered"
        placeholder="+36 20 123 4567"
        value={phoneNumber}
        {...register}
        name={register.name}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={ref}
      />
    );
  },
);

PhoneNumberInput.displayName = 'PhoneNumberInput';

export default PhoneNumberInput;
