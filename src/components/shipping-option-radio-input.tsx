"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { formatShippingFee } from "~/lib/formatters";
import type { ShippingFee, ShippingOptionValue } from "~/lib/types";
import type { OrderForm } from "~/lib/validation-schemas";
import { useCartStore } from "~/store/use-cart-store";

type ShippingOptionRadioInputProps = {
  label: Exclude<ReactNode, string> | ShippingOptionValue;
  shippingFee?: ShippingFee;
  value: ShippingOptionValue;
  isDisabled?: boolean;
  missingShippingInfoErrorMessage?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
};

export default function ShippingOptionRadioInput({
  isDisabled,
  onClick,
  shippingFee,
  label,
  value,
  missingShippingInfoErrorMessage = "Hiányzó szállítási cím információk.",
}: ShippingOptionRadioInputProps) {
  const {
    register,
    watch,
    formState: { errors },
    getValues,
  } = useFormContext<OrderForm>();
  const setShippingFee = useCartStore((state) => state.setShippingFee);

  const onInputClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if (!shippingFee) {
      setShippingFee(0);
    } else {
      setShippingFee(shippingFee);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const hasShippingSchemaRequiredError = Boolean(
    errors.shippingPostcode?.type === "required" ||
      errors.shippingCity?.type === "required" ||
      errors.shippingAddress?.type === "required",
  );

  return (
    <div className={`d-form-control ${isDisabled && "opacity-30"}`}>
      <label className="d-label cursor-pointer flex-wrap justify-start gap-x-2">
        <input
          type="radio"
          value={value}
          {...register("shippingOption")}
          className="d-radio checked:d-radio-primary border-black disabled:opacity-100"
          disabled={isDisabled}
          onClick={onInputClick}
        />
        <span className="d-label-text font-bold text-lg">{label}</span>
        {shippingFee && (
          <span className="d-label-text flex-1 text-right font-bold text-lg">
            {formatShippingFee(shippingFee)}
          </span>
        )}
        {watch("shippingOption") === value && (
          <div className="basis-full pl-8">
            <span className="d-label-text-alt text-error">
              {hasShippingSchemaRequiredError &&
                missingShippingInfoErrorMessage}
            </span>
            <span className="d-label-text select-text text-lg">
              {getValues("shippingOption") !== "Postai szállítás" &&
                `${getValues("shippingPostcode")} ${getValues("shippingCity")} ${getValues("shippingAddress")}`}
            </span>
          </div>
        )}
      </label>
    </div>
  );
}
