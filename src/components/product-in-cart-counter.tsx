"use client";

import {
  type ChangeEvent,
  type FC,
  type FocusEvent,
  useRef,
  useState,
} from "react";

import type { CartItem } from "~/lib/validation-schemas";
import { useCartStore } from "~/store/use-cart-store";

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

  const hasPendingChanges = useRef(false);
  const [temporaryQuantityValue, setTemporaryQuantityValue] = useState(
    cartItem.quantity,
  );

  const abortChanges = () => {
    hasPendingChanges.current = false;
    setTemporaryQuantityValue(cartItem.quantity);
  };

  const saveChanges = () => {
    hasPendingChanges.current = false;
    setItemQuantity(cartItem, temporaryQuantityValue);
    setTemporaryQuantityValue(cartItem.quantity);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    hasPendingChanges.current = true;

    const newQuantity = Number.parseInt(e.target.value);
    setTemporaryQuantityValue(newQuantity);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value);

    if (
      newQuantity < 1 ||
      newQuantity > 999 ||
      !Number.isInteger(+e.target.value)
    ) {
      abortChanges();
      return;
    }

    saveChanges();
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
      <button
        type="button"
        className="d-btn no-animation rounded-r-none shadow-none focus:z-[1]"
        onClick={() => handleDecreaseButtonClick()}
      >
        -
      </button>
      <input
        type="number"
        className="h-12 w-12 rounded-none bg-base-200 text-center shadow-none focus:z-[1]"
        value={
          !hasPendingChanges.current
            ? cartItem.quantity.toString()
            : temporaryQuantityValue.toString()
        }
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyPress}
      />
      <button
        type="button"
        className={`d-btn no-animation rounded-l-none shadow-none focus:z-[1] ${
          cartItem.quantity >= 999 && "d-btn-disabled"
        }`}
        onClick={() => handleIncreaseButtonClick()}
      >
        +
      </button>
    </div>
  );
};

export default ProductinCartCounter;
