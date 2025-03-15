"use client";

import { type HTMLMotionProps, m } from "framer-motion";
import type { FC, ReactNode } from "react";

import Card from "./card";
import LazyLoadFramerMotion from "./lazy-load-framer-motion";

type HoverAnimatedCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

const HoverAnimatedCard: FC<HoverAnimatedCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <LazyLoadFramerMotion>
      <m.div
        whileHover={{
          scale: 1.05,
          transition: {
            type: "spring",
            velocity: 1.25,
            bounce: 0.4,
            duration: 0.8,
          },
        }}
        {...props}
        className='h-full w-full'
      >
        <Card className={className}>{children}</Card>
      </m.div>
    </LazyLoadFramerMotion>
  );
};

export default HoverAnimatedCard;
