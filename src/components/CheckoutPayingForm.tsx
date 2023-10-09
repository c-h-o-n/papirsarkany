'use client';

import { FormSchemaObject } from '@/lib/types';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

export default function CheckoutPayingForm() {
  const {
    register,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormSchemaObject>();

  const onIsSameAdressAsShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue('billingPostcode', watch('shippingPostcode'));
      setValue('billingCity', watch('shippingCity'));
      setValue('billingAddress', watch('shippingAddress'));
      setValue('billingSubaddress', watch('shippingSubaddress'));
      setValue('isSameAdressAsShipping', true);
    } else {
      setValue('billingPostcode', '');
      setValue('billingCity', '');
      setValue('billingAddress', '');
      setValue('billingSubaddress', '');
      setValue('isSameAdressAsShipping', false);
    }
  };

  return (
    <>
      <h2 className="underline underline-offset-8">Fizetés</h2>

      <div className="d-form-control">
        <label className="d-label cursor-pointer justify-start gap-x-2">
          <input
            type="radio"
            value="Átvételkor készpénzel"
            {...register('paymentOption')}
            className="d-radio checked:d-radio-primary"
          />
          <span className="d-label-text">Átvételkor készpénzel</span>
        </label>
      </div>

      <div className="d-form-control">
        <label className="d-label cursor-pointer justify-start gap-x-2">
          <input
            type="radio"
            value="Előreutalással"
            {...register('paymentOption')}
            className="d-radio checked:d-radio-primary"
          />
          <span className="d-label-text">Előreutalással</span>
        </label>
      </div>

      <span className="text-error">{errors.paymentOption?.message}</span>

      <h2 className="underline underline-offset-8">Számlázási cím</h2>

      {getValues('shippingOption') === 'Postai szállítás' && (
        <div className="d-form-control">
          <label className="d-label cursor-pointer justify-start gap-x-2">
            <input
              {...register('isSameAdressAsShipping')}
              onChange={(e) => onIsSameAdressAsShippingChange(e)}
              type="checkbox"
              className="d-checkbox checked:d-checkbox-primary"
            />
            <span className="d-label-text">A számlázási adataim megegyeznek a szállítási címemmel</span>
          </label>
        </div>
      )}
      {getValues('shippingOption') === 'Személyes átvétel' || !watch('isSameAdressAsShipping')}

      {(getValues('shippingOption') === 'Személyes átvétel' || !watch('isSameAdressAsShipping')) && (
        <>
          <div className="d-form-control">
            <label className="d-label">
              <span className="d-label-text text-lg">Irányítószám</span>
            </label>
            <input type="text" className="d-input d-input-bordered" {...register('billingPostcode')} />
            <label className="d-label">
              <span className="d-label-text-alt text-error">{errors.billingPostcode?.message}</span>
            </label>
          </div>
          <div className="d-form-control">
            <label className="d-label">
              <span className="d-label-text text-lg">Város</span>
            </label>
            <input type="text" className="d-input d-input-bordered" {...register('billingCity')} />
            <label className="d-label">
              <span className="d-label-text-alt text-error">{errors.billingCity?.message}</span>
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
              <span className="d-label-text-alt text-error">{errors.billingAddress?.message}</span>
            </label>

            <input
              type="text"
              placeholder="Emelet, ajtó, egyéb (opcionális)"
              className="d-input d-input-bordered"
              {...register('billingSubaddress')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">{errors.billingSubaddress?.message}</span>
            </label>
          </div>
        </>
      )}
    </>
  );
}
