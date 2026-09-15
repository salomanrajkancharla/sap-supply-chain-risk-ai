import React, { useState } from 'react';
import { Shipment } from '../types';
import { ShieldAlert, AlertTriangle, CheckCircle2, Navigation, Anchor, Train, Truck, Plane } from 'lucide-react';

interface RiskMapNetworkProps {
  shipments: Shipment[];
  onSelectShipment: (shipment: Shipment) => void;
}

export const RiskMapNetwork: React.FC<RiskMapNetworkProps> = ({ shipments, onSelectShipment }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Approximate projection mapping for visual global routes
  // (simplified 1000x500 SVG coordinate space)
  const mapWidth = 980;
  const mapHeight = 460;

  const project = (lat: number, lng: number) => {
    // Mercator-like normalized mapping
    const x = ((lng + 180) / 360) * mapWidth;
    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = mapHeight / 2 - (mercN * mapHeight) / (2 * Math.PI) * 1.1 + 40;
    return { x: Math.max(30, Math.min(mapWidth - 30, x)), y: Math.max(30, Math.min(mapHeight - 30, y)) };
  };

  const activeShipment = shipments.find((s) => s.id === selectedId) || shipments[0];

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur-md shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Navigation className="h-4 w-4 text-blue-400" />
            Live Global Supply Chain Risk Corridors
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
              Live AIS / GPS Feeds
            </span>
          </h3>
          <p className="text-xs text-slate-400">
            Interactive routing network showing predicted disruption bottlenecks & shipment nodes
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-red-500/30 animate-ping"></span>
            Critical Risk Hub
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
            Medium Delay
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            Nominal Route
          </span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full overflow-x-auto rounded-lg border border-slate-800/80 bg-[#070d19]">
        <svg 
          viewBox={`0 0 ${mapWidth} ${mapHeight}`} 
          className="w-full min-w-[700px] h-[340px] select-none"
        >
          {/* Subtle Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <linearGradient id="criticalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0070f2" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="nominalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Simplified World Coastline Geometry (stylized continents) */}
          <g fill="rgba(30, 41, 59, 0.45)" stroke="rgba(71, 85, 105, 0.25)" strokeWidth="0.8">
            {/* North America */}
            <path d="M 120 80 Q 220 70 270 120 Q 290 170 230 220 Q 180 250 160 210 Q 130 180 100 130 Z" />
            {/* South America */}
            <path d="M 230 230 Q 300 270 270 360 Q 230 420 200 370 Q 190 280 230 230 Z" />
            {/* Europe */}
            <path d="M 460 90 Q 560 80 540 160 Q 480 180 440 140 Z" />
            {/* Africa */}
            <path d="M 460 170 Q 560 180 540 320 Q 480 370 440 280 Q 420 210 460 170 Z" />
            {/* Asia */}
            <path d="M 550 80 Q 750 60 840 140 Q 820 240 700 230 Q 600 220 550 140 Z" />
            {/* Australia */}
            <path d="M 750 280 Q 840 270 820 360 Q 740 370 750 280 Z" />
          </g>

          {/* Hotspot Risk Hazard Areas */}
          {/* 1. Taiwan Strait Typhoon zone */}
          <circle cx="780" cy="185" r="45" fill="rgba(239, 68, 68, 0.12)" stroke="rgba(239, 68, 68, 0.4)" strokeDasharray="3,3" />
          <text x="780" y="240" fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">
            Typhoon Zone (Gaemi)
          </text>

          {/* 2. Red Sea / Bab-el-Mandeb Geopolitical chokepoint */}
          <circle cx="585" cy="225" r="28" fill="rgba(245, 158, 11, 0.12)" stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="3,3" />
          <text x="585" y="265" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">
            Red Sea Chokepoint
          </text>

          {/* 3. Gulf Coast Rail Congestion */}
          <circle cx="215" cy="180" r="30" fill="rgba(239, 68, 68, 0.1)" stroke="rgba(239, 68, 68, 0.3)" strokeDasharray="3,3" />

          {/* Render Shipment Route Arcs */}
          {shipments.map((s) => {
            const orig = project(s.coordinates.origin[0], s.coordinates.origin[1]);
            const dest = project(s.coordinates.destination[0], s.coordinates.destination[1]);
            const curr = project(s.coordinates.current[0], s.coordinates.current[1]);

            const midX = (orig.x + dest.x) / 2;
            const midY = Math.min(orig.y, dest.y) - 35; // curved arc

            const isCritical = s.riskLevel === 'critical';
            const isMedium = s.riskLevel === 'medium';
            const strokeColor = isCritical ? '#ef4444' : isMedium ? '#f59e0b' : '#10b981';

            return (
              <g key={s.id} className="cursor-pointer group" onClick={() => {
                setSelectedId(s.id);
                onSelectShipment(s);
              }}>
                {/* Connecting Arc Path */}
                <path
                  d={`M ${orig.x} ${orig.y} Q ${midX} ${midY} ${dest.x} ${dest.y}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={selectedId === s.id ? 3 : 1.8}
                  strokeDasharray={isCritical ? '4,4' : 'none'}
                  opacity={selectedId === s.id ? 1 : 0.65}
                  className="transition-all duration-300"
                />

                {/* Origin Point */}
                <circle cx={orig.x} cy={orig.y} r="4" fill="#38bdf8" />

                {/* Destination Point */}
                <circle cx={dest.x} cy={dest.y} r="4" fill="#60a5fa" stroke="#ffffff" strokeWidth="1" />

                {/* Current Moving Telemetry Node with Ping Animation */}
                <circle 
                  cx={curr.x} 
                  cy={curr.y} 
                  r={isCritical ? 6 : 4.5} 
                  fill={strokeColor} 
                  className={isCritical ? 'animate-pulse' : ''}
                />
                {isCritical && (
                  <circle 
                    cx={curr.x} 
                    cy={curr.y} 
                    r="12" 
                    fill="none" 
                    stroke={strokeColor} 
                    strokeWidth="1.5" 
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Text Label */}
                <text 
                  x={curr.x + 8} 
                  y={curr.y - 6} 
                  fill="#f1f5f9" 
                  fontSize="10" 
                  fontFamily="monospace"
                  fontWeight="600"
                  className="drop-shadow-md"
                >
                  {s.id} ({s.predictedDelayDays > 0 ? `+${s.predictedDelayDays}d` : 'Nominal'})
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Quick Detail for selected corridor */}
        {activeShipment && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md rounded-lg border border-slate-700/80 bg-slate-900/90 p-3.5 backdrop-blur-md shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-400">{activeShipment.id}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                    activeShipment.riskLevel === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    activeShipment.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {activeShipment.riskLevel} Risk
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Delay: +{activeShipment.predictedDelayDays}d
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-slate-200 line-clamp-1">
                  {activeShipment.material}
                </p>
                <p className="text-[11px] text-slate-400">
                  Route: <span className="text-slate-300">{activeShipment.route}</span> | Driver: <span className="text-amber-300">{activeShipment.riskDriver}</span>
                </p>
              </div>

              <button
                onClick={() => onSelectShipment(activeShipment)}
                className="shrink-0 rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105"
              >
                View & Mitigate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
