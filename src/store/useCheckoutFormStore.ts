import { create } from 'zustand';
import { FormSchemaObject } from '@/lib/types';

type State = {
  formData: FormSchemaObject;
};

type Actions = {
  setFormData: (formData: Partial<FormSchemaObject>) => void;
  resetFormData: () => void
};

const initialState: State = {
  formData: {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',

    shippingOption: '',

    shippingPostcode: '',
    shippingCity: '',
    shippingAddress: '',
    shippingSubaddress: '',

    paymentOption: '',

    isSameAdressAsShipping: true,

    billingPostcode: '',
    billingCity: '',
    billingAddress: '',
    billingSubaddress: '',

    comment: '',
  },
};

export const useCheckoutFormStore = create<State & Actions>((set) => ({
  ...initialState,
  setFormData(formData) {
    set((state) => ({ formData: {...state.formData, ...formData }}));
  },
  resetFormData() {
    set(() => ({
      ...initialState
    }));
  },
}));
