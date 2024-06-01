'use client';
import { LazyMotion } from 'framer-motion';
import { ReactNode } from 'react';

type LazyLoadFramerMotionProps = {
  children: ReactNode;
};

export default function LazyLoadFramerMotion({
  children,
}: LazyLoadFramerMotionProps) {
  return (
    <LazyMotion
      features={async () => (await import('@/lib/animation-features')).default}
      strict
    >
      {children}
    </LazyMotion>
  );
}
