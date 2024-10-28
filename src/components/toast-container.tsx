'use client';

import { AnimatePresence, m } from 'framer-motion';
import { FC } from 'react';

import { useToastStore } from '~/store/use-toast-store';
import LazyLoadFramerMotion from './lazy-load-framer-motion';
import Toast from './toast';

type ToastContainerProps = {
  // autoClose?: number;
  // motionProps?: HTMLMotionProps<'div'>;
};

const ToastContainer: FC<ToastContainerProps> = () => {
  const toasts = useToastStore((state) => state.toasts);

  return toasts.map((toast) => (
    <LazyLoadFramerMotion key={toast.id}>
      <AnimatePresence>
        {toast.active && (
          <m.div
            className="d-toast d-toast-end d-toast-bottom z-50"
            initial={{
              opacity: 0,
              x: '100%',
              scaleY: 0.33,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scaleY: 1,
            }}
            exit={{
              opacity: 0,
              x: '100%',
              scaleY: 0.33,
            }}
          >
            <Toast toast={toast} />
          </m.div>
        )}
      </AnimatePresence>
    </LazyLoadFramerMotion>
  ));
};

export default ToastContainer;
