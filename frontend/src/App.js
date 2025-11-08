// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RoleSelectionPage from "./components/RoleSelectionPage";
import FarmerAddProduct from "./components/FarmerAddProduct";
import DistributorUpdate from "./components/DistributorUpdate";
import RetailerUpdate from "./components/RetailerUpdate";
import ConsumerView from "./components/ConsumerView";
import TrackProductPage from "./components/TrackProductPage";
import GlobalDashboard from "./components/GlobalDashboard";
import RegisterPage from "./components/RegisterPage";
import Notifier from "./components/Notifier";
import "./App.css";
import Navbar from "./components/Navbar";
import ConsumerStory from "./components/ConsumerStory";
import "./components/LandingPage.css";

/**
 * Main App component for AgroLedger.
 * Includes routes for all user roles and the global Notifier (toast system).
 */
function App() {
  return (
    <Router>
      <div className="app-shell">
        <Notifier />
        <Navbar />   {/* ← Add here */}

        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/roles" element={<RoleSelectionPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/global" element={<GlobalDashboard />} />
          <Route path="/farmer" element={<FarmerAddProduct />} />
          <Route path="/distributor" element={<DistributorUpdate />} />
          <Route path="/retailer" element={<RetailerUpdate />} />
          <Route path="/consumer" element={<ConsumerView />} />
          <Route path="/track" element={<TrackProductPage />} />
          <Route path="/dashboard" element={<GlobalDashboard />} />
          <Route path="/story" element={<ConsumerStory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
