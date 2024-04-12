'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export type MenuItemProps = LinkProps & {
  children?: ReactNode;
};

export default function NavMenuItem(props: MenuItemProps) {
  const { children } = props;
  return (
    <li className="text-sm lg:text-base">
      <Link {...props} onClick={(e) => e.currentTarget.blur()}>
        {children}
      </Link>
    </li>
  );
}
