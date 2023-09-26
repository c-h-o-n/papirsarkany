import CheckoutLink from '@/components/CheckoutLink';
import OrderSummaryCard from '@/components/OrderSummaryCard';

export default function Cart() {
  return (
    <div className="container flex flex-col gap-4 p-8">
      <h1 className="text-center text-5xl font-bold">Kosár tartalma</h1>

      <div className="flex-1">
        <OrderSummaryCard />
      </div>

      <CheckoutLink />
    </div>
  );
}
