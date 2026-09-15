import React from 'react';
import { 
  Activity, 
  Mic, 
  ShieldAlert, 
  Layers, 
  TrendingUp, 
  Radio, 
  CheckCircle2, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { QuickMetrics } from '../types';

interface TopNavProps {
  metrics: QuickMetrics;
  onOpenVoiceModal: () => void;
  isVoiceActive: boolean;
  onRefreshFeed: () => void;
  isRefreshing: boolean;
  activeFilter: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  metrics,
  onOpenVoiceModal,
  isVoiceActive,
  onRefreshFeed,
  isRefreshing,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0f172a]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo & SAP Connection */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 shadow-lg shadow-blue-500/20 ring-1 ring-blue-400/30">
              <span className="font-mono text-sm font-extrabold tracking-tight text-white">SAP</span>
              {/* Active Pulse Indicator */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#0f172a] bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  RiskEngine <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">AI</span>
                </h1>
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                  v4.8 S/4HANA
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Predictive Disruption Mitigation Platform
              </p>
            </div>
          </div>

          {/* System Status Pill */}
          <div className="hidden lg:flex items-center gap-2.5 rounded-full border border-slate-700/60 bg-slate-900/80 px-3.5 py-1.5 shadow-inner">
            <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">
              {metrics.connectedSystem}
            </span>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="text-slate-500">Latency:</span>
              <span className="font-mono font-semibold text-emerald-400">{metrics.latencyMs}ms</span>
            </div>
            <button 
              onClick={onRefreshFeed}
              title="Poll latest SAP S/4HANA CDS Views"
              className="ml-1 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Center / Right Section: Voice Command & Quick Metrics */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* Voice Command Bar: Glowing "Ask AI" microphone button */}
          <button
            id="voice-command-trigger-btn"
            onClick={onOpenVoiceModal}
            className={`group relative flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 shadow-md ${
              isVoiceActive
                ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white ring-4 ring-amber-500/30 animate-pulse'
                : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 ring-2 ring-blue-400/30 shadow-blue-500/20 hover:shadow-blue-500/40'
            }`}
          >
            <div className="relative">
              <Mic className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
            </div>
            <span className="tracking-wide">Ask AI (Voice)</span>
            <span className="rounded bg-black/25 px-1.5 py-0.5 font-mono text-[10px] text-blue-100">
              Ctrl+K
            </span>
          </button>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Total Shipments */}
            <div className="hidden sm:flex flex-col rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-right">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1 justify-end">
                <Layers className="h-3 w-3 text-slate-400" /> Active Shipments
              </span>
              <span className="font-mono text-sm font-bold text-slate-100">
                {metrics.totalActiveShipments.toLocaleString()}
              </span>
            </div>

            {/* High Risk Alerts */}
            <div className="flex flex-col rounded-lg border border-red-500/30 bg-red-950/30 px-3 py-1.5 text-right">
              <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1 justify-end">
                <ShieldAlert className="h-3 w-3 text-red-400 animate-pulse" /> Critical Alerts
              </span>
              <span className="font-mono text-sm font-bold text-red-400">
                {metrics.highRiskAlerts} Active
              </span>
            </div>

            {/* Est Prevented Losses */}
            <div className="hidden md:flex flex-col rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-3 py-1.5 text-right">
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1 justify-end">
                <TrendingUp className="h-3 w-3 text-emerald-400" /> Losses Prevented
              </span>
              <span className="font-mono text-sm font-bold text-emerald-300">
                ${metrics.preventedLossesMillions}M
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
