/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCartStore } from "@/store/useCartStore";
import { useCheckoutFormStore } from "@/store/useCheckoutFormStore";
import { useStepperStore } from "@/store/useStepperStore";
import { useEffect } from "react";

export default function SuccessfulOrder() {
  const resetCart = useCartStore((state) => state.resetCart);
  const resetFormData = useCheckoutFormStore((state) => state.resetFormData);
  const resetStepper = useStepperStore((state) => state.resetStepper);

  useEffect(() => {
    resetCart();
    resetFormData();
    resetStepper();
  }, []);

  return (
    <div className="grid items-center text-center">
      <div>
        <h1 className="font-bold">Sikeres rendelés!</h1>
        <div className="">Hamarosan felveszem önnel a kapcsolatot.</div>
      </div>
    </div>
  );
}
