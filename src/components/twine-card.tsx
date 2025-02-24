'use client';

import { type FC, useState } from 'react';

import type { Twine, TwineDiameters } from '@sanity/lib/sanity.types';
import { currencyFormatter, pricePerMeterFormatter } from '~/lib/formatters';
import type { WithImageAsset } from '~/lib/types';
import AddToCartButton from './add-to-cart-button';
import Card from './card';

type TwineCardProps = {
  twine: WithImageAsset<Twine>;
};

const TwineCard: FC<TwineCardProps> = ({ twine }) => {
  const [selectedDiameter] = useState<TwineDiameters[number] | undefined>(
    twine.diameters ? twine.diameters[0] : undefined,
  );

  const [length, setLength] = useState<number>(0);

  if (!selectedDiameter) {
    return;
  }

  if (!twine.diameters) {
    return;
  }

  return (
    <div className="relative z-0">
      <Card className="w-full space-y-3 p-5">
        <h3 className="font-bold">{twine.name}</h3>{' '}
        <span>(szakítószilárdság: {selectedDiameter.tensileStrength} kg)</span>
        <div className="flex gap-2">
          <div className="flex-shrink">
            <label className="d-form-control w-full max-w-xs">
              <div className="d-label">
                <span className="d-label-text font-bold">Átmérő</span>
              </div>
              <select className="d-select d-select-bordered">
                {twine.diameters.map((diamaterItem) => (
                  <option key={diamaterItem._key}>
                    {diamaterItem.diameter} mm
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="self-end">
            <div className="d-join rounded-r-full outline-offset-0 transition-all duration-75 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-base-300">
              <input
                type="number"
                className="d-input d-join-item d-input-bordered w-full !outline-none transition-all duration-150 focus:rounded-l-[0.0625rem]"
                placeholder="hossz"
                onChange={(e) => setLength(+e.target.value)}
              />
              <span className="d-join-item inline-flex items-center justify-center rounded-r-full bg-base-200 px-4">
                m
              </span>
            </div>
          </div>
        </div>
        {selectedDiameter.pricePerMeter && (
          <h2>
            {currencyFormatter(
              selectedDiameter.pricePerMeter * Math.ceil(length),
            )}{' '}
            <span className="text-base text-gray-400">
              ({pricePerMeterFormatter(selectedDiameter.pricePerMeter)})
            </span>
          </h2>
        )}
        <AddToCartButton
          product={{
            ...twine,
            name: `${twine.name} (${selectedDiameter.diameter} - ${length}m)`,
            price:
              (selectedDiameter.pricePerMeter || Number.NaN) *
              Math.ceil(length),
          }}
        />
      </Card>
    </div>
  );
};

export default TwineCard;
