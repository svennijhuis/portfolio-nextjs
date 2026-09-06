"use client";

import { motion, useTransform, useScroll } from "motion/react";
import { useRef } from "react";

interface RotateOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

const RotateOnScroll = ({ children, className }: RotateOnScrollProps) => {
  const targetRefScroll = useRef(null);
  const { scrollY } = useScroll({
    target: targetRefScroll,
    offset: ["end end", "end start"],
  });
  const rotate = useTransform(scrollY, [0, 1000], [0, 90], { clamp: false });

  return (
    <motion.span className={className} ref={targetRefScroll} style={{ rotate }}>
      {children}
    </motion.span>
  );
};

export default RotateOnScroll;
