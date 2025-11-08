// src/components/BlockchainBadge.jsx
import React from 'react';
import './_blockchain-badge.css'; // We'll embed small CSS here

const shortHash = (h='') => h ? `${h.slice(0,6)}...${h.slice(-6)}` : '—';

export default function BlockchainBadge({ verified=false, txHash=null, onView }) {
  return (
    <div className={`chain-badge ${verified ? 'verified' : 'pending'}`}>
      <div className="chain-icon" title={ verified ? "Verified on Blockchain" : "Pending verification" }>
        ⛓
      </div>
      <div className="chain-meta">
        <div className="chain-title">{verified ? 'Verified' : 'Pending'}</div>
        {txHash && <button className="chain-link" onClick={() => onView && onView(txHash)}>{shortHash(txHash)}</button>}
      </div>
    </div>
  );
}
