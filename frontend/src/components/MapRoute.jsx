// src/components/MapRoute.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// fix default icon path for many bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl:        require('leaflet/dist/images/marker-icon.png'),
  shadowUrl:      require('leaflet/dist/images/marker-shadow.png'),
});

export default function MapRoute({ points = [] }) {
  // points: [{lat, lng, label, verified, txHash}]
  const center = points.length ? [points[0].lat, points[0].lng] : [20.5937, 78.9629]; // India fallback

  return (
    <div style={{ height: 360, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
      <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p, idx) => (
          <Marker key={idx} position={[p.lat, p.lng]}>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <strong>{p.label}</strong>
                <div style={{ fontSize: 12, color: 'var(--muted-ink)' }}>
                  {p.verified ? 'Verified on-chain' : 'Not verified'}
                </div>
                {p.txHash && <div style={{ marginTop: 6 }}>
                  <a href={`https://etherscan.io/tx/${p.txHash}`} target="_blank" rel="noreferrer">View TX</a>
                </div>}
              </div>
            </Popup>
          </Marker>
        ))}
        {points.length > 1 && (
          <Polyline positions={points.map(p => [p.lat, p.lng])} pathOptions={{ color: 'var(--accent)', weight: 4, opacity: 0.9 }} />
        )}
      </MapContainer>
    </div>
  );
}
