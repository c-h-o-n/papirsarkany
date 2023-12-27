import { CartItem } from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';

type Props = {
  cartItem: CartItem;
  value: number;
};
export default function ProductinCartCounter({ cartItem }: Props) {
  const [temporaryValue, setTemporaryValue] = useState(
    cartItem.quantity.toString(),
  );

  useEffect(() => {
    setTemporaryValue(cartItem.quantity.toString());
  }, [cartItem.quantity]);

  const decreaseItemQuantity = useCartStore(
    (state) => state.decreaseItemQuantity,
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const setItem = useCartStore((state) => state.setItemQuantity);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTemporaryValue(e.target.value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (
      +e.target.value < 1 ||
      +e.target.value > 999 ||
      !Number.isInteger(+e.target.value)
    ) {
      setTemporaryValue(cartItem.quantity.toString());
      return;
    }
    setItem(cartItem, +e.target.value);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      return;
    }
  };

  return (
    <div className="flex items-center">
      <div
        className="d-btn no-animation rounded-r-none"
        onClick={() => decreaseItemQuantity(cartItem)}
      >
        -
      </div>
      <input
        type="number"
        className="h-12 w-12 bg-base-200 text-center"
        value={temporaryValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyPress}
      />
      <div
        className={`d-btn no-animation rounded-l-none ${
          cartItem.quantity >= 999 && 'd-btn-disabled'
        }`}
        onClick={() => addToCart(cartItem)}
      >
        +
      </div>
    </div>
  );
}
