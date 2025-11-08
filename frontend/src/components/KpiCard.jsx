// src/components/KpiCard.jsx
import React from "react";
import './_kpi-card.css';
import BlockchainBadge from "./BlockchainBadge";
import { motion } from 'framer-motion';
import Sparkline from "./Sparkline";

export default function KpiCard({ title, value, sub, verified=false, txHash=null, trend=[] }) {
  return (
    <motion.div
      className="card micro-lift kpi-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <div>
          <div style={{fontSize:12, color:'var(--muted-ink)', fontWeight:700}}>{title}</div>
          <div style={{fontSize:22, fontWeight:800, marginTop:6}}>{value}</div>
          {sub && <div style={{fontSize:12, color:'var(--muted-ink)'}}>{sub}</div>}
        </div>
        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8}}>
          <Sparkline data={trend} />
          <BlockchainBadge verified={verified} txHash={txHash} />
        </div>
      </div>
    </motion.div>
  )
}
