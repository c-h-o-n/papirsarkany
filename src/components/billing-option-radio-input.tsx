import { useFormContext } from "react-hook-form";

import type { FC } from "react";
import { currencyFormatter } from "~/lib/formatters";
import type { BillingOptionValue } from "~/lib/types";
import type { OrderForm } from "~/lib/validation-schemas";
import { useCartStore } from "~/store/use-cart-store";

type BillingOptionRadioInputProps = {
  isDisabled?: boolean;
  value: BillingOptionValue;
  billingFee?: number | null;
};

const BillingOptionRadioInput: FC<BillingOptionRadioInputProps> = ({
  isDisabled,
  value,
  billingFee,
}) => {
  const { register } = useFormContext<OrderForm>();

  const setBillingFee = useCartStore((state) => state.setBillingFee);

  const onInputClick = (billingFee: number | undefined | null) => {
    setBillingFee(billingFee || 0);
  };

  return (
    <fieldset className={`d-fieldset ${isDisabled ? "opacity-30" : ""}`}>
      <label className="flex cursor-pointer items-center justify-start gap-x-2">
        <input
          type="radio"
          value={value}
          {...register("paymentOption")}
          className="d-radio d-radio-primary border-black"
          onClick={() => onInputClick(billingFee)}
          disabled={isDisabled}
        />
        <span className="font-bold text-lg">{value}</span>
        {billingFee && (
          <span className="flex-1 text-right font-bold text-lg">
            +{currencyFormatter(billingFee)}
          </span>
        )}
      </label>
    </fieldset>
  );
};

export default BillingOptionRadioInput;
