import { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/contractConfig";
import "./Portal.css";
import "./ConsumerView.css";
import trackingIllustration from "../assets/Location tracking-rafiki.svg"; // ✅ Add your SVG path

const ConsumerView = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("");

  const fetchProduct = async () => {
    if (!productId) return;
    if (!window.ethereum) return alert("Please install MetaMask to track products.");

    setStatus("Fetching product details...");
    setProduct(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const [details, history, priceHistory] = await Promise.all([
        contract.getProductDetails(productId),
        contract.getProductHistory(productId),
        contract.getProductPriceHistory(productId),
      ]);

      if (details && Number(details[0]) > 0) {
        const productDetails = {
          id: details[0],
          cropType: details[1],
          weightInKg: details[2],
          currentPrice: details[3],
          batchNo: details[4],
          harvestDate: details[5],
          farmLocation: details[6],
          owner: details[7],
          state: details[8],
        };

        setProduct({
          ...productDetails,
          history,
          priceHistory,
        });
        setStatus("");
      } else {
        setProduct(null);
        setStatus(`Product with ID #${productId} not found.`);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setStatus("An error occurred while fetching the product.");
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp || Number(timestamp) === 0) return "N/A";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
  };

  const getStateString = (stateNum) => {
    return ["Created", "In Transit", "On Sale"][stateNum] || "Unknown";
  };

  return (
    <div className="consumer-wrapper">
      <div className="consumer-card">
        {/* Left: Product Tracking Section */}
        <div className="tracking-section">
          <h2>Track Your Product</h2>
          <div className="track-input">
            <input
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <button onClick={fetchProduct}>Track</button>
          </div>

          {status && <p className="status-message">{status}</p>}

          {product && (
            <div className="product-info">
              <h3>Product #{Number(product.id)}</h3>
              <p><strong>Crop Type:</strong> {product.cropType}</p>
              <p><strong>Batch No:</strong> {product.batchNo}</p>
              <p><strong>Weight:</strong> {Number(product.weightInKg)} kg</p>
              <p><strong>Harvest Date:</strong> {product.harvestDate}</p>
              <p><strong>Farm Location:</strong> {product.farmLocation}</p>
              <p><strong>Status:</strong> {getStateString(product.state)}</p>
              <p><strong>Final Price:</strong> {product.currentPrice ? ethers.formatEther(product.currentPrice) : "N/A"} ETH</p>

              <hr />
              <h4>Price History</h4>
              <ul className="price-history">
                {product.priceHistory.map((event, index) => {
                  const weight = Number(product.weightInKg);
                  const totalPrice = parseFloat(ethers.formatEther(event.price));
                  const pricePerKg = weight > 0 ? (totalPrice / weight).toFixed(4) : 0;
                  return (
                    <li key={index}>
                      <strong>{event.actor}'s Total Price: {totalPrice.toFixed(4)} ETH</strong>
                      <p>Price per kg: {pricePerKg} ETH</p>
                      <span>Date: {formatTimestamp(event.timestamp)}</span>
                    </li>
                  );
                })}
              </ul>

              <hr />
              <h4>Transaction History</h4>
              <ul className="transaction-history">
                {product.history.map((event, index) => (
                  <li key={index}>
                    <strong>{event.eventDescription}</strong>
                    <br />
                    <span>Date: {formatTimestamp(event.timestamp)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: SVG Illustration */}
        <div className="illustration-section">
          <img src={trackingIllustration} alt="Tracking Illustration" />
        </div>
      </div>
    </div>
  );
};

export default ConsumerView;
