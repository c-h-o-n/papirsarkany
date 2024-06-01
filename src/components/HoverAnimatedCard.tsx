'use client';
import { m } from 'framer-motion';
import { ReactNode } from 'react';
import Card from './Card';
import LazyLoadFramerMotion from './LazyLoadFramerMotion';

type HoverAnimatedCardProps = {
  children: ReactNode;
  className?: string;
};

export default function HoverAnimatedCard({
  children,
  className,
}: HoverAnimatedCardProps) {
  return (
    <LazyLoadFramerMotion>
      <m.div
        whileHover={{
          scale: 1.05,
          transition: {
            type: 'spring',
            velocity: 1.25,
            bounce: 0.4,
            duration: 0.8,
          },
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        <Card className={className}>{children}</Card>
      </m.div>
    </LazyLoadFramerMotion>
  );
}
