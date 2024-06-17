import CheckoutBillingForm from '@/components/CheckoutBillingForm';
import CheckoutFormStepper from '@/components/CheckoutFormStepper';
import CheckoutShippingForm from '@/components/CheckoutShippingForm';
import CheckoutSummary from '@/components/CheckoutSummaryForm';

export default function Checkout() {
  return (
    <CheckoutFormStepper>
      <CheckoutShippingForm />
      <CheckoutBillingForm />
      <CheckoutSummary />
    </CheckoutFormStepper>
  );
}
