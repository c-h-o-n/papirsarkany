'use client';

import { ReactNode } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

type Props = {
  children: ReactNode;
};

export default function MasonryContainer({ children }: Props) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 639: 2, 1023: 3 }}>
      <Masonry gutter="24px">{children}</Masonry>
    </ResponsiveMasonry>
  );
}
