'use client';
import { Rod } from '@/lib/types';
import Card from './Card';
import AddToCartButton from './AddToCartButton';
import { useState } from 'react';
import { currencyFormatter, pricePerMeterFormatter } from '@/lib/formatters';

type Props = {
  rod: Rod;
};

export default function RodCard({ rod }: Props) {
  const [selectedDiameter, setSelectedDiameter] = useState(rod.properties.diameters[0]);
  const [selectedLength, setselectedLength] = useState<number>(rod.properties.lengths[0]);

  return (
    <div className="relative z-0 cursor-pointer">
      {/* <Link href={`anyagok/${rod.slug}`}> */}
      <Card className="w-full space-y-3 p-5">
        <h3 className="font-bold">{rod.name}</h3>

        <div className="flex gap-2">
          <div className="d-form-control w-full max-w-xs">
            <label className="d-label">
              <span className="d-label-text font-bold">Átmérő</span>
            </label>
            <select
              className="d-select d-select-bordered"
              onChange={(e) =>
                setSelectedDiameter({
                  name: e.target.value,
                  pricePerMeter: rod.properties.diameters.find((diameter) => diameter.name === e.target.value)
                    ?.pricePerMeter!,
                })
              }
              onClick={(e) => e.preventDefault()}
            >
              {rod.properties.diameters.map((diamater) => (
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
              onChange={(e) => setselectedLength(+e.target.value)}
              onClick={(e) => e.preventDefault()}
            >
              {rod.properties.lengths.map((length) => (
                <option key={length}>{length}</option>
              ))}
            </select>
          </div>
        </div>
        <h2>
          {currencyFormatter(selectedDiameter.pricePerMeter * Math.ceil(selectedLength / 100))}{' '}
          <span className="text-base text-gray-400">({pricePerMeterFormatter(selectedDiameter.pricePerMeter)})</span>
        </h2>

        <AddToCartButton
          kite={{
            ...rod,
            id: `${rod.id}-${selectedDiameter.name}-${selectedLength}}`,
            name: `${rod.name} ${selectedDiameter.name} x ${selectedLength} cm `,
            price: selectedDiameter.pricePerMeter * Math.ceil(selectedLength / 100),
          }}
        />
      </Card>
      {/* </Link> */}
    </div>
  );
}
