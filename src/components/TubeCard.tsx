'use client';
import { Tube } from '@/lib/types';
import Card from './Card';
import AddToCartButton from './AddToCartButton';
import { useState } from 'react';
import { currencyFormatter, pricePerMeterFormatter } from '@/lib/formatters';

type Props = {
  tube: Tube;
};

export default function TubeCard({ tube }: Props) {
  const [selectedDiameter, setSelectedDiameter] = useState(tube.properties.diameters[0]);
  const [selectedLength, setSelectedLength] = useState<number>(selectedDiameter.lengths[0]);

  const handleDiameterChange = (e: any) => {
    const diamaterName = e.target.value as string;
    const selectedDiamater = tube.properties.diameters.find((diameter) => diameter.name === diamaterName)!;

    setSelectedDiameter({
      name: diamaterName,
      pricePerMeter: selectedDiamater.pricePerMeter,
      lengths: selectedDiamater.lengths,
    });

    setSelectedLength(selectedDiamater.lengths[0]);
  };

  return (
    <div className="relative z-0">
      <Card className="w-full space-y-3 p-5">
        <h3 className="font-bold">{tube.name}</h3>

        <div className="flex gap-2">
          <div className="d-form-control w-full max-w-xs">
            <label className="d-label">
              <span className="d-label-text font-bold">Átmérő</span>
            </label>
            <select
              className="d-select d-select-bordered"
              onChange={(e) => {
                handleDiameterChange(e);
              }}
            >
              {tube.properties.diameters.map((diamater) => (
                <option key={diamater.name}>{diamater.name}</option>
              ))}
            </select>
          </div>

          <div className="d-form-control w-full max-w-xs">
            <label className="d-label">
              <span className="d-label-text font-bold">Hossz</span>
            </label>
            <select
              className="d-select d-select-bordered w-full max-w-xs"
              onChange={(e) => setSelectedLength(+e.target.value)}
              value={selectedLength}
            >
              {selectedDiameter.lengths.map((length) => (
                <option key={length} value={length}>
                  {length}cm
                </option>
              ))}
            </select>
          </div>
        </div>
        <h2>
          {currencyFormatter(selectedDiameter.pricePerMeter * Math.ceil(selectedLength / 100))}{' '}
          <span className="text-base text-gray-400">({pricePerMeterFormatter(selectedDiameter.pricePerMeter)})</span>
        </h2>

        <AddToCartButton
          product={{
            ...tube,
            id: `${tube.id}-${selectedDiameter.name}-${selectedLength}}`,
            name: `${tube.name} (${selectedDiameter.name} - ${selectedLength}cm)`,
            price: selectedDiameter.pricePerMeter * Math.ceil(selectedLength / 100),
          }}
        />
      </Card>
    </div>
  );
}
