'use client';

import { Toast } from '~/lib/types';
import { FC } from 'react';

type ErrorToastProps = Pick<Extract<Toast, { type: 'error' }>, 'message'>;

const ErrorToast: FC<ErrorToastProps> = ({ message }) => {
  return (
    <div className="d-alert d-alert-error">
      <span className="font-semibold text-white">
        {message || 'Hiba történt'}
      </span>
    </div>
  );
};

export default ErrorToast;
