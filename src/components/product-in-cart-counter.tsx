'use client';

import { ChangeEvent, FC, FocusEvent, useState } from 'react';

import { CartItem } from '~/lib/validation-schemas';
import { useCartStore } from '~/store/use-cart-store';

type ProductinCartCounterProps = {
  cartItem: CartItem;
  value: number;
};

const ProductinCartCounter: FC<ProductinCartCounterProps> = ({ cartItem }) => {
  const setItemQuantity = useCartStore((state) => state.setItemQuantity);

  const increaseItemQuantity = useCartStore(
    (state) => state.increaseItemQuantity,
  );
  const decreaseItemQuantity = useCartStore(
    (state) => state.decreaseItemQuantity,
  );

  const [temporaryQuantityValue, setTemporaryQuantityValue] = useState(
    cartItem.quantity,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    setTemporaryQuantityValue(newQuantity);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);

    if (
      newQuantity < 1 ||
      newQuantity > 999 ||
      !Number.isInteger(+e.target.value)
    ) {
      setTemporaryQuantityValue(cartItem.quantity);
      return;
    }
    setItemQuantity(cartItem, newQuantity);
    setTemporaryQuantityValue(newQuantity);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      return;
    }
  };

  const handleDecreaseButtonClick = () => {
    decreaseItemQuantity(cartItem);
    setTemporaryQuantityValue((currentValue) => currentValue - 1);
  };

  const handleIncreaseButtonClick = () => {
    increaseItemQuantity(cartItem);
    setTemporaryQuantityValue((currentValue) => currentValue + 1);
  };

  return (
    <div className="flex items-center">
      <div
        className="d-btn no-animation rounded-r-none shadow-none"
        onClick={() => handleDecreaseButtonClick()}
      >
        -
      </div>
      <input
        type="number"
        className="h-12 w-12 rounded-none bg-base-200 text-center shadow-none"
        value={temporaryQuantityValue.toString()}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyPress}
      />
      <div
        className={`d-btn no-animation rounded-l-none shadow-none ${
          cartItem.quantity >= 999 && 'd-btn-disabled'
        }`}
        onClick={() => handleIncreaseButtonClick()}
      >
        +
      </div>
    </div>
  );
};

export default ProductinCartCounter;
