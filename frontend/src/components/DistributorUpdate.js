import React, { useState, useEffect, useCallback, useRef } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/contractConfig";
import "./Portal.css";
import "./DistributorUpdate.css";
import dispatchVideo from "../assets/Animated_Delivery_Truck_Dashboard_Background.mp4";

const DistributorUpdate = () => {
  const [availableProducts, setAvailableProducts] = useState([]);
  const [ownedProducts, setOwnedProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);

  const fetchAllProducts = useCallback(async (account) => {
    if (!account) return;
    setIsLoading(true);
    setStatus("Fetching all products...");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const productCount = await contract.productCount();
      const productsForSale = [];
      const productsOwned = [];

      for (let i = 1; i <= productCount; i++) {
        const details = await contract.getProductDetails(i);

        const product = {
          id: i.toString(),
          cropType: details.cropType,
          currentPrice: details.currentPrice,
          owner: details.owner,
          state: Number(details.state),
          // priceHistoryLength is not needed for this logic
        };

        // 0: Created (Available from Farmer)
        if (product.state === 0) {
          productsForSale.push(product);
        } 
        // 1: InTransit (Owned by Distributor, needs processing)
        else if (product.owner.toLowerCase() === account.toLowerCase() && product.state === 1) {
          productsOwned.push(product);
        }
        // Products with state 2 (OnSale) are now ignored, so they "disappear"
      }
      setAvailableProducts(productsForSale);
      setOwnedProducts(productsOwned);
      setStatus("");
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setStatus("Error fetching products. Please check the console.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const connectAndFetch = async () => {
      if (!window.ethereum) return alert("Please install MetaMask.");
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setCurrentAccount(account);
        fetchAllProducts(account);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };
    connectAndFetch();
  }, [fetchAllProducts]);

  const handlePurchase = async (product) => {
    setIsLoading(true);
    setStatus(`Purchasing Product #${product.id}...`);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.purchaseProduct(product.id, {
        value: product.currentPrice,
      });
      await tx.wait();

      setStatus("Purchase successful! Refreshing...");
      await fetchAllProducts(currentAccount);
    } catch (err) {
      console.error("Purchase failed:", err);
      setStatus(`Purchase failed: ${err.reason || "Check console."}`);
    } finally {
      setIsLoading(false);
    }
  };

  // MERGED handleAddCommission and handleDispatch into one function
  const handleCommissionAndDispatch = async (productId) => {
    setIsLoading(true);
    setStatus(`Applying commission & dispatching Product #${productId}...`);
    
    // 🎬 Play truck animation
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // start from beginning
      videoRef.current.play();
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // This is the only contract call needed.
      const tx = await contract.distributorAddCommission(productId);
      await tx.wait();

      setStatus("Product listed for sale to retailers!");
      
      // ⏸ Pause video again after it finishes (video is 10s)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }, 10000);

      // Refresh the lists. The product will now "disappear"
      await fetchAllProducts(currentAccount);

    } catch (err) {
      console.error("Commission/Dispatch failed:", err);
      setStatus(`Failed: ${err.reason || "Check console."}`);
      
      // Stop video if transaction fails
      if (videoRef.current) {
        videoRef.current.pause();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // handleDispatch function removed as it was redundant.

  return (
    <div className="distributor-video-bg">
      <video
        ref={videoRef}
        src={dispatchVideo}
        autoPlay={false}
        muted
        playsInline
        preload="auto"
        className="truck-bg-video"
      />

      <div className="page-container distributor-portal">
        <div className="page-header">
          <h1>Distributor Dashboard</h1>
        </div>

        {currentAccount && (
          <div className="wallet-display">
            Connected: {`${currentAccount.substring(0, 6)}...${currentAccount.substring(38)}`}
          </div>
        )}

        {status && <p className="status-message">{status}</p>}

        {/* Products from Farmer */}
        <div className="product-list">
          <h3>Available Products from Farmers</h3>
          {!isLoading && availableProducts.length === 0 && <p>No products available for purchase.</p>}
          {availableProducts.map((product) => (
            <div key={product.id} className="action-card" style={{ borderColor: "#ff9800" }}>
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Crop:</strong> {product.cropType}</p>
              <p><strong>Price:</strong> {ethers.formatEther(product.currentPrice)} ETH</p>

              <button
                onClick={() => handlePurchase(product)}
                style={{ backgroundColor: "#ff9800" }}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Buy Product"}
              </button>
            </div>
          ))}
        </div>

        {/* Distributor-owned Products */}
        <div className="product-list">
          <h3>My Purchased Products</h3>
          {!isLoading && ownedProducts.length === 0 && <p>No owned products to process.</p>}
          {ownedProducts.map((product) => (
            <div key={product.id} className="action-card" style={{ borderColor: "#4caf50" }}>
              <p><strong>Product ID:</strong> {product.id}</p>
              <p><strong>Crop Type:</strong> {product.cropType}</p>
              <p><strong>Price:</strong> {ethers.formatEther(product.currentPrice)} ETH</p>

              {/* This is now the only button */}
              <button
                onClick={() => handleCommissionAndDispatch(product.id)}
                style={{ backgroundColor: "#ff9800" }}
                className="dispatch-btn" // Use dispatch-btn class for style
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Add Commission & Dispatch 🚚"}
              </button>
              
              {/* Removed the two separate buttons */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistributorUpdate;