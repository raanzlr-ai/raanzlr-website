import React from "react";
import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Stagger = ({ children, delayStep = 0.08, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={{ visible: { transition: { staggerChildren: delayStep } }, hidden: {} }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "", y = 20 }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
