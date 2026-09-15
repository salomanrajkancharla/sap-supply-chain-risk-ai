import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Unplug, 
  Flame, 
  ArrowRight, 
  XCircle, 
  CheckCircle2, 
  TrendingDown, 
  FileSpreadsheet, 
  Radio
} from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const painPoints = [
    {
      icon: Clock,
      title: 'The 72-Hour "Fog of War"',
      stat: '48–72h Lag',
      statLabel: 'ERP notification delay',
      description: 'Major weather typhoons, port crane strikes, and canal blockages happen instantly, but standard ERP systems only register delays after the container fails to arrive at the berth.',
      accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    },
    {
      icon: DollarSign,
      title: '$250,000 / Hour Plant Halts',
      stat: '$1.8M Avg',
      statLabel: 'Per uncontained stoppage',
      description: 'Just-In-Time (JIT) manufacturing leaves plants with razor-thin inventory buffers. A delayed batch of hydraulic valves or microchips shuts down production lines entirely.',
      accent: 'border-red-500/30 text-red-400 bg-red-500/10'
    },
    {
      icon: Flame,
      title: 'Manual, Chaotic Firefighting',
      stat: '18+ Hours',
      statLabel: 'Planner resolution time',
      description: 'Procurement planners waste days exchanging 40+ frantic emails, static Excel spreadsheets, and freight broker phone calls just to determine who has alternative capacity.',
      accent: 'border-orange-500/30 text-orange-400 bg-orange-500/10'
    },
    {
      icon: Unplug,
      title: 'Disconnected Operational Silos',
      stat: '0% Sync',
      statLabel: 'Between AIS and SAP',
      description: 'Satellite vessel tracking (AIS), port demurrage queues, and weather satellites operate in isolated platforms completely disconnected from SAP S/4HANA purchase orders.',
      accent: 'border-purple-500/30 text-purple-400 bg-purple-500/10'
    }
  ];

  return (
    <section id="problem" className="relative py-20 bg-slate-950/60 border-t border-b border-slate-800/80">
      
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 -left-48 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs font-mono font-bold text-red-400 uppercase tracking-wider mb-3">
            <AlertTriangle className="h-3.5 w-3.5" />
            The Enterprise Crisis
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Supply Chains Don't Break in the Factory.<br className="hidden sm:inline" />
            <span className="text-red-400">They Break in the Dark.</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Enterprise procurement teams manage thousands of active purchase orders with static dates. When geopolitical or meteorological shocks strike, planners are blind until lines halt.
          </p>
        </div>

        {/* 4 Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {painPoints.map((pain, idx) => {
            const Icon = pain.icon;
            return (
              <div 
                key={idx}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${pain.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-lg font-bold text-white block">{pain.stat}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">{pain.statLabel}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {pain.title}
                </h3>
                
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pain.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison: The Old Way vs The Risk Engine Way */}
        <div className="mt-14 rounded-2xl border border-slate-800 bg-[#0c1322] p-6 lg:p-8 shadow-2xl">
          <h3 className="text-center text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-6">
            The Paradigm Shift: From Reactive Scrambling to Autonomous Mitigation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Old Way */}
            <div className="rounded-xl border border-red-900/30 bg-red-950/10 p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-red-900/30 text-red-400 font-bold text-sm">
                <XCircle className="h-4 w-4 shrink-0" />
                <span>Traditional Supply Chain (SAP Alone)</span>
              </div>
              
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold font-mono">01.</span>
                  <span><strong>Blind to En Route Threats:</strong> Shipments remain "On Schedule" until vessel misses original ETA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold font-mono">02.</span>
                  <span><strong>Disorganized Spreadsheet Audits:</strong> Planners manually verify 800+ lines in SAP ME2M.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold font-mono">03.</span>
                  <span><strong>Slow Human Escalation:</strong> Average 18–36 hours before management approves expedited air freight.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold font-mono">04.</span>
                  <span><strong>Catastrophic Line Stoppages:</strong> Multi-million dollar tier-1 penalties and idle shifts.</span>
                </li>
              </ul>
            </div>

            {/* The Risk Engine Way */}
            <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/10 p-5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-900/30 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>With SAP Supply Chain Risk Engine</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong>7–14 Day Early Warning:</strong> LightGBM detects congestion weeks before arrival using AIS telemetry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><strong>Claude Business Analyst:</strong> Translates raw disruption into exact factory inventory buffer days & costs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><strong>Ranked Strategy Trade-offs:</strong> Compares Air Charter, Secondary Sourcing, and Schedule Resequencing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><strong>One-Click S/4HANA Execution:</strong> Auto-triggers BAPI_PO_CHANGE and dispatches EDI 850 in 4.2 hours.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
