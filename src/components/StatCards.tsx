import React from 'react';
import { 
  HeartPulse, 
  AlertTriangle, 
  Award, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap,
  ShieldCheck
} from 'lucide-react';
import { QuickMetrics } from '../types';

interface StatCardsProps {
  metrics: QuickMetrics;
  onFilterCritical: () => void;
}

export const StatCards: React.FC<StatCardsProps> = ({ metrics, onFilterCritical }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* 1. Overall Supply Chain Health Score */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md transition-all hover:border-slate-700/80 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Supply Chain Health
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <HeartPulse className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-mono text-3xl font-extrabold text-white">
            {metrics.healthScore}%
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3 w-3" /> Nominal
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 transition-all duration-500" 
            style={{ width: `${metrics.healthScore}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center text-emerald-400 font-medium gap-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" /> +2.4% vs last week
          </span>
          <span className="text-[11px] text-slate-500">Threshold: &gt;75%</span>
        </div>
      </div>

      {/* 2. Critical Delay Warnings */}
      <div 
        onClick={onFilterCritical}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-red-500/30 bg-gradient-to-b from-red-950/20 to-slate-900/70 p-5 backdrop-blur-md transition-all hover:border-red-500/60 shadow-lg hover:shadow-red-500/10"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-300">
            Critical Delay Warnings
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 group-hover:scale-110 transition-transform">
            <AlertTriangle className="h-4 w-4 animate-pulse" />
          </div>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-mono text-3xl font-extrabold text-red-400">
            {metrics.highRiskAlerts} Active
          </span>
          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-300 border border-red-500/40">
            Immediate Action
          </span>
        </div>

        {/* Secondary metric note */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-red-500 w-3/4 animate-pulse" />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="text-red-400 font-medium">
            $1.81M Exposure
          </span>
          <span className="text-[11px] text-slate-400 group-hover:text-red-300 transition-colors flex items-center gap-1">
            Filter View &rarr;
          </span>
        </div>
      </div>

      {/* 3. Supplier Performance Index */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md transition-all hover:border-slate-700/80 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Supplier Performance
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Award className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-mono text-3xl font-extrabold text-white">
            {metrics.supplierPerformanceIndex}%
          </span>
          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
            Tier-1 Global
          </span>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" 
            style={{ width: `${metrics.supplierPerformanceIndex}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center text-blue-400 font-medium gap-0.5">
            <ArrowUpRight className="h-3.5 w-3.5" /> 98.4% SLA Target
          </span>
          <span className="text-[11px] text-slate-500">142 Vendors Evaluated</span>
        </div>
      </div>

      {/* 4. Mean Time to Resolution */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md transition-all hover:border-slate-700/80 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Mean Time To Resolution
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Clock className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-mono text-3xl font-extrabold text-white">
            {metrics.meanTimeToResolutionHours} <span className="text-xl font-medium text-slate-400">hrs</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/20">
            <Zap className="h-3 w-3" /> -38% vs Manual
          </span>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 w-4/5" />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center text-purple-400 font-medium gap-0.5">
            <ArrowDownRight className="h-3.5 w-3.5" /> Auto-SAP Trigger
          </span>
          <span className="text-[11px] text-slate-500">Prev. Avg: 6.8h</span>
        </div>
      </div>

    </div>
  );
};
