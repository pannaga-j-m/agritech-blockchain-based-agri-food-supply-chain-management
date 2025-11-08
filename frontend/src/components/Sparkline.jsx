// src/components/Sparkline.jsx
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Sparkline({ data = [0,1,2,1,3] }) {
  const chartData = data.map((v, i) => ({ x: i, y: v }));
  return (
    <div style={{ width: 120, height: 36 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="y" stroke="var(--accent)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
