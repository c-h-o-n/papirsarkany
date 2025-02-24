'use client';

import Link from 'next/link';
import type { FC } from 'react';

import type { Toast } from '~/lib/types';

type SuccessToastProps = Pick<
  Extract<Toast, { type: 'success' }>,
  'message' | 'href'
>;

const SuccessToast: FC<SuccessToastProps> = ({ href, message }) => {
  const toast = (
    <div className="d-alert d-alert-success">
      <span className="font-semibold">{message}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{toast}</Link>;
  }

  return toast;
};

export default SuccessToast;
