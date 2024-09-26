'use client';

import { Toast } from '@/lib/types';

type ErrorToastProps = Pick<Extract<Toast, { type: 'error' }>, 'message'>;

export default function ErrorToast({ message }: ErrorToastProps) {
  return (
    <div className="d-alert d-alert-error">
      <span className="font-semibold text-white">
        {message || 'Hiba történt'}
      </span>
    </div>
  );
}
