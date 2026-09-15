import React, { useState } from 'react';
import { Shipment, QuickMetrics } from '../types';
import { StatCards } from './StatCards';
import { RiskCharts } from './RiskCharts';
import { ShipmentTable } from './ShipmentTable';
import { RiskMapNetwork } from './RiskMapNetwork';
import { 
  Table as TableIcon, 
  Map as MapIcon, 
  Sparkles, 
  Mic, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  SlidersHorizontal,
  Bot,
  Zap,
  Info,
  RefreshCw
} from 'lucide-react';

interface LiveDemoSectionProps {
  shipments: Shipment[];
  metrics: QuickMetrics;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenMitigateModal: (shipment: Shipment) => void;
  onOpenVoiceModal: () => void;
  onRefreshFeed: () => void;
  isRefreshing: boolean;
  isFullScreen: boolean;
  setIsFullScreen: (val: boolean) => void;
}

export const LiveDemoSection: React.FC<LiveDemoSectionProps> = ({
  shipments,
  metrics,
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
  onOpenMitigateModal,
  onOpenVoiceModal,
  onRefreshFeed,
  isRefreshing,
  isFullScreen,
  setIsFullScreen,
}) => {
  const [activeView, setActiveView] = useState<'table' | 'map'>('table');

  return (
    <section 
      id="live-demo" 
      className={`relative py-16 transition-all duration-300 ${
        isFullScreen 
          ? 'fixed inset-0 z-50 overflow-y-auto bg-[#0b1120] p-4 sm:p-6' 
          : 'bg-[#080d1a] border-t border-b border-slate-800/80'
      }`}
    >
      {/* Background radial accent */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full" />

      <div className={`relative mx-auto ${isFullScreen ? 'max-w-7xl' : 'max-w-7xl px-4 sm:px-6 lg:px-8'} space-y-6`}>
        
        {/* Section Header (Only shown when not full screen) */}
        {!isFullScreen && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-3">
              <Activity className="h-3.5 w-3.5" />
              Live Interactive Sandbox
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Test the Live S/4HANA <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Operations Console</span>
            </h2>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Experience the actual production dashboard in real time. Inspect flagged purchase orders, review Claude root-cause diagnostics, and trigger live SAP BAPI workflows.
            </p>
          </div>
        )}

        {/* Console Container Frame */}
        <div className="rounded-2xl border border-slate-700/80 bg-[#0c1322] shadow-2xl overflow-hidden ring-1 ring-white/10">
          
          {/* Top Mission Control Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#0f172a] px-4 py-3 gap-3">
            
            {/* System Status Indicators */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-xs font-bold text-white tracking-wide">
                  SAP S/4HANA SYSTEM: <span className="text-emerald-400">ONLINE</span>
                </span>
              </div>
              <span className="text-slate-600 hidden sm:inline">&bull;</span>
              <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
                CDS View: <span className="text-cyan-400 font-semibold">I_PurchaseOrderAPI01</span>
              </span>
              <span className="text-slate-600 hidden md:inline">&bull;</span>
              <span className="font-mono text-[11px] text-slate-400 hidden md:inline">
                Ping: <span className="text-emerald-400">{metrics.latencyMs}ms</span>
              </span>
            </div>

            {/* Top Right Quick Controls */}
            <div className="flex items-center gap-2">
              
              {/* Refresh Feed Button */}
              <button
                onClick={onRefreshFeed}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-all disabled:opacity-50"
                title="Sync S/4HANA Live Telemetry"
              >
                <RefreshCw className={`h-3.5 w-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Sync S/4HANA</span>
              </button>

              {/* Voice Trigger Button */}
              <button
                onClick={onOpenVoiceModal}
                className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-900/60 transition-all shadow-sm shadow-cyan-500/10"
              >
                <Mic className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                <span>Ask Voice AI</span>
              </button>

              {/* View Switcher: Table vs Corridor Map */}
              <div className="inline-flex rounded-lg border border-slate-700 bg-slate-800/90 p-0.5 text-xs">
                <button
                  onClick={() => setActiveView('table')}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all ${
                    activeView === 'table'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TableIcon className="h-3 w-3" />
                  <span className="text-[11px]">Table</span>
                </button>
                <button
                  onClick={() => setActiveView('map')}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-semibold transition-all ${
                    activeView === 'map'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapIcon className="h-3 w-3" />
                  <span className="text-[11px]">Corridor Map</span>
                </button>
              </div>

              {/* Maximize / Minimize Toggle */}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="rounded-lg border border-slate-700 bg-slate-800/80 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                title={isFullScreen ? 'Exit Full Screen' : 'Expand to Full Screen'}
              >
                {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>

            </div>

          </div>

          {/* Interactive Guide Strip / Judge Prompts */}
          <div className="border-b border-slate-800/60 bg-blue-950/20 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-blue-300">
              <Zap className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span className="font-semibold text-white">Interactive Hackathon Sandbox Guide:</span>
              <span className="text-slate-300 hidden md:inline">
                Click <strong>"View & Mitigate"</strong> on any row to trigger Claude's financial analysis & automated SAP BAPI dispatch.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded">
                Recommended test: SHP-9021 (TSMC)
              </span>
            </div>
          </div>

          {/* Inner Dashboard Body */}
          <div className="p-4 sm:p-6 space-y-6">
            
            {/* 1. Main Stat Cards */}
            <StatCards
              metrics={metrics}
              onFilterCritical={() => {
                setActiveFilter('critical');
                setActiveView('table');
              }}
            />

            {/* 2. ML Analytics & Forecasting Charts */}
            <RiskCharts />

            {/* 3. Interactive Shipment Table or Global Corridor Map */}
            {activeView === 'table' ? (
              <ShipmentTable
                shipments={shipments}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onOpenMitigateModal={onOpenMitigateModal}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            ) : (
              <RiskMapNetwork
                shipments={shipments}
                onSelectShipment={onOpenMitigateModal}
              />
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
