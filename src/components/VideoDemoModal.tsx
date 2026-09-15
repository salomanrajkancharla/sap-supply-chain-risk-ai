import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldAlert, 
  Bot, 
  Send, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Activity,
  ArrowRight,
  Radio,
  ExternalLink
} from 'lucide-react';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveSandbox: () => void;
}

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({
  isOpen,
  onClose,
  onOpenLiveSandbox,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  const scenes = [
    {
      time: '0:00 - 0:35',
      title: 'Phase 1: Satellite & Weather Anomaly Detection',
      tag: 'NOAA Satellite + MarineTraffic AIS',
      headline: 'Typhoon Gaemi (Category 4) strikes Taiwan shipping corridors',
      description: 'The engine ingests real-time sea buoy data and vessel tracking. Container ship Evergreen Triumph carrying TSMC microconductors is delayed outside Kaohsiung anchorage by severe wind shear and berth closures.',
      visualBadge: 'Real-Time Anomaly Ingestion',
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
      dataMetrics: [
        { label: 'Wind Velocity', val: '135 km/h' },
        { label: 'Port Berth Wait', val: '+96 Hours' },
        { label: 'Affected Vessels', val: '42 Cargo Ships' },
        { label: 'SAP PO Impacted', val: 'PO #45008921' }
      ]
    },
    {
      time: '0:35 - 1:10',
      title: 'Phase 2: LightGBM Early Warning Forecast',
      tag: '7–14 Day Predictive Horizon',
      headline: 'ML model forecasts +8 days delay slip 12 days before factory delivery',
      description: 'While traditional SAP ERP would remain silent until the missed delivery date, LightGBM models predict an 8-day arrival slip with 94.2% confidence. The engine flags this consignment as CRITICAL.',
      visualBadge: 'ML Prediction Confirmed',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
      dataMetrics: [
        { label: 'Risk Score', val: '94.2% Critical' },
        { label: 'Predicted Slip', val: '+8 Days' },
        { label: 'Factory Buffer', val: '3 Days Remaining' },
        { label: 'Deficit Horizon', val: 'Day 4 Stoppage' }
      ]
    },
    {
      time: '1:10 - 1:55',
      title: 'Phase 3: Claude Business Analyst Financial Modeling',
      tag: 'Cognitive LLM Synthesis',
      headline: 'Claude evaluates $1,240,000 idle plant downtime vs $42,000 expedited air freight',
      description: 'Claude 3.5 Sonnet analyzes the Munich GigaPlant bill-of-materials. It determines that without these microconductors, final vehicle assembly lines halt on Day 4, costing $340,000 per idle shift. Net exposure: $1.24M.',
      visualBadge: 'Cost of Inaction Modeled',
      badgeColor: 'text-red-400 border-red-500/30 bg-red-950/40',
      dataMetrics: [
        { label: 'Assembly Stoppage', val: '$850,000' },
        { label: 'OEM SLA Penalties', val: '$220,000' },
        { label: 'Carrying Costs', val: '$170,000' },
        { label: 'Net Exposure', val: '$1,240,000' }
      ]
    },
    {
      time: '1:55 - 2:35',
      title: 'Phase 4: Autonomous Strategy Formulation',
      tag: 'Ranked Mitigation Options',
      headline: 'Claude formulates 3 distinct solutions with exact cost/delay trade-offs',
      description: 'Option A: Expedite 40% batch via China Airlines Cargo flight CI-061. Option B: Source secondary stock from NXP Singapore. Option C: Reschedule plant shift. Option A is recommended with +2,852% net ROI.',
      visualBadge: 'Trade-off Equations Synthesized',
      badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-950/40',
      dataMetrics: [
        { label: 'Air Freight Cost', val: '$42,000' },
        { label: 'Delay Recovered', val: '6 Days Saved' },
        { label: 'Factory Buffer', val: 'Line Halts Averted' },
        { label: 'Net ROI', val: '+2,852%' }
      ]
    },
    {
      time: '2:35 - 3:00',
      title: 'Phase 5: One-Click Closed-Loop SAP BAPI Execution',
      tag: 'Autonomous ERP Commit',
      headline: 'S/4HANA BAPI_PO_CHANGE executed and EDI 850 dispatched to TSMC',
      description: 'With one click or autonomous rule, the engine commits changes directly to SAP S/4HANA. It reserves air freight in SAP TM, updates plant MRP buffers, and issues EDI purchase order updates to TSMC. IDoc Confirmed: SAP-WF-2026-9021.',
      visualBadge: 'S/4HANA IDoc Issued',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      dataMetrics: [
        { label: 'SAP Function', val: 'BAPI_PO_CHANGE' },
        { label: 'EDI Standard', val: 'EDI 850 / 855' },
        { label: 'Resolution MTTR', val: '4.2 Hours' },
        { label: 'SAP Document ID', val: 'SAP-WF-2026-9021' }
      ]
    }
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          setCurrentSceneIndex((curr) => (curr + 1) % scenes.length);
          return 0;
        }
        return prev + 2.5; // ~4 seconds per scene
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, scenes.length]);

  if (!isOpen) return null;

  const currentScene = scenes[currentSceneIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0c1322] text-slate-100 shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#0f172a] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
              <Play className="h-5 w-5 fill-white ml-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  3-Minute Interactive Product Walkthrough
                </h3>
                <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-blue-500/30">
                  SAP Disruption Scenario
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Case Study: TSMC 7nm Microconductors (PO #45008921)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top Scene Timeline Pill Navigation */}
          <div className="grid grid-cols-5 gap-1.5 rounded-xl bg-slate-900/80 p-1.5 border border-slate-800">
            {scenes.map((s, idx) => {
              const isSelected = currentSceneIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSceneIndex(idx);
                    setProgressPercent(0);
                  }}
                  className={`rounded-lg py-2 px-2 text-center transition-all text-xs ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="block text-[10px] font-mono opacity-70">Phase 0{idx + 1}</span>
                  <span className="truncate block font-semibold text-[11px]">
                    {idx === 0 ? 'Satellite' : idx === 1 ? 'ML Forecast' : idx === 2 ? 'Claude ROI' : idx === 3 ? 'Strategies' : 'SAP Commit'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scene Stage Box */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-[#0e172a] to-[#070b14] p-6 shadow-2xl relative overflow-hidden">
            
            {/* Top Stage Indicators */}
            <div className="flex items-center justify-between mb-4 text-xs font-mono">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${currentScene.badgeColor}`}>
                <Activity className="h-3.5 w-3.5" />
                {currentScene.visualBadge}
              </span>

              <div className="flex items-center gap-2 text-slate-400">
                <span>Timestamp: {currentScene.time}</span>
                <span>&bull;</span>
                <span className="text-cyan-400 font-bold">Scene {currentSceneIndex + 1} of 5</span>
              </div>
            </div>

            {/* Scene Headline */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-3">
              {currentScene.headline}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-900/70 p-4 rounded-xl border border-slate-800/80">
              {currentScene.description}
            </p>

            {/* Live Scenario Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentScene.dataMetrics.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">
                    {item.label}
                  </span>
                  <span className="font-mono text-sm sm:text-base font-bold text-cyan-300 block mt-0.5">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Animated Progress Bar for Scene Auto-Advance */}
            <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-[#0f172a] px-6 py-4">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentSceneIndex(0);
                setProgressPercent(0);
              }}
              className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white transition-colors"
              title="Restart Walkthrough"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => {
                setCurrentSceneIndex((prev) => Math.max(0, prev - 1));
                setProgressPercent(0);
              }}
              disabled={currentSceneIndex === 0}
              className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => {
                setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
                setProgressPercent(0);
              }}
              className="rounded-lg border border-slate-700 bg-slate-800 p-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenLiveSandbox();
              }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-400 transition-all hover:scale-105"
            >
              <span>Try Live in Sandbox</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
