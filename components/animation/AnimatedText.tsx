"use client";

import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

interface AnimatedTextWordProps {
  text: string;
  className?: string;
  darkWords?: boolean[];
  loadingHeight?: string;
  marginView: string;
}

const AnimatedTextWord = ({
  text,
  className,
  darkWords,
  loadingHeight,
  marginView,
}: AnimatedTextWordProps) => {
  const ref = useRef(null);
  const [container, setContainer] = useState({});
  const isInView = useInView(ref, {
    once: true,
    margin: marginView,
  });
  const words = text.split(" ");

  useEffect(() => {
    const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.3, delayChildren: 0.04 * i },
      }),
    };
    setContainer(container);
  }, [isInView]);

  const child = {
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
      {words.map((word, index) => (
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
