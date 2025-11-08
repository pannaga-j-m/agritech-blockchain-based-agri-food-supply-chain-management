// src/components/Navbar.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./LandingPage.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLearnMore = () => {
    if (location.pathname === "/") {
      const section = document.querySelector("[data-info-section]");
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector("[data-info-section]");
        section?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  const navItems = [
    { name: "Roles", path: "/roles" },
    { name: "Global", path: "/global" },
    { name: "Track", path: "/track" },
    { name: "Learn More", action: handleLearnMore },
  ];

  return (
    <motion.nav
      className="navbar enhanced-navbar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-logo" onClick={() => navigate("/")}>
        <motion.span
          className="brand"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Agri-Tech
        </motion.span>
      </div>

      <div className="nav-links">
        {navItems.map((item, i) =>
          item.path ? (
            <motion.button
              key={i}
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? "active-link" : ""}
              whileHover={{ scale: 1.05, color: "#00b56a" }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.button>
          ) : (
            <motion.button
              key={i}
              onClick={item.action}
              whileHover={{ scale: 1.05, color: "#00b56a" }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.button>
          )
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
