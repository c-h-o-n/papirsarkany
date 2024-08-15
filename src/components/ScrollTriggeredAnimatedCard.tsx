'use client';
import { m } from 'framer-motion';
import { ReactNode } from 'react';
import Card from './Card';
import LazyLoadFramerMotion from './LazyLoadFramerMotion';

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
};

export default function ScrollTriggeredAnimatedCard({
  children,
  className,
}: AnimatedCardProps) {
  return (
    <LazyLoadFramerMotion>
      <m.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.33, once: true }}
        variants={{
          offscreen: {
            scale: 0.33,
          },
          onscreen: {
            scale: 1,
            transition: {
              type: 'spring',
              bounce: 0.4,
              duration: 0.8,
            },
          },
        }}
      >
        <Card className={className}>{children}</Card>
      </m.div>
    </LazyLoadFramerMotion>
  );
}
