'use client';

import { Toast } from '@/lib/types';
import Link from 'next/link';

type SuccessToastProps = Pick<
  Extract<Toast, { type: 'success' }>,
  'message' | 'href'
>;

export default function SuccessToast({ href, message }: SuccessToastProps) {
  const toast = (
    <div className="d-alert d-alert-success">
      <span className="font-semibold">{message}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{toast}</Link>;
  }

  return toast;
}
