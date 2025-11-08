import React from "react";
import { motion } from "framer-motion";
import "./LandingPage.css";

const OnboardingCard = ({ image, title, text, buttonText, gradient, delay = 0 }) => {
  const isVideo = image.toLowerCase().endsWith(".mp4");

  return (
    <motion.div
      className="onboarding-card"
      style={{
        background: `linear-gradient(180deg, ${gradient[0]}, ${gradient[1]})`,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
    >
      <div className="card-image">
        {isVideo ? (
          <video
            src={image}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "80%",
              borderRadius: "16px",
              marginTop: "0.5rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          />
        ) : (
          <img
            src={image}
            alt={title}
            loading="lazy"
            style={{ width: "80%", borderRadius: "16px", marginTop: "0.5rem" }}
          />
        )}
      </div>

      <div className="card-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

      
    </motion.div>
  );
};

export default OnboardingCard;
