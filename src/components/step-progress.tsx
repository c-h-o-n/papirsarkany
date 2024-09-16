import { useCheckoutFormStore } from '@/store/use-checkout-form-store';

const steps = ['Szálítás', 'Számlázás', 'Összegzés'];

export default function Steps() {
  const step = useCheckoutFormStore((state) => state.step);
  const setStep = useCheckoutFormStore((state) => state.setStep);

  const onStepClick = (isPrevious: boolean, stepToSet: number) => {
    if (!isPrevious) {
      return;
    }
    setStep(stepToSet);
  };

  return (
    <ul className="d-steps w-full">
      {steps.map((stepLabel, idx) => {
        const isActive = step >= idx;
        const isPrevious = step > idx;

        return (
          <li
            key={stepLabel}
            className={`d-step font-semibold ${isActive ? 'd-step-success' : 'after:!bg-white before:!bg-white'} ${isPrevious ? 'cursor-pointer' : ''}`}
            onClick={() => onStepClick(isPrevious, idx)}
          >
            {stepLabel}
          </li>
        );
      })}
    </ul>
  );
}
