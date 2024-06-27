import { currencyFormatter } from '@/lib/formatters';
import { BillingOptionValue, FormSchemaObject } from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';
import { useFormContext } from 'react-hook-form';

type BillingOptionRadioInputProps = {
  isDisabled?: boolean;
  value: BillingOptionValue;
  billingFee?: number | null;
};

export default function BillingOptionRadioInput({
  isDisabled,
  value,
  billingFee,
}: BillingOptionRadioInputProps) {
  const { register } = useFormContext<FormSchemaObject>();

  const setBillingFee = useCartStore((state) => state.setBillingFee);

  const onInputClick = (billingFee: number | undefined | null) => {
    setBillingFee(billingFee || 0);
  };

  return (
    <div
      className={`d-form-control ${isDisabled && 'opacity-30'}`}
      key={crypto.randomUUID()}
    >
      <label className="d-label cursor-pointer justify-start gap-x-2">
        <input
          type="radio"
          value={value}
          {...register('paymentOption')}
          className="d-radio checked:d-radio-primary"
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
}
