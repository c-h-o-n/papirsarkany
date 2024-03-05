'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

type MenuItemProps = LinkProps & {
  children?: ReactNode;
};

export default function MenuItem(props: MenuItemProps) {
  const { children } = props;
  return (
    <li className='text-sm lg:text-base' onClick={(e) => e.currentTarget.blur()}>
      <Link {...props}>{children}</Link>
    </li>
  );
}
