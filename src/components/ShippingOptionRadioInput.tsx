import { MouseEventHandler, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { formatShippingFee } from '@/lib/helpers';
import {
  OrderFormSchemaObject,
  ShippingFee,
  ShippingOptionValue,
} from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';

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
  missingShippingInfoErrorMessage = 'Hiányzó szállítási cím információk.',
}: ShippingOptionRadioInputProps) {
  const {
    register,
    watch,
    formState: { errors },
    getValues,
  } = useFormContext<OrderFormSchemaObject>();
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
    errors.shippingPostcode?.type === 'required' ||
      errors.shippingCity?.type === 'required' ||
      errors.shippingAddress?.type === 'required',
  );

  return (
    <div className={`d-form-control ${isDisabled && 'opacity-30'}`}>
      <label className="d-label cursor-pointer justify-start gap-x-2 flex-wrap">
        <input
          type="radio"
          value={value}
          {...register('shippingOption')}
          className="d-radio border-black checked:d-radio-primary disabled:opacity-100"
          disabled={isDisabled}
          onClick={onInputClick}
        />
        <span className="d-label-text text-lg font-bold">{label}</span>
        {shippingFee && (
          <span className="d-label-text flex-1 text-right text-lg font-bold">
            {formatShippingFee(shippingFee)}
          </span>
        )}
        {watch('shippingOption') === value && (
          <div className="pl-8 basis-full">
            <span className="d-label-text-alt text-error">
              {hasShippingSchemaRequiredError &&
                missingShippingInfoErrorMessage}
            </span>
            <span className="d-label-text text-lg select-text">
              {getValues('shippingOption') !== 'Postai szállítás' &&
                `${getValues('shippingPostcode')} ${getValues('shippingCity')} ${getValues('shippingAddress')}`}
            </span>
          </div>
        )}
      </label>
    </div>
  );
}
