import type { FC } from 'react';
import type { Toast } from '~/lib/types';
import ErrorToast from './error-toast';
import SuccessToast from './success-toast';

type ToastProps = {
  toast: Toast;
};

const Toast: FC<ToastProps> = ({ toast }) => {
  switch (toast.type) {
    case 'success': {
      return <SuccessToast {...toast} />;
    }
    case 'error':
      return <ErrorToast {...toast} />;
  }
};

export default Toast;
