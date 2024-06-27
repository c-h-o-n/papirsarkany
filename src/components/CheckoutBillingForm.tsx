'use client';
import useCart from '@/hooks/useCart';
import { getHandlingFee } from '@/lib/foxpost-package-size';
import {
  BillingOptionValue,
  FormSchemaObject,
  ShippingOptionValue,
} from '@/lib/types';
import { useCheckoutFormStore } from '@/store/useCheckoutFormStore';
import { useFormContext } from 'react-hook-form';
import BillingOptionRadioInput from './BillingOptionRadioInput';

export default function CheckoutPayingForm() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<FormSchemaObject>();

  const prevStep = useCheckoutFormStore((state) => state.prevStep);

  const { getTotalPrice } = useCart();

  const shippingBillingMap: Record<
    ShippingOptionValue,
    { billingOptionValue: BillingOptionValue; billingFee?: number | null }[]
  > = {
    'Személyes átvétel': [
      { billingOptionValue: 'Előreutalással', billingFee: undefined },
      { billingOptionValue: 'Átvételkor készpénzel', billingFee: undefined },
    ],
    'Foxpost automatába': [
      { billingOptionValue: 'Előreutalással', billingFee: undefined },
      {
        billingOptionValue: 'Átvételkor bankártyával',
        billingFee: getHandlingFee(getTotalPrice()),
      },
    ],
    'Postai szállítás': [],
  };

  const selectedShippingOption = getValues('shippingOption');

  if (!selectedShippingOption) {
    throw new Error('Érvénytelen szállitási mód');
  }

  return (
    <div className="max-w-screen-sm mx-auto">
      <h2 className="underline underline-offset-8">Fizetés</h2>

      {shippingBillingMap[selectedShippingOption].map(
        ({ billingOptionValue, billingFee }) => (
          <BillingOptionRadioInput
            key={crypto.randomUUID()}
            value={billingOptionValue}
            billingFee={billingFee}
            isDisabled={billingFee === null}
          />
        ),
      )}

      <span className="text-error">{errors.paymentOption?.message}</span>

      <h2 className="underline underline-offset-8">Számlázási cím</h2>

      {/* {getValues('shippingOption') === 'Postai szállítás' && (
        <div className="d-form-control">
          <label className="d-label cursor-pointer justify-start gap-x-2">
            <input
              {...register('isSameAdressAsShipping')}
              onChange={(e) => onIsSameAdressAsShippingChange(e)}
              type="checkbox"
              className="d-checkbox checked:d-checkbox-primary"
            />
            <span className="d-label-text">
              A számlázási adataim megegyeznek a szállítási címemmel
            </span>
          </label>
        </div>
      )} */}

      <div className="d-form-control">
        <label className="d-label">
          <span className="d-label-text text-lg">Irányítószám</span>
        </label>
        <input
          type="text"
          className="d-input d-input-bordered"
          {...register('billingPostcode')}
        />
        <label className="d-label">
          <span className="d-label-text-alt text-error">
            {errors.billingPostcode?.message}
          </span>
        </label>
      </div>
      <div className="d-form-control">
        <label className="d-label">
          <span className="d-label-text text-lg">Város</span>
        </label>
        <input
          type="text"
          className="d-input d-input-bordered"
          {...register('billingCity')}
        />
        <label className="d-label">
          <span className="d-label-text-alt text-error">
            {errors.billingCity?.message}
          </span>
        </label>
      </div>
      <div className="d-form-control">
        <label className="d-label">
          <span className="d-label-text text-lg">Cím</span>
        </label>
        <input
          type="text"
          placeholder="Utca, házszám"
          className="d-input d-input-bordered"
          {...register('billingAddress')}
        />
        <label className="d-label">
          <span className="d-label-text-alt text-error">
            {errors.billingAddress?.message}
          </span>
        </label>

        <input
          type="text"
          placeholder="Emelet, ajtó, egyéb (opcionális)"
          className="d-input d-input-bordered"
          {...register('billingSubaddress')}
        />
        <label className="d-label">
          <span className="d-label-text-alt text-error">
            {errors.billingSubaddress?.message}
          </span>
        </label>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <button
          type="button"
          className="d-btn d-btn-outline d-btn-neutral uppercase max-sm:d-btn-block"
          onClick={prevStep}
        >
          Vissza
        </button>
        <button
          type="submit"
          className="d-btn d-btn-primary uppercase max-sm:d-btn-block"
        >
          Tovább
        </button>
      </div>
    </div>
  );
}
