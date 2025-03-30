import "client-only";
import { create } from "zustand";

type State = {
  destination?: string;
};
type Actions = {
  setFoxpostData: (data: State) => void;
};

const initialState: State = {
  destination: undefined,
};

export const useFoxpostParcelBoxStore = create<State & Actions>((set) => ({
  ...initialState,
  setFoxpostData(data) {
    set((state) => ({ ...state, ...data }));
  },
}));
