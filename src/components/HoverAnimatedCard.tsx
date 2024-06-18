'use client';
import { HTMLMotionProps, m } from 'framer-motion';
import { ReactNode } from 'react';
import Card from './Card';
import LazyLoadFramerMotion from './LazyLoadFramerMotion';

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
        whileTap={{
          scale: 0.95,
        }}
        {...props}
      >
        <Card className={className}>{children}</Card>
      </m.div>
    </LazyLoadFramerMotion>
  );
}
