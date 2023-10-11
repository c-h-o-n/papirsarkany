'use client';

import { useFormContext } from 'react-hook-form';
import Card from './Card';
import OrderSummaryCard from './OrderSummaryCard';
import { FormSchemaObject } from '@/lib/types';
import { useStepperStore } from '@/store/useStepperStore';

export default function CheckoutSummary() {
  const { getValues } = useFormContext<FormSchemaObject>();
  const formValues = getValues();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormSchemaObject>();

  const prevStep = useStepperStore((state) => state.prevStep);

  return (
    <div className="space-y-6">
      <h1 className="text-center font-bold">Rendelés összegzése</h1>

      <OrderSummaryCard layout="definitive" />

      <div className="max-w  grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="mx-auto w-full max-w-xs p-6">
          <div>
            <h4 className=" font-bold underline">Elérhetőség</h4>
            <div>
              {formValues.lastName} {formValues.firstName}
            </div>
            <div>{formValues.email}</div>
            <div>{formValues.phoneNumber}</div>
          </div>
        </Card>

        <Card className="mx-auto w-full max-w-xs p-6">
          <div>
            <h4 className=" font-bold underline">Szállítás</h4>
            <div>{formValues.shippingOption}</div>
            <div>
              {formValues.shippingPostcode} {formValues.shippingCity}
            </div>
            <div>{formValues.shippingAddress}</div>
            <div>{formValues.shippingSubaddress}</div>
          </div>
        </Card>

        <Card className="mx-auto w-full max-w-xs p-6">
          <div>
            <h4 className=" font-bold underline">Fizetés</h4>
            <div>{formValues.paymentOption}</div>
            <div>
              {formValues.billingPostcode} {formValues.billingCity}
            </div>
            <div>{formValues.billingAddress}</div>
            <div>{formValues.billingSubaddress}</div>
          </div>
        </Card>
      </div>

      <div className="d-form-control">
        <label className="d-label">
          <span className="d-label-text">Megjegyzés</span>
        </label>
        <textarea
          className="d-textarea d-textarea-bordered d-textarea-primary h-24"
          {...register('comment')}
        ></textarea>
        <label className="d-label">
          <span className="d-label-text-alt text-error">{errors.shippingSubaddress?.message}</span>
        </label>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <button type="button" className="d-btn d-btn-neutral d-btn-outline max-sm:d-btn-block" onClick={prevStep}>
          Vissza
        </button>
        <button type="submit" className={`d-btn d-btn-success max-sm:d-btn-block`}>
          Megrendelem
        </button>
      </div>
    </div>
  );
}
