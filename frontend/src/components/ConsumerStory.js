// src/components/ConsumerStory.js
import React from "react";
import { motion } from "framer-motion";
import "./ConsumerStory.css";

const stages = [
  { icon: "🌱", title: "Farmed", desc: "Grown ethically at certified farms." },
  { icon: "🏭", title: "Processed", desc: "Quality-checked and processed locally." },
  { icon: "🚚", title: "Shipped", desc: "Monitored through blockchain-based logistics." },
  { icon: "✅", title: "Verified", desc: "Product authenticity verified on-chain." },
];

const ConsumerStory = () => (
  <div className="story-container">
    <h1>Farm-to-Table Journey</h1>

    {stages.map((stage, i) => (
      <motion.div
        key={i}
        className="story-step"
        initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        viewport={{ once: true }}
      >
        <div className="story-icon">{stage.icon}</div>
        <div className="story-text">
          <h3>{stage.title}</h3>
          <p>{stage.desc}</p>
        </div>
        <motion.div
          className="chain-glow"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    ))}

    <motion.div
      className="proof-card"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3>Proof of Authenticity</h3>
      <p>Blockchain Tx ID: <code>0x9f...3B7</code></p>
      <button onClick={() => window.open("https://etherscan.io/", "_blank")}>
        View on Blockchain
      </button>
    </motion.div>
  </div>
);

export default ConsumerStory;
