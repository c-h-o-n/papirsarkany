'use client';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { OrderFormSchemaObject, FoxpostSelectMessageData } from '@/lib/types';
import Card from './Card';

type FoxpostMapProps = {
  hideMap: () => void;
};

export default function FoxpostMap({ hideMap }: FoxpostMapProps) {
  const { setValue, trigger, register } = useFormContext<OrderFormSchemaObject>();

  useEffect(() => {
    function receiveMessage(event: MessageEvent) {
      if (event.origin !== 'https://cdn.foxpost.hu' || !event.data) {
        return;
      }

      const apt = JSON.parse(event.data) as FoxpostSelectMessageData;

      setValue('shippingPostcode', apt.zip);
      setValue('shippingCity', apt.city);
      setValue('shippingAddress', apt.street);

      trigger([
        'shippingOption',
        'shippingPostcode',
        'shippingCity',
        'shippingAddress',
      ]);

      hideMap();
    }

    window.addEventListener('message', receiveMessage);

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [hideMap, setValue, trigger]);

  return (
    <>
      <input
        type="text"
        className="opacity-0 h-0 w-0 block"
        {...register('shippingPostcode')}
      />
      <input
        type="text"
        className="opacity-0 h-0 w-0 block"
        {...register('shippingCity')}
      />
      <input
        type="text"
        className="opacity-0 h-0 w-0 block"
        {...register('shippingAddress')}
      />
      <Card className="p-4">
        <iframe
          className="rounded h-[640px] min-[504px]:h-[820px] min-[1096px]:h-[715px]"
          loading="lazy"
          src="https://cdn.foxpost.hu/apt-finder/v1/app/"
          width="100%"
          height="715px"
        ></iframe>
      </Card>
    </>
  );
}
