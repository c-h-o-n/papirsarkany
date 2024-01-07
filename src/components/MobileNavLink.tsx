'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

type Props = LinkProps & { children: ReactNode };

export default function MobileNavLink(props: Props) {
  return (
    <Link {...props} onClick={(e) => e.currentTarget.blur()}>
      {props.children}
    </Link>
  );
}
