"use client";

import clsx from "clsx";
import { Variants, motion, useInView } from "motion/react";
import { useRef } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.04 * i },
  }),
};

const child: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

/** The root margin accepted by `useInView`, e.g. "-30% 0% -25% 0%". */
type MarginView = NonNullable<Parameters<typeof useInView>[1]>["margin"];

interface AnimatedTextWordProps {
  text: string;
  className?: string;
  darkWords?: boolean[];
  loadingHeight?: string;
  marginView: MarginView;
}

const AnimatedTextWord = ({
  text,
  className,
  darkWords,
  loadingHeight,
  marginView,
}: AnimatedTextWordProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: marginView });
  const words = text?.split(" ");

  if (!isInView) {
    return (
      <span ref={ref} className={clsx("block opacity-0", loadingHeight)}>
        {text}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      style={{ overflow: "hidden", display: "flex" }}
      className="flex-wrap"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words?.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className={clsx(className, { "text-grayDark": darkWords?.[index] })}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedTextWord;
