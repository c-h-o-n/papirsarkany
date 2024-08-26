'use client';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FoxpostSelectMessageData } from '@/lib/types';
import { useFoxpostParcelBoxStore } from '@/store/useFoxpostParcelBoxStore';
import Card from './Card';
import { OrderForm } from '@/lib/validation-schemas';

type FoxpostMapProps = {
  hideMap: () => void;
};

export default function FoxpostMap({ hideMap }: FoxpostMapProps) {
  const { setValue, trigger } = useFormContext<OrderForm>();

  const setFoxpostData = useFoxpostParcelBoxStore(
    (state) => state.setFoxpostData,
  );

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

      setFoxpostData({
        destination: apt.operator_id,
      });

      hideMap();
    }

    window.addEventListener('message', receiveMessage);

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, [hideMap, setFoxpostData, setValue, trigger]);

  return (
    <Card className="p-4">
      <iframe
        className="rounded h-[640px] min-[504px]:h-[820px] min-[1096px]:h-[715px]"
        loading="lazy"
        src="https://cdn.foxpost.hu/apt-finder/v1/app/"
        width="100%"
        height="715px"
      ></iframe>
    </Card>
  );
}
