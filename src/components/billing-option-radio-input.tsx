import { useFormContext } from 'react-hook-form';

import { currencyFormatter } from '@/lib/formatters';
import { BillingOptionValue } from '@/lib/types';
import { OrderForm } from '@/lib/validation-schemas';
import { useCartStore } from '@/store/use-cart-store';
import { FC } from 'react';

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
    <div className={`d-form-control ${isDisabled && 'opacity-30'}`}>
      <label className="d-label cursor-pointer justify-start gap-x-2">
        <input
          type="radio"
          value={value}
          {...register('paymentOption')}
          className="d-radio border-black checked:d-radio-primary"
          onClick={() => onInputClick(billingFee)}
          disabled={isDisabled}
        />
        <span className="d-label-text text-lg font-bold">{value}</span>
        {billingFee && (
          <span className="d-label-text flex-1 text-right text-lg font-bold">
            +{currencyFormatter(billingFee)}
          </span>
        )}
      </label>
    </div>
  );
};

export default BillingOptionRadioInput;
