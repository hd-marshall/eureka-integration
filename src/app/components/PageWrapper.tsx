"use client";
import classNames from "classnames";
import { motion } from "framer-motion";

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.95 }}
    animate={{ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.3 },
        y: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    }}
    exit={{ 
      opacity: 0, 
      y: -15, 
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: "easeInOut"
      }
    }}
    className={classNames("min-h-screenHeightWithoutHeader", className)}
  >
    {children}
  </motion.div>
);