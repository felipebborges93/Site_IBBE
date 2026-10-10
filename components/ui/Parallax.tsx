"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  speed?: number;
}

export function Parallax({
  children,
  offset = 50,
  speed = 1,
  className = "",
}: ParallaxProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset * speed, offset * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 1 });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: smoothY }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
