import React from 'react';
import { 
  Cpu, 
  Clock, 
  Mic, 
  Bot, 
  Send, 
  LayoutDashboard, 
  Sparkles, 
  ArrowRight, 
  Radar, 
  ShieldCheck, 
  Workflow, 
  Layers,
  Database,
  Radio
} from 'lucide-react';

interface SolutionFeaturesSectionProps {
  onOpenVoiceModal: () => void;
  onScrollToDemo: () => void;
}

export const SolutionFeaturesSection: React.FC<SolutionFeaturesSectionProps> = ({
  onOpenVoiceModal,
  onScrollToDemo,
}) => {
  const features = [
    {
      id: 'ml-detection',
      icon: Radar,
      tag: 'Predictive Intelligence',
      title: 'Real-Time ML Risk Detection',
      description: 'Continuously fuses satellite AIS vessel tracking, NOAA extreme weather radar, and marine port wait times with SAP S/4HANA PO schedule lines to flag anomalies at 94.2% accuracy.',
      badge: 'LightGBM + Scikit-Learn',
      highlight: 'Sub-30ms anomaly classification across 10,000+ active POs'
    },
    {
      id: 'forecasting',
      icon: Clock,
      tag: 'Pre-Disruption Horizon',
      title: '7–14 Day Delay Forecasting',
      description: 'Predicts container arrivals and port bottlenecks up to two weeks before bills of lading slip, providing ample window for freight re-routing before suppliers hit dead-ends.',
      badge: '14-Day Horizon',
      highlight: 'Extends decision response time by 500% compared to traditional ERP'
    },
    {
      id: 'voice-ai',
      icon: Mic,
      tag: 'Executive Voice Interaction',
      title: 'Voice-Powered "Ask AI" Interface',
      description: 'Hands-free conversational supply chain interface. Controllers can simply speak: "Show high-risk shipments from Taiwan" or "Execute mitigation on TSMC microconductors".',
      badge: 'Deepgram + Speech NLP',
      highlight: 'Low-latency streaming STT with domain-tuned SAP grammar',
      interactive: true,
    },
    {
      id: 'claude-analyst',
      icon: Bot,
      tag: 'Autonomous Cognitive Reasoning',
      title: 'Claude 3.5 Business Analyst',
      description: 'Synthesizes multi-modal telemetry into executive root causes. Calculates cost-of-inaction, plant downtime risks, and evaluates three optimized mitigation trade-offs.',
      badge: 'Anthropic Claude 3.5 Sonnet',
      highlight: 'Quantifies downtime ($1.2M) vs expedited freight ($42k) trade-offs'
    },
    {
      id: 'automated-workflows',
      icon: Send,
      tag: 'Closed-Loop ERP Automation',
      title: 'Auto-Triggered Supplier Workflows',
      description: 'Translates selected AI recommendations into production S/4HANA transactions. Automatically executes BAPI_PO_CHANGE and dispatches EDI 850 / 855 purchase order updates.',
      badge: 'SAP BAPI & EDI 850/855',
      highlight: 'Generates official SAP IDoc Confirmation IDs in seconds'
    },
    {
      id: 'operations-dashboard',
      icon: LayoutDashboard,
      tag: 'Mission-Control Experience',
      title: 'Mission-Control Dark Dashboard',
      description: 'Purpose-built for high-pressure operations rooms. Features dynamic Chart.js delay predictions, interactive global shipping corridor maps, and instant shipment filtering.',
      badge: 'React 19 + Chart.js',
      highlight: 'Dense telemetry layout optimized for rapid situational awareness'
    }
  ];

  return (
    <section id="solution" className="relative py-20 bg-[#0b1120]">
      
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            The Solution Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Autonomous Intelligence Across the <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Entire Disruption Lifecycle</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            From satellite weather telemetry to SAP S/4HANA BAPI commit, our six core engines work in harmony to transform vulnerable supply chains into resilient self-healing networks.
          </p>
        </div>

        {/* 6 Core Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                <div>
                  {/* Top card header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[10px] font-mono font-semibold text-slate-300 border border-slate-700">
                      {f.badge}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-cyan-400 block mb-1">
                    {f.tag}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {f.description}
                  </p>
                </div>

                {/* Bottom Highlight Tag & Interactive Hook */}
                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    {f.highlight}
                  </span>

                  {f.interactive && (
                    <button
                      onClick={onOpenVoiceModal}
                      className="inline-flex items-center gap-1 rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                    >
                      Try Voice &rarr;
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Quick Transition Banner */}
        <div className="mt-14 rounded-2xl border border-blue-900/40 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Ready to test the engine with real simulated SAP data?
            </h4>
            <p className="text-xs text-slate-300">
              Launch the live interactive console below to inspect consignments, evaluate root causes, and execute SAP BAPIs.
            </p>
          </div>

          <button
            onClick={onScrollToDemo}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/30 transition-all shrink-0"
          >
            <span>Launch Interactive Sandbox</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
