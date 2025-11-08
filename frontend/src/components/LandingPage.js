// src/components/LandingPage.js
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OnboardingCard from "./OnboardingCard";
import farmerVideo from "../assets/illustrations/Farmer.mp4";
import distributorVideo from "../assets/illustrations/Distributor.mp4";
import retailerVideo from "../assets/illustrations/Retailer.mp4";
import consumerVideo from "../assets/illustrations/Consumer.mp4";
import "./LandingPage.css";
import Navbar from "./Navbar";  // add this at top


const LandingPage = () => {
  const navigate = useNavigate();
  const infoRef = useRef(null);

  // Smooth scroll function for "Learn More"
  const scrollToInfo = () => {
    infoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>


      {/* ================= HERO SECTION ================= */}
      <header className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="gradient-text">  Agri-Tech</span>
          </h1>
          <div className="title-underline"></div>
          <p className="hero-subtitle">
            Bringing <span>Transparency</span> and <span>Trust</span>  to the Food You Eat — Powered by <span>Blockchain</span>.
          </p>
        </motion.div>
      </header>


      {/* ================= WHO IS THIS FOR (VIDEO CARDS) ================= */}
      <section className="onboarding-section">
        <OnboardingCard
          image={farmerVideo}
          title="Farmers"
          text="Register your harvests securely on the blockchain ensuring fair pricing, transparency, and verified origin."
          buttonText="Next"
          gradient={["#E3FFF3", "#C8FFE0"]}
          delay={0.1}
        />
        <OnboardingCard
          image={distributorVideo}
          title="Distributors"
          text="Monitor logistics in real time, automate transfers using smart contracts, and ensure timely delivery."
          buttonText="Next"
          gradient={["#E8F4FF", "#D1E9FF"]}
          delay={0.2}
        />
        <OnboardingCard
          image={retailerVideo}
          title="Retailers"
          text="Verify product authenticity, manage blockchain-backed supplier data, and enhance customer confidence."
          buttonText="Next"
          gradient={["#FFF6E3", "#FFEAC8"]}
          delay={0.3}
        />
        <OnboardingCard
          image={consumerVideo}
          title="Consumers"
          text="Scan QR codes to see the complete farm-to-table journey — trust the food you eat with blockchain proof."
          buttonText="Get Started"
          gradient={["#FFF0F0", "#FFE6E6"]}
          delay={0.4}
        />
      </section>

      {/* ================= INFO SECTION ================= */}
      <div ref={infoRef} data-info-section>
        {/* ================= WHY AGROLEDGER SECTION ================= */}
        <motion.section
          className="content-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Trust in Agriculture Matters</h2>
          <p>
            The global agricultural supply chain is vast — involving farmers, distributors, retailers, 
            and millions of consumers. Yet, data silos, price manipulation, and lack of transparency 
            have long affected the trust between these stakeholders.
          </p>
          <p>
            <strong>AgroLedger</strong> solves this by introducing 
            <strong> blockchain-powered traceability</strong>, ensuring that every seed, shipment, 
            and sale is <strong>verifiable, tamper-proof, and fair</strong>.
          </p>
        </motion.section>

        {/* ================= HOW IT WORKS SECTION ================= */}
        <motion.section
          className="content-section alt-bg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>From Farm to Fork — Verified by Blockchain</h2>
          <ul className="process-list">
            <li>🌱 <strong>Farm Registration:</strong> Farmers record harvest and quality data directly on-chain.</li>
            <li>🚚 <strong>Smart Distribution:</strong> Distributors log shipment details via smart contracts.</li>
            <li>🏪 <strong>Retail Validation:</strong> Retailers verify source, shelf life, and certification.</li>
            <li>🍽️ <strong>Consumer Transparency:</strong> Buyers scan a QR code to see the full journey.</li>
          </ul>
        </motion.section>

        {/* ================= TECHNOLOGY SECTION ================= */}
        <motion.section
          className="content-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Built on Secure, Scalable & Sustainable Blockchain</h2>
          <p>
            AgroLedger combines modern blockchain protocols with smart contracts to ensure transparency,
            traceability, and accountability at every stage of the agricultural supply chain.
          </p>
          <ul className="tech-list">
            <li>⚙️ <strong>Smart Contracts:</strong> Automate fair transactions and ownership transfers.</li>
            <li>💾 <strong>Decentralized Storage:</strong> Prevent manipulation and data loss.</li>
            <li>📡 <strong>IoT Integration:</strong> Real-time tracking for shipment temperature and location.</li>
            <li>🌍 <strong>Green Blockchain:</strong> Energy-efficient systems aligned with sustainability goals.</li>
          </ul>
        </motion.section>

        {/* ================= IMPACT SECTION ================= */}
        <motion.section
          className="content-section alt-bg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Empowering Every Stakeholder in the Chain</h2>
          <p>
            AgroLedger is a collaborative ecosystem that empowers every participant — from farms to markets — 
            with verified, tamper-proof data that builds transparency and trust.
          </p>
          <div className="impact-grid">
            <div className="impact-card">🌾 <strong>Farmers:</strong> Gain fair trade and digital certifications.</div>
            <div className="impact-card">🚚 <strong>Distributors:</strong> Ensure compliance and reduce fraud.</div>
            <div className="impact-card">🏪 <strong>Retailers:</strong> Build trust with blockchain validation.</div>
            <div className="impact-card">🍽️ <strong>Consumers:</strong> Make ethical, informed food choices.</div>
          </div>
        </motion.section>

        {/* ================= VISION SECTION ================= */}
        <motion.section
          className="content-section vision-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Vision — A Transparent Food Future</h2>
          <p>
            We envision a world where every grain, fruit, or product carries its own 
            <strong> verified story</strong> — where technology builds trust between 
            the hands that grow, move, and consume food.
          </p>
          <p>
            <strong>AgroLedger</strong> is our step toward a transparent, ethical, and sustainable food system.
          </p>
          <button className="cta-btn" onClick={() => navigate("/roles")}>
            Start Your Journey
          </button>
        </motion.section>
      </div>

      {/* ================= FOOTER ================= */}
      <motion.footer
        className="landing-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p>© {new Date().getFullYear()} AgroLedger — Trace. Trust. Thrive.</p>
      </motion.footer>
    </motion.div>
  );
};

export default LandingPage;
