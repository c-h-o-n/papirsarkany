"use client";

import { type FC, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { formatPhoneNumber, parsePhoneNumber } from "~/lib/formatters";

type PhoneNumberInputProps = UseFormRegisterReturn & {
  id?: string;
};

const FormattedPhoneNumberInput: FC<PhoneNumberInputProps> = ({
  id,
  ...register
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPhoneNumber = parsePhoneNumber(e.target.value);
    if (rawPhoneNumber.length > 12) {
      return;
    }
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);

    register.onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    register.onBlur(e);
  };

  return (
    <input
      id={id}
      type="text"
      autoComplete="tel"
      className="d-input w-full"
      placeholder="+36 20 123 4567"
      value={phoneNumber}
      {...register}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default FormattedPhoneNumberInput;
