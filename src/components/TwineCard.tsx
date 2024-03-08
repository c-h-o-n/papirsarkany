'use client';
import { Twine } from '@/lib/types';
import AddToCartButton from './AddToCartButton';
import { currencyFormatter, pricePerMeterFormatter } from '@/lib/formatters';
import { useState } from 'react';
import Card from './Card';

type Props = {
  twine: Twine;
};

export default function TwineCard({ twine }: Props) {
  const [selectedDiameter] = useState<Twine['properties']['diameters'][number]>(
    twine.properties.diameters[0],
  );

  const [length, setLength] = useState<number>(1);

  return (
    <div className="relative z-0">
      <Card className="w-full space-y-3 p-5">
        <h3 className="font-bold">{twine.name}</h3>{' '}
        <span>(szakítószilárdság: {twine.properties.tensileStegth})</span>
        <div className="flex gap-2">
          <div className="flex-shrink">
            <div className="d-form-control w-full max-w-xs">
              <label className="d-label">
                <span className="d-label-text font-bold">Átmérő</span>
              </label>
              <select className="d-select d-select-bordered">
                {twine.properties.diameters.map((diamater) => (
                  <option key={diamater.name}>{diamater.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="self-end">
            <div className="d-join rounded-r-full outline-offset-2 focus-within:outline focus-within:outline-2 focus-within:outline-base-300">
              <input
                type="number"
                className="d-input d-join-item d-input-bordered w-full !outline-none"
                placeholder="hossz"
                onChange={(e) => setLength(+e.target.value)}
              />
              <span className="d-join-item inline-flex items-center justify-center rounded-r-full bg-base-200 px-4 ">
                m
              </span>
            </div>
          </div>
        </div>
        <h2>
          {currencyFormatter(
            selectedDiameter.pricePerMeter * Math.ceil(length),
          )}{' '}
          <span className="text-base text-gray-400">
            ({pricePerMeterFormatter(selectedDiameter.pricePerMeter)})
          </span>
        </h2>
        <AddToCartButton
          product={{
            ...twine,
            id: `${twine.id}`,
            name: `${twine.name} (${selectedDiameter.name} - ${length}m)`,
            price: selectedDiameter.pricePerMeter * Math.ceil(length),
          }}
        />
      </Card>
    </div>
  );
}
