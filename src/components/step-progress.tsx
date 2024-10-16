import { useCheckoutFormStore } from '@/store/use-checkout-form-store';
import { FC } from 'react';

const STEP_LABELS = ['Szálítás', 'Számlázás', 'Összegzés'] as const;

const StepProgress: FC = () => {
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
      {STEP_LABELS.map((stepLabel, idx) => {
        const isActive = step >= idx;
        const isPrevious = step > idx;

        return (
          <li
            key={stepLabel}
            className={`d-step font-semibold ${isActive ? 'd-step-success' : 'before:!bg-white after:!bg-white'} ${isPrevious ? 'cursor-pointer' : ''}`}
            onClick={() => onStepClick(isPrevious, idx)}
          >
            {stepLabel}
          </li>
        );
      })}
    </ul>
  );
};

export default StepProgress;
