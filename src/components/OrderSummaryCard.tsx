'use client';

import { useCartStore } from '@/store/useCartStore';
import Card from './Card';
import { currencyFormatter } from '@/lib/formatters';

export default function OrderSummaryCard() {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const decreaseItemQuantity = useCartStore((state) => state.decreaseItemQuantity);

  const onDeleteClick = (product: any) => {
    console.log('remove');
    removeFromCart(product);
  };

  const onDecreaseClick = (product: any) => {
    decreaseItemQuantity(product);
  };

  if (cart.length < 1) {
    return (
      <div className="grid h-full place-items-center">
        <h1>Üres a kosarad.</h1>
      </div>
    );
  }

  return (
      <div className="flex items-center h-full">
      
    <Card className="flex-1 flex flex-col gap-4 p-5">
      {cart.map((item) => (
        <>
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="h-32 w-32 rounded-lg object-cover" />
              )}
              {item.name} - {item.quantity} db
            </div>
              {currencyFormatter(item.price * item.quantity)}
            <div>
              <button className="d-btn d-btn-error" onClick={() => onDeleteClick(item)}>
                del
              </button>
              <button className="d-btn d-btn-error" onClick={() => onDecreaseClick(item)}>
                -
              </button>
            </div>
          </div>
          <div className="d-divider"></div>
        </>
      ))}

      <div className="flex justify-between font-bold">
        <h3>Összesen</h3>
        <h3>{currencyFormatter(totalPrice)}</h3>
      </div>
    </Card>
    </div>
  );
}
