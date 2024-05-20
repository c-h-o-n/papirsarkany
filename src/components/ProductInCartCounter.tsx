import { CartItem } from "@/lib/types";
import { useCartStore } from "@/store/useCartStore";
import { ChangeEvent, FocusEvent, useState } from "react";

type ProductinCartCounterProps = {
  cartItem: CartItem;
  value: number;
};

export default function ProductinCartCounter({
  cartItem,
}: ProductinCartCounterProps) {
  const setItemQuantity = useCartStore((state) => state.setItemQuantity);
  const addToCart = useCartStore((state) => state.addToCart);
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
    addToCart(cartItem);
    setTemporaryQuantityValue((currentValue) => currentValue + 1);
  };

  return (
    <div className="flex items-center">
      <div
        className="d-btn no-animation rounded-r-none"
        onClick={() => handleDecreaseButtonClick()}
      >
        -
      </div>
      <input
        type="number"
        className="h-12 w-12 bg-base-200 text-center"
        value={temporaryQuantityValue.toString()}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyPress}
      />
      <div
        className={`d-btn no-animation rounded-l-none ${
          cartItem.quantity >= 999 && "d-btn-disabled"
        }`}
        onClick={() => handleIncreaseButtonClick()}
      >
        +
      </div>
    </div>
  );
}
