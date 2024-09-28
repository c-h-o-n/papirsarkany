'use client';

import { HTMLMotionProps, m } from 'framer-motion';
import { ReactNode } from 'react';
import Card from './card';
import LazyLoadFramerMotion from './lazy-load-framer-motion';

type HoverAnimatedCardProps = HTMLMotionProps<'div'> & {
  children?: ReactNode;
};

export default function HoverAnimatedCard({
  children,
  className,
  ...props
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
        {...props}
      >
        <Card className={className}>{children}</Card>
      </m.div>
    </LazyLoadFramerMotion>
  );
}
