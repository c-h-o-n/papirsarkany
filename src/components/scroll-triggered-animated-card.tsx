"use client";

import { m } from "motion/react";
import type { FC, ReactNode } from "react";

import Card from "./card";
import LazyLoadFramerMotion from "./lazy-load-framer-motion";

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
  animationDirection: "left-to-right" | "right-to-left";
};

const ScrollTriggeredAnimatedCard: FC<AnimatedCardProps> = ({
  children,
  className,
  animationDirection,
}) => {
  return (
    <LazyLoadFramerMotion>
      <m.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.33, once: true }}
        variants={{
          offscreen: {
            opacity: 0,
            x: animationDirection === "left-to-right" ? "-20%" : "20%",
          },
          onscreen: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              bounce: 0.25,
              duration: 0.4,
            },
          },
        }}
      >
        <Card className={className}>{children}</Card>
      </m.div>
    </LazyLoadFramerMotion>
  );
};

export default ScrollTriggeredAnimatedCard;
