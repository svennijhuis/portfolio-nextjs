"use client";

import { motion, AnimatePresence } from "motion/react";

interface ScreenLoadingProps {
  children: React.ReactNode;
}

const ScreenLoading = ({ children }: ScreenLoadingProps) => {
  return (
    <AnimatePresence>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.2 } }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
};

export default ScreenLoading;
