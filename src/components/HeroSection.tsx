import React from 'react';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  Bot, 
  Mic, 
  Activity, 
  Compass, 
  Zap, 
  Layers,
  AlertTriangle
} from 'lucide-react';

interface HeroSectionProps {
  onScrollToDemo: () => void;
  onOpenVideoDemo: () => void;
  onOpenVoiceModal: () => void;
  onQuickInspectTSMC: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToDemo,
  onOpenVideoDemo,
  onOpenVoiceModal,
  onQuickInspectTSMC,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Glows & Ambient Mesh */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 blur-[130px] rounded-full opacity-60" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 -left-40 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full" />
      
      {/* Subtle Grid overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hackathon Top Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1.5 backdrop-blur-md shadow-lg shadow-blue-500/10">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-blue-200">
              SAP Global Hackathon 2026 Project
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs font-bold text-cyan-400 font-mono">
              AI & Autonomous ERP Track
            </span>
          </div>
        </div>

        {/* Big Bold Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Prevent <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">$2M+</span> in Supply Chain Losses with AI
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            An autonomous early-warning risk engine built for SAP S/4HANA that predicts shipping disruptions 7–14 days in advance, reasons root causes with Claude, and triggers automated supplier workflows before assembly lines halt.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            {/* Primary CTA */}
            <button
              onClick={onScrollToDemo}
              className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:shadow-cyan-500/40 hover:scale-[1.02]"
            >
              <span>View Live Demo</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onOpenVideoDemo}
              className="group flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 shadow-lg backdrop-blur-sm hover:border-slate-500 hover:bg-slate-800 hover:text-white transition-all"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Play className="h-2.5 w-2.5 ml-0.5" />
              </div>
              <span>Watch 3-Min Walkthrough</span>
            </button>

            {/* Voice Pill CTA */}
            <button
              onClick={onOpenVoiceModal}
              className="group flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-5 py-3.5 text-sm font-medium text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/30 transition-all"
            >
              <Mic className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span>Ask Voice Assistant</span>
            </button>
          </div>

          {/* Live System Signal Strip */}
          <div className="pt-3 flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              S/4HANA OData v4: Connected
            </span>
            <span>&bull;</span>
            <span className="text-slate-300">LightGBM Model Latency: 14ms</span>
            <span>&bull;</span>
            <span className="text-cyan-400">Claude 3.5 Sonnet: Ready</span>
          </div>

        </div>

        {/* Hero Interactive Teaser Component / Dashboard Glow Card */}
        <div className="mt-12 lg:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-slate-700/70 bg-gradient-to-b from-slate-900/90 to-[#0c1322] p-2 sm:p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
            
            {/* Top Chrome Header Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 px-3 py-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
                <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
                <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 font-mono text-[11px] text-slate-300">
                  sap-risk-engine-console &bull; Production S/4HANA CDS Link
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-emerald-400 flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Live AIS Feed
                </span>
                <span className="hidden sm:inline text-slate-500">|</span>
                <span className="text-cyan-400 hidden sm:inline">1,240 Shipments Active</span>
              </div>
            </div>

            {/* Teaser Content Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: Live High-Risk Consignment Spotlight */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-red-500/10 border border-red-500/30 px-2.5 py-1 text-xs font-mono font-bold text-red-400">
                    <ShieldAlert className="h-3.5 w-3.5" /> CRITICAL DISRUPTION DETECTED
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Lead Time: <strong className="text-white">+8 Days Ahead</strong>
                  </span>
                </div>

                <div className="rounded-xl border border-red-900/30 bg-red-950/20 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">PO #45008921</span>
                        <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-mono text-blue-300">
                          SHP-9021
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-100 mt-1">
                        TSMC 7nm Microconductor IC Wafers
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Kaohsiung Port &rarr; Munich GigaPlant (Maritime Route)
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Financial Exposure</span>
                      <span className="text-lg font-mono font-extrabold text-red-400">$1,240,000</span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <div className="rounded bg-slate-900/80 p-2 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Anomaly Trigger</span>
                      <span className="font-bold text-amber-400">Typhoon Gaemi (Cat 4)</span>
                    </div>
                    <div className="rounded bg-slate-900/80 p-2 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Predicted Delay</span>
                      <span className="font-bold text-red-400">+8 Days Slip</span>
                    </div>
                    <div className="rounded bg-slate-900/80 p-2 border border-slate-800 col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 block">Factory Buffer</span>
                      <span className="font-bold text-red-300">3 Days Remaining</span>
                    </div>
                  </div>

                  {/* Claude Business Analyst Quote */}
                  <div className="mt-3 rounded-lg border border-blue-900/40 bg-blue-950/30 p-3 text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="h-3.5 w-3.5 text-cyan-400" />
                      <span className="font-bold text-cyan-300">Claude Analyst Resolution Recommendation:</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      "Factory line halts on Day 4 without emergency air cargo rerouting. Reroute 40% batch via China Airlines Cargo flight CI-061. Cost: $42,000 vs. $1,240,000 in idle plant downtime. Net ROI: <strong>+2,852%</strong>."
                    </p>
                  </div>

                  {/* Quick Action Button */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">One-click BAPI execution available</span>
                    <button
                      onClick={onQuickInspectTSMC}
                      className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 text-xs font-bold text-white shadow transition-all"
                    >
                      <Zap className="h-3.5 w-3.5" />
                      <span>Mitigate in Live Sandbox</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Right Column: Key Proof Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                      Total Losses Prevented
                    </span>
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-mono text-emerald-400">$2.14M</span>
                    <span className="text-xs text-emerald-300 font-semibold">+18.4% this quarter</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Calculated against prevented plant idle penalties and SLA breaches.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Lead Time Warning
                    </span>
                    <span className="text-2xl font-bold font-mono text-cyan-400">7–14d</span>
                    <span className="text-[10px] text-slate-400 block mt-1">vs 48h traditional</span>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Model Accuracy
                    </span>
                    <span className="text-2xl font-bold font-mono text-blue-400">94.2%</span>
                    <span className="text-[10px] text-slate-400 block mt-1">LightGBM ROC-AUC</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-blue-400" />
                      Autonomous Resolution Cycle
                    </span>
                    <span className="font-mono font-bold text-cyan-300">4.2 Hours MTTR</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[89%]" />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    89% faster than manual procurement negotiation
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
