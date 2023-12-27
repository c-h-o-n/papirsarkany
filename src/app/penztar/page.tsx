import CheckoutFormStepper from '@/components/CheckoutFormStepper';
import CheckoutPayingForm from '@/components/CheckoutPayingForm';
import CheckoutShippingForm from '@/components/CheckoutShippingForm';
import CheckoutSummary from '@/components/CheckoutSummaryForm';

export default function Checkout() {
  return (
    <CheckoutFormStepper>
      <CheckoutShippingForm />
      <CheckoutPayingForm />
      <CheckoutSummary />
    </CheckoutFormStepper>
  );
}
