// src/components/TrackProductPage.js
import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/contractConfig";
import { getBrowserProvider, requestAccountsSafe } from "../utils/walletHelpers";
import { toast } from "react-toastify";
import "./FarmerAddProduct.css";

const TrackProductPage = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);
  const [status, setStatus] = useState("");

  const fetchProduct = async () => {
    if (!productId) {
      toast.warn("Enter a Product ID to track.");
      return;
    }

    const provider = getBrowserProvider();
    if (!provider) return;
    await requestAccountsSafe();

    try {
      setStatus("Fetching product details...");
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const details = await contract.getProductDetails(productId);

      if (!details) {
        toast.info("No product found with that ID.");
        setStatus("No product found.");
        setProductData(null);
        return;
      }

      setProductData(details);
      toast.success("Product data fetched successfully!");
      setStatus("");
    } catch (err) {
      console.error("Failed to fetch product:", err);
      if (err?.code === 4001) toast.warn("You rejected the wallet request.");
      else toast.error("Failed to fetch product data.");
      setStatus("⚠️ Failed to fetch product.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>TRACK PRODUCT</h1>
      </div>

      <div className="action-card">
        <h2 style={{ marginTop: 0 }}>Enter Product ID</h2>
        <input
          type="number"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchProduct}>
          Track Product
        </button>
        {status && <div className="status-message">{status}</div>}
      </div>

      {productData && (
        <div className="card success-card">
          <h3>Product Details</h3>
          <p>Crop Type: {productData.cropType}</p>
          <p>Weight: {productData.weightInKg?.toString()} kg</p>
          <p>Owner: {productData.owner}</p>
          <p>State: {productData.state}</p>
        </div>
      )}
    </div>
  );
};

export default TrackProductPage;
