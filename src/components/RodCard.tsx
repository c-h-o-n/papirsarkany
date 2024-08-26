'use client';

import { currencyFormatter, pricePerMeterFormatter } from '@/lib/formatters';
import { WithImageAsset } from '@/lib/types';
import { Rod, RodDiameters } from '@sanity/lib/sanity.types';
import { ChangeEvent, useState } from 'react';
import AddToCartButton from './AddToCartButton';
import Card from './Card';

type Props = {
  rod: WithImageAsset<Rod>;
};

function getSelectedDiamaterFirstLength(
  selectedDiameter: RodDiameters[number] | undefined,
) {
  if (!selectedDiameter || !selectedDiameter.lengths) {
    return undefined;
  }

  return selectedDiameter.lengths[0];
}

export default function RodCard({ rod }: Props) {
  const [selectedDiameter, setSelectedDiameter] = useState<
    RodDiameters[number] | undefined
  >(rod.diameters ? rod.diameters[0] : undefined);
  const [selectedLength, setSelectedLength] = useState<number | undefined>(
    getSelectedDiamaterFirstLength(selectedDiameter),
  );

  const handleDiameterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const diamaterName = e.target.value;

    const newSelectedDiameter = rod.diameters?.find(
      (diameter) => diameter.diameter === diamaterName,
    );

    if (!newSelectedDiameter) {
      throw new Error('No diamater found.');
    }

    setSelectedDiameter({
      _key: newSelectedDiameter._key,
      diameter: diamaterName,
      pricePerMeter: newSelectedDiameter.pricePerMeter,
      lengths: newSelectedDiameter.lengths,
    });

    setSelectedLength(getSelectedDiamaterFirstLength(newSelectedDiameter));
  };

  if (!rod.diameters) {
    return;
  }

  if (!selectedDiameter?.lengths) {
    return;
  }

  return (
    <div className="relative z-0">
      <Card className="w-full space-y-3 p-5">
        <h3 className="font-bold">{rod.name}</h3>

        <div className="flex gap-2">
          <div className="d-form-control w-full max-w-xs">
            <label className="d-label">
              <span className="d-label-text font-bold">Átmérő</span>
            </label>
            <select
              className="d-select d-select-bordered"
              value={selectedDiameter.diameter}
              onChange={(e) => {
                handleDiameterChange(e);
              }}
            >
              {rod.diameters.map((diamater) => (
                <option key={diamater._key} value={diamater.diameter}>
                  {diamater.diameter} mm
                </option>
              ))}
            </select>
          </div>

          <div className="d-form-control w-full max-w-xs">
            <label className="kite- d-label">
              <span className="d-label-text font-bold">Hossz</span>
            </label>
            <select
              className="d-select d-select-bordered w-full max-w-xs"
              onChange={(e) => setSelectedLength(+e.target.value)}
              value={selectedLength}
            >
              {selectedDiameter.lengths.map((length) => (
                <option key={length} value={length}>
                  {length} cm
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedDiameter.pricePerMeter && selectedLength && (
          <h2>
            {currencyFormatter(
              selectedDiameter.pricePerMeter * Math.ceil(selectedLength / 100),
            )}{' '}
            <span className="text-base text-gray-400">
              ({pricePerMeterFormatter(selectedDiameter.pricePerMeter)})
            </span>
          </h2>
        )}

        <AddToCartButton
          product={{
            ...rod,
            name: `${rod.name} (${selectedDiameter.diameter} mm - ${selectedLength} cm)`,
            price:
              (selectedDiameter.pricePerMeter || NaN) *
              Math.ceil((selectedLength || NaN) / 100),
          }}
        />
      </Card>
    </div>
  );
}
