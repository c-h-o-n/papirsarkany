'use client';
import Link from 'next/link';
import { createPortal } from 'react-dom';

type SuccessToastProps = {
  message: string;
  href: string;
};

export default function SuccessToast({ href, message }: SuccessToastProps) {
  return createPortal(
    <Link href={href}>
      <div className="d-toast d-toast-end d-toast-bottom z-50">
        <div className="d-alert d-alert-success">
          <span>{message}</span>
        </div>
      </div>
    </Link>,
    document.body,
  );
}
