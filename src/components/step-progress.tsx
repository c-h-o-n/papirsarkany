import type { FC } from "react";
import { useCheckoutFormStore } from "~/store/use-checkout-form-store";

const STEP_LABELS = ["Szálítás", "Számlázás", "Összegzés"] as const;

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
          <button
            tabIndex={isPrevious ? 0 : -1}
            type="button"
            key={stepLabel}
            className={`d-step after:!content-[counter(step)] font-semibold focus-within:after:outline focus-visible:outline-none focus-visible:after:outline-neutral focus-visible:after:outline-offset-2 ${isActive ? "d-step-success" : "before:!bg-white after:!bg-white"} ${isPrevious ? "cursor-pointer" : ""}`}
            onClick={() => onStepClick(isPrevious, idx)}
          >
            {stepLabel}
          </button>
        );
      })}
    </ul>
  );
};

export default StepProgress;
