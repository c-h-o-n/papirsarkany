'use client';

import { createPortal } from 'react-dom';

type ErrorToastProps = {
  message?: string;
};

export default function ErrorToast({ message }: ErrorToastProps) {
  return createPortal(
    <div className="d-toast d-toast-end d-toast-bottom z-50">
      <div className="d-alert d-alert-error">
        <span className="font-semibold text-white">
          {message || 'Hiba történt'}
        </span>
      </div>
    </div>,
    document.body,
  );
}
