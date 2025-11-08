// src/components/Notifier.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Put <Notifier /> once in App.js (near root). Use toast() anywhere:
 * import { toast } from 'react-toastify';
 * toast.error("Something went wrong");
 */

export default function Notifier() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
    />
  );
}
