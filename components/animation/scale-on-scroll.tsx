"use client";

import { motion, useTransform, useScroll } from "motion/react";
import { useRef } from "react";

interface ScaleOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

const ScaleOnScroll = ({ children, className }: ScaleOnScrollProps) => {
  const targetRef = useRef(null);
  const { scrollY } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.8]);
  return (
    <motion.div
      className={className}
      style={{ opacity, scale }}
      ref={targetRef}
    >
      {children}
    </motion.div>
  );
};

export default ScaleOnScroll;
