'use client';
import { LazyMotion, m } from 'framer-motion';
import { ReactNode } from 'react';
import Card from './Card';

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
};

export default function HoverAnimatedCard({
  children,
  className,
}: AnimatedCardProps) {
  return (
    <LazyMotion
      features={async () => (await import('@/lib/animation-features')).default}
    >
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
    </LazyMotion>
  );
}
