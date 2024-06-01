'use client';
import { LazyMotion, m } from 'framer-motion';
import { ReactNode } from 'react';

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimatedCard({
  children,
  className,
}: AnimatedCardProps) {
  return (
    <LazyMotion
      features={async () => (await import('@/lib/animation-features')).default}
    >
      <m.div
        className={`rounded-lg border-4 border-black bg-white ${className}`}
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
        {children}
      </m.div>
    </LazyMotion>
  );
}
