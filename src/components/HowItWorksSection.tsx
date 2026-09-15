import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  Bot, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Radio, 
  Satellite, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  Workflow
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Real-Time Telemetry & ERP Ingestion',
      subtitle: 'Data Aggregation Layer',
      icon: Satellite,
      description: 'The engine subscribes to SAP S/4HANA OData v4 CDS views (purchase orders, line items, supplier lead times) and streams global real-world events: AIS maritime satellite tracking, NOAA extreme weather radar, and port congestion telemetry.',
      tech: 'FastAPI • SAP CDS Views • MarineTraffic AIS • NOAA GFS',
      metrics: '1,240+ Active POs Streamed',
      output: 'Normalized multimodal feature tensor with 42 geospatial attributes'
    },
    {
      num: '02',
      title: 'Gradient-Boosted ML Delay Inference',
      subtitle: 'Predictive Horizon Engine',
      icon: Cpu,
      description: 'A tuned LightGBM model calculates the risk of arrival slip for every en route consignment up to 14 days before port docking. Models cross-reference historical port queue times, typhoon trajectories, and carrier reliability indexes.',
      tech: 'LightGBM • Scikit-Learn • 94.2% ROC-AUC',
      metrics: '7–14 Days Early Warning',
      output: 'Probabilistic delay distribution & estimated days slipped (+8d)'
    },
    {
      num: '03',
      title: 'Claude 3.5 Sonnet Root Cause & Trade-Offs',
      subtitle: 'Cognitive Reasoning Layer',
      icon: Bot,
      description: 'When delay risk exceeds critical thresholds, Claude assesses factory bills of materials (BOM), plant inventory buffer days, and uncontained idle costs. It formulates 3 distinct mitigation strategies with exact cost-benefit equations.',
      tech: 'Anthropic Claude 3.5 Sonnet • Structured JSON',
      metrics: '2,852% Net ROI Modeled',
      output: 'Ranked mitigation options (Air Freight vs Alternate Supplier vs Resequence)'
    },
    {
      num: '04',
      title: 'Closed-Loop SAP S/4HANA BAPI Commit',
      subtitle: 'Autonomous ERP Execution',
      icon: Send,
      description: 'Upon planner approval or autonomous threshold match, the engine executes BAPI_PO_CHANGE via RFC, reserves expedited transport in SAP TM, updates plant MRP planning buffers, and issues EDI 850 / 855 transmissions to suppliers.',
      tech: 'SAP RFC / BAPI • SAP TM • EDI 850 / 855',
      metrics: '4.2 Hours MTTR (vs 38h manual)',
      output: 'Immutable SAP Confirmation Document & EDI acknowledgment ID'
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20 bg-slate-950/70 border-t border-b border-slate-800/80">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-3">
            <Workflow className="h-3.5 w-3.5" />
            End-to-End Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How the Risk Engine Works in <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">4 Simple Steps</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Eliminating human latency by seamlessly bridging external real-world disruption signals with enterprise SAP execution.
          </p>
        </div>

        {/* 4 Interactive Steps Horizontal / Vertical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'border-cyan-500/80 bg-blue-950/30 ring-2 ring-cyan-500/30 shadow-xl shadow-cyan-500/10 -translate-y-1'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-2xl font-extrabold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {step.num}
                    </span>

                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                      isActive 
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' 
                        : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                    {step.subtitle}
                  </span>

                  <h3 className="text-base font-bold text-white mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Step Footer Details */}
                <div className="border-t border-slate-800/80 pt-3 space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-cyan-300">
                    <span className="text-slate-400">Benchmark:</span>
                    <span className="font-bold">{step.metrics}</span>
                  </div>
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500">Tech:</span> {step.tech}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Visual Card */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-[#0c1322] p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                Active Architecture Detail &bull; Step {steps[activeStep].num}
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">
                {steps[activeStep].title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-500/10 border border-blue-500/30 px-3 py-1 font-mono text-xs text-blue-300">
                {steps[activeStep].tech}
              </span>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                Data Output Artifact:
              </span>
              <p className="text-sm font-mono text-cyan-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                &rarr; {steps[activeStep].output}
              </p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Seamlessly connects external sensor meshes and maritime telematics directly with internal enterprise resource planning transactions, guaranteeing zero manual transcription error.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-slate-500">// Enterprise API Interface</div>
              <div className="text-emerald-400">POST /api/v1/risk-engine/pipeline/step-{steps[activeStep].num}</div>
              <div className="text-slate-400">{`{ "status": "nominal", "step": "${steps[activeStep].num}", "latency_ms": 14 }`}</div>
              <div className="flex items-center gap-2 text-[11px] text-cyan-400 pt-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Synchronized with SAP S/4HANA Kernel 2026</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
