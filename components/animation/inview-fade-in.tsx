"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

interface InViewProps {
  children: React.ReactNode;
  delay: number;
  time: number;
}

const InViewFadeIn = ({ children, delay, time }: InViewProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transition: `all ${time}s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
      }}
      className="block w-fit"
    >
      {children}
    </span>
  );
};

export default InViewFadeIn;
