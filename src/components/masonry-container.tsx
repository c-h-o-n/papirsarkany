'use client';

import { FC, ReactNode } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

type MasonryContainerProps = {
  children: ReactNode;
};

const MasonryContainer: FC<MasonryContainerProps> = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 639: 2, 1023: 3 }}>
      <Masonry gutter="24px">{children}</Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryContainer;
