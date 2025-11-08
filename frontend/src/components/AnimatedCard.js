// src/components/AnimatedCard.js
import React from "react";
import { motion } from "framer-motion";

const AnimatedCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 12px 28px rgba(0,0,0,0.15)"
    }}
    style={{
      borderRadius: "16px",
      background: "var(--card-bg, #fff)",
      padding: "1.5rem",
      marginBottom: "1rem",
      boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
    }}
  >
    {children}
  </motion.div>
);

export default AnimatedCard;
