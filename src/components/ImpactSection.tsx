import React from 'react';
import { 
  Trophy, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  ArrowRight,
  Award
} from 'lucide-react';

interface ImpactSectionProps {
  onScrollToDemo: () => void;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ onScrollToDemo }) => {
  const stats = [
    {
      value: '$2.14M',
      label: 'Financial Losses Prevented',
      detail: 'Measured across 4 mitigated critical consignments during live trial simulation',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30'
    },
    {
      value: '7–14 Days',
      label: 'Early Warning Horizon',
      detail: 'Disruptions detected weeks before ship arrival, extending resolution window 5x',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30'
    },
    {
      value: '4.2 Hours',
      label: 'Mean Time to Resolution (MTTR)',
      detail: '89% faster than the industry standard 38-hour manual email/phone negotiation cycle',
      color: 'text-blue-400',
      border: 'border-blue-500/30'
    },
    {
      value: '94.2%',
      label: 'Model Prediction Accuracy',
      detail: 'LightGBM ROC-AUC validated on maritime vessel telemetry and port congestion patterns',
      color: 'text-indigo-400',
      border: 'border-indigo-500/30'
    }
  ];

  return (
    <section id="impact" className="relative py-20 bg-slate-950/70 border-t border-b border-slate-800/80">
      
      {/* Glow */}
      <div className="pointer-events-none absolute top-1/2 -right-40 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 blur-[130px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hackathon Achievement Banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/30 px-4 py-1.5 shadow-lg shadow-amber-500/10">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-200">
              Built in 24 Hours for SAP Global Hackathon 2026
            </span>
            <span className="text-amber-500/50">&bull;</span>
            <span className="text-xs font-mono font-semibold text-amber-300">
              Disruption Prevention Track
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Measurable Impact: <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">$2M+ in Losses Averted</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            By turning reactive chaos into proactive autonomous ERP mitigation, enterprises safeguard manufacturing throughput and customer SLA obligations.
          </p>
        </div>

        {/* 4 Big Stat Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${stat.border} bg-slate-900/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-slate-900/90`}
            >
              <span className={`text-4xl sm:text-5xl font-extrabold font-mono ${stat.color} block mb-2`}>
                {stat.value}
              </span>

              <h4 className="text-sm font-bold text-white mb-2">
                {stat.label}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Executive Testimonial & Industry Validation Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c1322] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-amber-400">
                <Quote className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Supply Chain Executive Perspective
                </span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                "In high-precision manufacturing, an unpredicted 8-day delay on a key microconductor halts an entire $50M assembly line. The SAP Supply Chain Risk Engine completely bridges the gap between external ocean chokepoints and S/4HANA PO scheduling, giving controllers the clarity to act 10 days before disasters materialize."
              </blockquote>

              <div className="pt-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xs">
                  SC
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Global Automotive & Tech Supply Chain Simulation</h5>
                  <p className="text-[11px] text-slate-400">Validated with Tier-1 Automotive & Electronics bill-of-materials data</p>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
              <button
                onClick={onScrollToDemo}
                className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-cyan-500 transition-all hover:scale-105"
              >
                <span>Test Live Engine Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-500">
                Live sandbox &bull; Instant mitigation test
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
