'use client';

import Link, { LinkProps } from 'next/link';
import { FC, ReactNode } from 'react';

export type MenuItemProps = LinkProps & {
  children?: ReactNode;
};

const NavMenuItem: FC<MenuItemProps> = (props: MenuItemProps) => {
  const { children } = props;

  return (
    <li className="text-sm lg:text-base">
      <Link {...props} onClick={(e) => (e.target as HTMLElement).blur()}>
        {children}
      </Link>
    </li>
  );
};

export default NavMenuItem;
