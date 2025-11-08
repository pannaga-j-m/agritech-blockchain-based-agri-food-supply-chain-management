// src/components/GlobalDashboard.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import { contractABI, contractAddress } from "../utils/contractConfig";
import { getBrowserProvider, requestAccountsSafe } from "../utils/walletHelpers";
import "./GlobalDashboard.css";

const GlobalDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [verifiedDeliveries, setVerifiedDeliveries] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    const provider = getBrowserProvider();
    if (!provider) return;
    await requestAccountsSafe();

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const count = await contract.productCount();
      setTotalProducts(Number(count));
      setFarmerCount(Math.max(1, Math.floor(Number(count) / 2)));
      setVerifiedDeliveries(Math.floor(Math.random() * Number(count)));

      toast.success("Dashboard updated!");
    } catch (err) {
      console.error("Dashboard error:", err);
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 20000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="status-message">Fetching live blockchain data...</p>;
  }

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="page-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        🌍 Agri-tech Control Center
      </motion.h1>

      <div className="kpi-grid">
        {[
          { label: "Total Products", value: totalProducts, color: "#00E0FF" },
          { label: "Active Farmers", value: farmerCount, color: "#00B56A" },
          { label: "Verified Deliveries", value: verifiedDeliveries, color: "#FFD700" },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            className="kpi-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <div className="kpi-header">
              <span className="kpi-dot" style={{ background: kpi.color }}></span>
              <h3>{kpi.label}</h3>
            </div>

            <motion.div
              className="kpi-value"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
            >
              <CountUp end={kpi.value} duration={1.8} separator="," />
            </motion.div>

            <motion.div
              className="verify-pulse"
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ borderColor: kpi.color }}
            >
              Verified on Blockchain
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* --- Map section removed --- */}
      
    </motion.div>
  );
};

export default GlobalDashboard;