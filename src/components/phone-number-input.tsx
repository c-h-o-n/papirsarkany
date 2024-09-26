'use client';
import { formatPhoneNumber } from '@/lib/formatters';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type PhoneNumberInputProps = {
  name: string;
};

/**
 * use it inside a react-hook-form context
 */
const PhoneNumberInput: FC<PhoneNumberInputProps> = ({ name }) => {
  const { setValue, formState } = useFormContext();
  const [phoneNumber, setPhoneNumber] = useState('');

  const rawPhoneNumber = (value: string) => {
    return value.replace(/\s/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);

    if (formatted.length > 15) {
      return;
    }

    setPhoneNumber(formatted);

    setValue(name, rawPhoneNumber(formatted), {
      shouldValidate: formState.isSubmitted,
    });
  };

  return (
    <>
      <input
        type="text"
        autoComplete="tel"
        className="d-input d-input-bordered"
        onChange={handleChange}
        value={phoneNumber}
        placeholder="+36 20 123 4567"
      />
    </>
  );
};

export default PhoneNumberInput;
