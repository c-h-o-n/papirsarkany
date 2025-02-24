'use client';

import type { FC } from 'react';
import type { Toast } from '~/lib/types';

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
