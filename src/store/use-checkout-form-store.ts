import 'client-only';
import { create } from 'zustand';

import type { OrderForm } from '~/lib/validation-schemas';

type State = {
  /**
   * Stored values of checkout form.
   */
  formValues: Partial<OrderForm>;
  step: number;
};

type Actions = {
  setFormValues: (formData: Partial<OrderForm>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  resetForm: () => void;
};

const initialState: State = {
  step: 0,
  formValues: {
    isSameAdressAsShipping: true,
  },
};

/**
 * To persist form state when user navigates to other pages during checkout and the checkout form got unmounted.
 */
export const useCheckoutFormStore = create<State & Actions>((set) => ({
  ...initialState,
  setFormValues(formData) {
    set((state) => ({ formValues: { ...state.formValues, ...formData } }));
  },
  nextStep() {
    set((state) => ({ step: state.step + 1 }));
  },
  prevStep() {
    set((state) => ({ step: state.step - 1 }));
  },
  setStep(step) {
    set(() => ({ step }));
  },
  resetForm() {
    set(() => ({
      ...initialState,
    }));
  },
}));
