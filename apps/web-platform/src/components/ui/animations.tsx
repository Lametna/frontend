import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

export const FadeIn = ({ children, delay = 0, className, ...props }: HTMLMotionProps<"div"> & { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, delay, ease: 'easeOut' }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({ children, delay = 0, className, ...props }: HTMLMotionProps<"div"> & { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, delay, type: 'spring', stiffness: 200, damping: 20 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const PopScale = ({ children, delay = 0, className, ...props }: HTMLMotionProps<"div"> & { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3, delay, type: 'spring', stiffness: 300, damping: 25 }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className, ...props }: HTMLMotionProps<"div">) => (
  <motion.div
    initial="hidden"
    animate="show"
    exit="hidden"
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className, ...props }: HTMLMotionProps<"div">) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
