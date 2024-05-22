import { create } from 'zustand';
import { FormSchemaObject } from '@/lib/types';

type State = {
  formData: FormSchemaObject;
  isSubmitting: boolean;
};

type Actions = {
  setFormData: (formData: Partial<FormSchemaObject>) => void;
  resetFormData: () => void;
  setIsSubmitting: (value: boolean) => void;
};

const initialState: State = {
  isSubmitting: false,
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
  setIsSubmitting(value) {
    set(() => ({ isSubmitting: value }));
  },
  setFormData(formData) {
    set((state) => ({ formData: { ...state.formData, ...formData } }));
  },
  resetFormData() {
    set(() => ({
      ...initialState,
    }));
  },
}));
