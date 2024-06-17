import CheckoutLink from '@/components/CheckoutLink';
import OrderSummaryCard from '@/components/OrderSummaryCard';

export default function Cart() {
  return (
    <div className="container flex flex-col gap-4 p-8">
      <h1 className="text-center font-bold">Kosár tartalma</h1>

      <div className="grid flex-1 items-center">
        <div className="space-y-4">
          <OrderSummaryCard />
          <CheckoutLink />
        </div>
      </div>
    </div>
  );
}
