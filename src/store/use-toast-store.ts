import { delay } from '~/lib/helpers';
import { Toast } from '~/lib/types';
import 'client-only';
import { SetOptional } from 'type-fest';
import { create } from 'zustand';

/**
 * number of ms to wait before automatically closing the toast
 */
const AUTO_CLOSE = 3000;
/**
 * number of ms of framer motion animation duration
 */
const ANIMATION_DURATION = 300;

type State = {
  toasts: Toast[];
};

type Actions = {
  /**
   * Add a new toast to the store
   */
  toast: (toast: SetOptional<Toast, 'id'>) => void;
  /**
   * Remove a toast from the store
   */
  removeToast: (id: string) => void;
  /**
   * Set the next toast to active
   */
  showNextToast: () => void;

  /**
   * Set the toast to inactive
   */
  dismissToast: (id: string) => void;
};

const initialState: State = {
  toasts: [],
};

export const useToastStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  toast: (toast) => {
    const { toasts, showNextToast } = get();

    const toastId = toast.id || crypto.randomUUID();

    if (toasts.find((toast) => toast.id === toastId)) {
      return;
    }

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: toastId, active: false }],
    }));

    if (!toasts.some((toast) => toast.active)) {
      showNextToast();
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  showNextToast: async () => {
    const { toasts, removeToast, dismissToast, showNextToast } = get();

    if (toasts.length === 0) {
      return;
    }

    const currentToast = toasts[0];

    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === currentToast.id ? { ...toast, active: true } : toast,
      ),
    }));

    await delay(AUTO_CLOSE);

    dismissToast(currentToast.id);

    await delay(ANIMATION_DURATION);

    removeToast(currentToast.id);

    if (toasts.length > 0) {
      showNextToast();
    }
  },

  dismissToast: async (id) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, active: false } : toast,
      ),
    }));
  },
}));
