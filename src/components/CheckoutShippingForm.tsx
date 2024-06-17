'use client';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { currencyFormatter } from '@/lib/formatters';
import { FormSchemaObject } from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';
import FoxpostMap from './FoxpostMap';
import LazyLoadFramerMotion from './LazyLoadFramerMotion';

export default function CheckoutShippingForm() {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<FormSchemaObject>();
  const shippingFee = useCartStore((state) => state.shippingFee);

  const onPersonalPickupClick = () => {
    setValue('shippingPostcode', '');
    setValue('shippingCity', '');
    setValue('shippingAddress', '');

    trigger();
  };

  const hasShippingSchemaRequiredError = Boolean(
    errors.shippingPostcode?.type === 'required' ||
      errors.shippingCity?.type === 'required' ||
      errors.shippingAddress?.type === 'required',
  );

  const [isShowFoxpostMap, setIsShowFoxpostMap] = useState(false);
  return (
    <>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-center font-bold">Pénztár</h1>
        <h2 className="underline underline-offset-8">Elérhetőség</h2>
        <div className="d-form-control">
          <label className="d-label">
            <span className="d-label-text text-lg">Email</span>
          </label>
          <input
            type="text"
            placeholder={'mail.papirsarkany@gmail.com'}
            className="d-input d-input-bordered"
            {...register('email')}
          />
          <label className="d-label">
            <span className="d-label-text-alt text-error">
              {errors.email?.message}
            </span>
          </label>
        </div>
        <div className="gap-4 sm:grid sm:grid-cols-2">
          <div className="d-form-control">
            <label className="d-label">
              <span className="d-label-text text-lg">Vezetéknév</span>
            </label>
            <input
              type="text"
              className="d-input d-input-bordered"
              {...register('lastName')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.lastName?.message}
              </span>
            </label>
          </div>
          <div className="d-form-control">
            <label className="d-label">
              <span className="d-label-text text-lg">Keresztnév</span>
            </label>
            <input
              type="text"
              className="d-input d-input-bordered"
              {...register('firstName')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.firstName?.message}
              </span>
            </label>
          </div>
        </div>
        <div className="d-form-control">
          <label className="d-label">
            <span className="d-label-text text-lg">Telefonszám</span>
          </label>
          <input
            type="text"
            placeholder="+36201234567"
            className="d-input d-input-bordered"
            {...register('phoneNumber')}
          />
          <label className="d-label">
            <span className="d-label-text-alt text-error">
              {errors.phoneNumber?.message}
            </span>
          </label>
        </div>
        <h2 className="underline underline-offset-8">Szállítás</h2>
        <div className="d-form-control">
          <label className="d-label cursor-pointer justify-start gap-x-2 flex-wrap">
            <input
              type="radio"
              value="Személyes átvétel"
              {...register('shippingOption')}
              className="d-radio checked:d-radio-primary"
              onClick={onPersonalPickupClick}
            />
            <span className="d-label-text text-lg font-bold">
              Személyes átvétel
              <br />
            </span>
            <span className="d-label-text flex-1 text-right text-lg font-bold">
              ingyenes
            </span>
            {watch('shippingOption') === 'Személyes átvétel' && (
              <span className="pl-8 d-label-text text-lg basis-full select-text">
                2094 Nagykovácsi Kazal utca 6.
              </span>
            )}
          </label>
        </div>
        <div className="d-form-control">
          <label className="d-label cursor-pointer justify-start gap-x-2 flex-wrap">
            <input
              type="radio"
              value="Foxpost automatába"
              {...register('shippingOption')}
              className="d-radio checked:d-radio-primary"
              onClick={() => setIsShowFoxpostMap(true)}
            />
            <span className="d-label-text text-lg text-foxpost-red font-bold">
              Foxpost automatába
            </span>
            <span className="d-label-text flex-1 text-right text-lg font-bold">
              {/* TODO calculate foxpost shippingfee */}+
              {currencyFormatter(shippingFee || 666)}
            </span>
            <div className="pl-8 basis-full">
              <span className="d-label-text-alt text-error">
                {hasShippingSchemaRequiredError && 'Válassz egy automatát!'}
              </span>
              <span className="d-label-text text-lg select-text">
                {watch('shippingOption') === 'Foxpost automatába' &&
                  `${watch('shippingPostcode')} ${watch('shippingCity')} ${watch('shippingAddress')}`}
              </span>
            </div>
          </label>
        </div>
        <span className="text-error">{errors.shippingOption?.message}</span>
      </div>
      <LazyLoadFramerMotion>
        <AnimatePresence>
          {watch('shippingOption') === 'Foxpost automatába' &&
            isShowFoxpostMap && (
              <m.div
                initial={{
                  scaleY: 0,
                  transformOrigin: 'top',
                }}
                animate={{
                  scaleY: 1,
                }}
                exit={{
                  scaleY: 0,
                  opacity: 0,
                  transitionTimingFunction: 'ease-in',
                }}
              >
                <FoxpostMap hideMap={() => setIsShowFoxpostMap(false)} />
              </m.div>
            )}
        </AnimatePresence>
      </LazyLoadFramerMotion>

      {/* {watch('shippingOption') === 'Postai szállítás' && (
        <>
          <div className="d-form-control">
            <label className="d-label">
              <span className="d-label-text text-lg">Irányítószám</span>
            </label>
            <input
              type="text"
              className="d-input d-input-bordered"
              {...register('shippingPostcode')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.shippingPostcode?.message}
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
              {...register('shippingCity')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.shippingCity?.message}
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
              {...register('shippingAddress')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.shippingAddress?.message}
              </span>
            </label>

            <input
              type="text"
              placeholder="Emelet, ajtó, egyéb (opcionális)"
              className="d-input d-input-bordered"
              {...register('shippingSubaddress')}
            />
            <label className="d-label">
              <span className="d-label-text-alt text-error">
                {errors.shippingSubaddress?.message}
              </span>
            </label>
          </div>
        </>
      )} */}

      <div className="max-w-screen-sm mx-auto mt-4">
        <div className="flex justify-end">
          <button
            type="submit"
            className="d-btn d-btn-primary uppercase max-sm:d-btn-block"
          >
            Tovább
          </button>
        </div>
      </div>
    </>
  );
}
