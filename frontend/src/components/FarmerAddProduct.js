// src/components/FarmerAddProduct.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FarmerAddProduct.css";
import BlockchainBadge from "./BlockchainBadge";
import { contractABI, contractAddress } from "../utils/contractConfig";
import {
  enqueueProduct,
  getQueue,
  clearQueue,
} from "../utils/offlineQueue";
import {
  getBrowserProvider,
  requestAccountsSafe,
  getSignerOrNotify,
  requireNetwork,
} from "../utils/walletHelpers";
import { toast } from "react-toastify";

const FarmerAddProduct = () => {
  const [cropType, setCropType] = useState("");
  const [weight, setWeight] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [harvestDate, setHarvestDate] = useState(new Date());
  const [farmLocation, setFarmLocation] = useState("");
  const [status, setStatus] = useState("");
  const [addedProduct, setAddedProduct] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  // --- Initialize Wallet Connection ---
  useEffect(() => {
    const init = async () => {
      const provider = getBrowserProvider();
      if (!provider) {
        setStatus("MetaMask not available.");
        return;
      }
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts && accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        }
      } catch (e) {
        // ignore
      }
      if (window.ethereum && window.ethereum.on) {
        window.ethereum.on("accountsChanged", (accs) => {
          setCurrentAccount(accs[0] || null);
          setAddedProduct(null);
        });
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      }
    };
    init();
  }, []);

  // --- Sync Offline Queue ---
  useEffect(() => {
    const syncQueue = async () => {
      const pending = await getQueue();
      if (!pending.length) return;
      const provider = getBrowserProvider();
      if (!provider) return;
      const accounts = await requestAccountsSafe();
      if (!accounts) return;
      try {
        const signer = await getSignerOrNotify();
        if (!signer) return;
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        for (const item of pending) {
          try {
            const tx = await contract.createProduct(
              item.payload.cropType,
              parseInt(item.payload.weight, 10),
              ethers.parseEther(item.payload.pricePerKg.toString()),
              item.payload.batchNo,
              new Date(item.payload.harvestDate).toLocaleDateString("en-GB"),
              item.payload.farmLocation,
              `Batch:${item.payload.batchNo}`
            );
            await tx.wait();
            toast.success(
              `Queued product ${item.payload.batchNo} synced on-chain.`
            );
          } catch (err) {
            console.warn("Queued resubmit failed:", err);
          }
        }
        await clearQueue();
      } catch (err) {
        console.error("syncQueue error:", err);
      }
    };

    window.addEventListener("online", syncQueue);
    syncQueue();
    return () => window.removeEventListener("online", syncQueue);
  }, []);

  // --- Wallet Connection ---
  const requestConnect = async () => {
    const accounts = await requestAccountsSafe();
    if (accounts && accounts.length) {
      setCurrentAccount(accounts[0]);
      toast.success("Wallet connected.");
    }
    return accounts;
  };

  // --- Submit Product ---
  const submitProduct = async () => {
    if (!cropType || !weight || !pricePerKg || !batchNo || !farmLocation) {
      toast.warn("Please fill all fields.");
      return;
    }

    // ✅ Ensure positive values
    if (weight <= 0 || pricePerKg <= 0) {
      toast.error("Weight and price must be positive values!");
      return;
    }

    if (!currentAccount) {
      const accs = await requestConnect();
      if (!accs) return;
    }

    setIsLoading(true);
    setAddedProduct(null);
    setTxHash(null);
    setStatus("Submitting product...");

    try {
      if (!navigator.onLine) {
        await enqueueProduct({
          cropType,
          weight,
          pricePerKg,
          batchNo,
          harvestDate: harvestDate.toISOString(),
          farmLocation,
        });
        setStatus("You are offline — queued for sync when online.");
        toast.info("Product queued (offline). Will sync when online.");
        setIsLoading(false);
        return;
      }

      const signer = await getSignerOrNotify();
      if (!signer) {
        setIsLoading(false);
        return;
      }

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.createProduct(
        cropType,
        parseInt(weight, 10),
        ethers.parseEther(pricePerKg.toString()),
        batchNo,
        harvestDate.toLocaleDateString("en-GB"),
        farmLocation,
        `Batch:${batchNo}`
      );

      toast.info("Transaction submitted. Awaiting confirmation...");
      const receipt = await tx.wait();
      setTxHash(receipt.transactionHash || receipt.hash || null);

      let newProductId = null;
      try {
        const createdEvent = receipt.logs
          .map((log) => {
            try {
              return contract.interface.parseLog(log);
            } catch {
              return null;
            }
          })
          .find((ev) => ev && ev.name === "ProductCreated");
        if (createdEvent && createdEvent.args && createdEvent.args.id) {
          newProductId = createdEvent.args.id.toString();
        }
      } catch {
        // ignore
      }

      setIsLoading(false);
      if (newProductId) {
        setAddedProduct({
          id: newProductId,
          name: cropType,
          price: (parseFloat(pricePerKg) * parseFloat(weight)).toFixed(4),
        });
        toast.success(`Product registered (ID #${newProductId}).`);
        setStatus(`Product registered (ID #${newProductId}).`);
      } else {
        toast.success("Product registered on-chain.");
        setStatus("Product registered on-chain.");
      }
    } catch (err) {
      console.error("submitProduct error:", err);
      await enqueueProduct({
        cropType,
        weight,
        pricePerKg,
        batchNo,
        harvestDate: harvestDate.toISOString(),
        farmLocation,
      });
      toast.error("Transaction failed — product queued for retry.");
      setStatus("Transaction failed — queued locally for retry.");
      setIsLoading(false);
    }
  };

  const viewOnExplorer = (hash) => {
    if (!hash) return;
    window.open(`https://etherscan.io/tx/${hash}`, "_blank");
  };

  return (
    <div className="farmer-dashboard-bg">
      <div className="page-container">
        <div className="page-header">
          <h1>FARMER PORTAL</h1>
        </div>

        {currentAccount ? (
          <div className="wallet-display">
            Connected:{" "}
            {`${currentAccount.substring(0, 6)}...${currentAccount.substring(38)}`}
          </div>
        ) : (
          <div style={{ marginBottom: 12 }}>
            <button className="btn btn-primary" onClick={requestConnect}>
              Connect Wallet
            </button>
          </div>
        )}

        <div className="action-card">
          <h2 style={{ marginTop: 0 }}>Add a New Product</h2>

          <input
            type="text"
            placeholder="Crop Type (e.g., Rice, Wheat)"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
          />

          {/* ✅ Positive Weight Validation */}
          <input
            type="number"
            placeholder="Weight (Kg)"
            value={weight}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (Number(value) > 0 && Number.isFinite(Number(value)))
              ) {
                setWeight(value);
              } else {
                toast.warn("Weight must be a positive number!");
              }
            }}
            min="1"
            step="0.01"
          />

          {/* ✅ Positive Price Validation */}
          <input
            type="number"
            placeholder="Price per Kg (in ETH)"
            value={pricePerKg}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (Number(value) > 0 && Number.isFinite(Number(value)))
              ) {
                setPricePerKg(value);
              } else {
                toast.warn("Price must be a positive number!");
              }
            }}
            min="0.0001"
            step="0.0001"
          />

          <input
            type="text"
            placeholder="Batch Number"
            value={batchNo}
            onChange={(e) => setBatchNo(e.target.value)}
          />

          <DatePicker
            className="date-picker"
            selected={harvestDate}
            onChange={(d) => setHarvestDate(d)}
          />

          <input
            type="text"
            placeholder="Farm Location (e.g., 17.38, 78.48)"
            value={farmLocation}
            onChange={(e) => setFarmLocation(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={submitProduct}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Register Product"}
          </button>

          {status && <div className="status-message">{status}</div>}
        </div>

        {addedProduct && (
          <div className="success-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 6px 0" }}>Product Registered</h3>
                <div style={{ fontWeight: 700 }}>
                  #{addedProduct.id} — {addedProduct.name}
                </div>
                <div style={{ color: "var(--muted-ink)" }}>
                  Total Price: {addedProduct.price} ETH
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <BlockchainBadge
                  verified={!!txHash}
                  txHash={txHash}
                  onView={viewOnExplorer}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerAddProduct;
