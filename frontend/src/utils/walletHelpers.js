// src/utils/walletHelpers.js
import { ethers } from "ethers";
import { toast } from "react-toastify";

/**
 * Central helpers:
 * - getBrowserProvider(): returns ethers.BrowserProvider or null and notifies user
 * - getSignerOrNotify(): returns signer or null
 * - requestAccountsSafe(): request accounts with graceful messages
 * - requireNetwork(chainIdHex, friendlyName): optional network check
 */

export function getBrowserProvider() {
  if (!window.ethereum) {
    toast.error("MetaMask (or another web3 wallet) not detected. Install MetaMask to continue.");
    return null;
  }
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  } catch (err) {
    console.error("Provider init failed:", err);
    toast.error("Failed to initialize provider.");
    return null;
  }
}

export async function requestAccountsSafe() {
  if (!window.ethereum) {
    toast.error("MetaMask not found.");
    return null;
  }
  try {
    // Only request once; handle pending/rejected states are surfaced by wallet
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts || accounts.length === 0) {
      toast.warn("No accounts available in wallet.");
      return null;
    }
    return accounts;
  } catch (err) {
    // user rejected or other error
    if (err?.code === 4001 || err?.message?.toLowerCase().includes("user rejected")) {
      toast.warn("Wallet connection request was rejected.");
    } else if (err?.message?.toLowerCase().includes("already pending")) {
      toast.info("Wallet request already pending. Please complete it in MetaMask.");
    } else {
      toast.error("Failed to connect wallet.");
      console.error("requestAccountsSafe error:", err);
    }
    return null;
  }
}

export async function getSignerOrNotify() {
  const provider = getBrowserProvider();
  if (!provider) return null;
  try {
    // ethers.js BrowserProvider#getSigner is async in v6
    const signer = await provider.getSigner();
    return signer;
  } catch (err) {
    console.error("getSignerOrNotify failed:", err);
    toast.error("Please connect your wallet in MetaMask.");
    return null;
  }
}

/**
 * Optional network check. Provide chainId in hex like "0x5" for Goerli/Seopolia? (use correct chain)
 */
export async function requireNetwork(expectedChainIdHex, friendlyName = "") {
  if (!window.ethereum) return false;
  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (expectedChainIdHex && chainId !== expectedChainIdHex) {
      toast.warn(`Please switch your wallet network to ${friendlyName || expectedChainIdHex}.`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("requireNetwork error:", err);
    return false;
  }
}
