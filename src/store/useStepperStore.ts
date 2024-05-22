import { create } from 'zustand';

type State = {
  step: number;
};

type Actions = {
  nextStep: () => void;
  prevStep: () => void;
  resetStepper: () => void;
};

const initialState: State = {
  step: 0,
};

export const useStepperStore = create<State & Actions>((set) => ({
  ...initialState,
  nextStep() {
    set((state) => ({ step: state.step + 1 }));
  },
  prevStep() {
    set((state) => ({ step: state.step - 1 }));
  },
  resetStepper() {
    set(() => ({
      ...initialState,
    }));
  },
}));
