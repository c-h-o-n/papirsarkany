'use client';

import { FormSchemaObject } from '@/lib/types';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

export default function CheckoutShippingForm() {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<FormSchemaObject>();

  const copyShippingToBilling = () => {
    setValue('billingPostcode', watch('shippingPostcode'));
    setValue('billingCity', watch('shippingCity'));
    setValue('billingAddress', watch('shippingAddress'));
    setValue('billingSubaddress', watch('shippingSubaddress'));
  };

  return (
    <>
      <h1 className="text-center font-bold">Pénztár</h1>
      <h2 className="underline underline-offset-8">Elérhetőség</h2>

      <div className="d-form-control">
        <label className="d-label">
          <span className="d-label-text text-lg">Email</span>
        </label>
        <input
          type="text"
          placeholder="mail@papirsarkany.hu"
          className="d-input d-input-bordered"
          {...register('email')}
        />
        <label className="d-label">
          <span className="d-label-text-alt text-error">{errors.email?.message}</span>
        </label>
      </div>

      <div className="gap-4 sm:grid sm:grid-cols-2">
        <div className="d-form-control">
          <label className="d-label">
            <span className="d-label-text text-lg">Vezetéknév</span>
          </label>
          <input type="text" className="d-input d-input-bordered" {...register('lastName')} />
          <label className="d-label">
            <span className="d-label-text-alt text-error">{errors.lastName?.message}</span>
          </label>
        </div>
        <div className="d-form-control">
          <label className="d-label">
            <span className="d-label-text text-lg">Keresztnév</span>
          </label>
          <input type="text" className="d-input d-input-bordered" {...register('firstName')} />
          <label className="d-label">
            <span className="d-label-text-alt text-error">{errors.firstName?.message}</span>
          </label>
        </div>
      </div>

      <div className="d-form-control">
        <label className="d-label">
          <span className="d-label-text text-lg">Telefonszám</span>
        </label>
        <input
          type="text"
          placeholder="+36123456789"
          className="d-input d-input-bordered"
          {...register('phoneNumber')}
        />
        <label className="d-label">
          <span className="d-label-text-alt text-error">{errors.phoneNumber?.message}</span>
        </label>
      </div>

      <h2 className="underline underline-offset-8">Szállítás</h2>

      <div className="d-form-control">
        <label className="d-label cursor-pointer justify-start gap-x-2 ">
          <input
            type="radio"
            value="Személyes átvétel"
            {...register('shippingOption')}
            className="d-radio checked:d-radio-primary"
          />
          <span className="d-label-text text-lg">Személyes átvétel</span>
          <span className="d-label-text flex-1 text-right text-lg font-bold">Ingyenes</span>
        </label>
      </div>

      <div className="d-form-control">
        <label className="d-label cursor-pointer justify-start gap-x-2">
          <input
            type="radio"
            value="Postai szállítás"
            {...register('shippingOption')}
            className="d-radio checked:d-radio-primary"
          />
          <span className="d-label-text text-lg">Postai szállítás</span>
          <span className="d-label-text flex-1 text-right text-lg font-bold">Postai szállítás költsége</span>
        </label>
      </div>

      <span className="text-error">{errors.shippingOption?.message}</span>

      {watch('shippingOption') === 'Postai szállítás' && (
        <>
          <div className="d-form-control">
            <label className="d-label">
              <span className="d-label-text text-lg">Irányítószám</span>
            </label>
            <input type="text" className="d-input d-input-bordered" {...register('shippingPostcode')} />
            <label className="d-label">
              <span className="d-label-text-alt text-error">{errors.shippingPostcode?.message}</span>
            </label>
          </div>

          <div className="d-form-control">
            <label className="d-label">
              <span className="d-label-text text-lg">Város</span>
            </label>
            <input type="text" className="d-input d-input-bordered" {...register('shippingCity')} />
            <label className="d-label">
              <span className="d-label-text-alt text-error">{errors.shippingCity?.message}</span>
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
              {...register('shippingAddress')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">{errors.shippingAddress?.message}</span>
            </label>

            <input
              type="text"
              placeholder="Emelet, ajtó, egyéb (opcionális)"
              className="d-input d-input-bordered"
              {...register('shippingSubaddress')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">{errors.shippingSubaddress?.message}</span>
            </label>
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          onClick={copyShippingToBilling}
          className="d-btn d-btn-primary uppercase max-sm:d-btn-block"
        >
          Tovább
        </button>
      </div>
    </>
  );
}
