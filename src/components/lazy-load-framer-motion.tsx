'use client';

import { LazyMotion } from 'framer-motion';
import { FC, ReactNode } from 'react';

type LazyLoadFramerMotionProps = {
  children: ReactNode;
};

const LazyLoadFramerMotion: FC<LazyLoadFramerMotionProps> = ({ children }) => {
  return (
    <LazyMotion
      features={async () => (await import('~/lib/animation-features')).default}
      strict
    >
      {children}
    </LazyMotion>
  );
};

export default LazyLoadFramerMotion;
