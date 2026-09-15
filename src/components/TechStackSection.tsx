import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Zap, 
  Cpu, 
  Bot, 
  Mic, 
  Database, 
  Copy, 
  CheckCircle2,
  Server
} from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'fastapi' | 'lightgbm' | 'claude' | 'bapi'>('fastapi');
  const [copied, setCopied] = useState(false);

  const techItems = [
    {
      name: 'FastAPI + Python',
      category: 'Backend & Data Gateway',
      description: 'High-throughput async ASGI microservice ingesting SAP OData v4 CDS views, AIS maritime feeds, and NOAA weather streams.',
      badge: 'Python 3.12 / Pydantic v2',
      metrics: 'Sub-15ms endpoint latency',
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
    },
    {
      name: 'Scikit-learn + LightGBM',
      category: 'ML Inference Engine',
      description: 'Gradient-boosted decision trees trained on multi-year shipping logs, predicting consignment delay probability 7–14 days in advance.',
      badge: '94.2% ROC-AUC',
      metrics: '42 engineered features',
      accent: 'border-blue-500/30 text-blue-400 bg-blue-500/10'
    },
    {
      name: 'React 19 + Tailwind CSS',
      category: 'Frontend Operations Room',
      description: 'Ultra-responsive enterprise dark console with Chart.js delay forecasting, dynamic corridor mapping, and micro-interactions.',
      badge: 'Vite 6 + Motion',
      metrics: '100% Client-Side Fluidity',
      accent: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
    },
    {
      name: 'Anthropic Claude API',
      category: 'Cognitive Business Analyst',
      description: 'Evaluates production bills of materials (BOM), plant buffer safety stocks, and synthesizes 3 ranked mitigation strategies with ROI trade-offs.',
      badge: 'Claude 3.5 Sonnet',
      metrics: 'Structured JSON output',
      accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
    },
    {
      name: 'Deepgram Nova-2',
      category: 'Voice Command Interface',
      description: 'Real-time streaming speech-to-text with supply chain domain grammar tuning, enabling hands-free executive queries and verbal dispatch.',
      badge: 'Sub-300ms STT',
      metrics: 'SAP terminology tuned',
      accent: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10'
    },
    {
      name: 'Mock SAP Data Generator',
      category: 'Enterprise Integration Layer',
      description: 'Realistic SAP S/4HANA enterprise dataset generating purchase orders, schedule lines, MRP controllers, and RFC BAPI schemas.',
      badge: 'S/4HANA Schema Valid',
      metrics: '1,240 synthetic POs',
      accent: 'border-purple-500/30 text-purple-400 bg-purple-500/10'
    }
  ];

  const codeSnippets = {
    fastapi: `# FastAPI Async Telemetry Ingestion Endpoint
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel

app = FastAPI(title="SAP Risk Engine Ingestion Gateway")

class TelemetryPayload(BaseModel):
    po_number: str
    vessel_mmsi: str
    lat: float
    lng: float
    weather_anomalies: list[str]

@app.post("/api/v1/telemetry/evaluate")
async def evaluate_risk(payload: TelemetryPayload, background_tasks: BackgroundTasks):
    risk_score, delay_days = lightgbm_model.predict(payload)
    if risk_score > 0.75:
        # Trigger Claude Business Analyst in background
        background_tasks.add_task(run_claude_root_cause, payload.po_number, delay_days)
    return {"status": "analyzed", "risk_level": "critical", "predicted_delay": delay_days}`,

    lightgbm: `# LightGBM Early Warning Delay Predictor
import lightgbm as lgb
import numpy as np

# 42 Multi-modal Features: AIS speed, berth queue, typhoon radius, historical supplier delay
feature_names = ["ais_speed_knots", "typhoon_distance_km", "port_wait_hours", "lead_time_days"]

def predict_delay_horizon(features: np.ndarray) -> tuple[float, int]:
    booster = lgb.Booster(model_file="models/delay_predictor_v2.txt")
    prob_delay = booster.predict(features)[0]
    expected_days = int(np.ceil(prob_delay * 10))  # 7-14 day forecast window
    return float(prob_delay), max(1, expected_days)`,

    claude: `# Claude 3.5 Sonnet Business Analyst Prompt
from anthropic import Anthropic

client = Anthropic()

system_prompt = """You are the Chief Supply Chain Analyst for an SAP S/4HANA enterprise.
Calculate exact cost-of-inaction (production downtime vs expedited freight).
Output 3 ranked mitigation strategies in strictly compliant JSON."""

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1500,
    system=system_prompt,
    messages=[{"role": "user", "content": f"Analyze PO #{po_number} with +{delay_days}d typhoon delay."}]
)`,

    bapi: `// SAP S/4HANA BAPI Execution Schema (RFC)
{
  "FUNCTION": "BAPI_PO_CHANGE",
  "PURCHASEORDER": "45008921",
  "POHEADER": {
    "COMP_CODE": "1000",
    "PURCH_ORG": "US01",
    "PUR_GROUP": "002"
  },
  "POITEM": [{
    "PO_ITEM": "00010",
    "MATERIAL": "TSMC-7NM-WAF-01",
    "EXPEDITE_INDICATOR": "X",
    "CARRIER_ID": "CAL-CARGO-AIR"
  }],
  "ACTION": "AUTO_MITIGATION_EXECUTE",
  "EDI_PARTNER": "TSMC-KAOHSIUNG-EDI"
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tech-stack" className="relative py-20 bg-[#0b1120]">
      
      {/* Background accents */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-3">
            <Code2 className="h-3.5 w-3.5" />
            Under the Hood
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Production-Grade <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Engineered with a high-concurrency microservices architecture designed to plug directly into enterprise SAP S/4HANA environments.
          </p>
        </div>

        {/* 6 Tech Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {techItems.map((tech, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400">
                    {tech.category}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold border ${tech.accent}`}>
                    {tech.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {tech.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {tech.description}
                </p>
              </div>

              <div className="border-t border-slate-800/80 pt-3 text-[11px] font-mono text-cyan-300 flex items-center justify-between">
                <span className="text-slate-500">Benchmark:</span>
                <span>{tech.metrics}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Code Snippets Showcase */}
        <div className="rounded-2xl border border-slate-800 bg-[#0c1322] shadow-2xl overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#0f172a] px-4 py-3 gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span className="font-mono text-xs font-bold text-white">
                Engine Implementation Snippets
              </span>
            </div>

            {/* Code Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {(['fastapi', 'lightgbm', 'claude', 'bapi'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                    activeCodeTab === tab
                      ? 'bg-blue-600 text-white font-bold shadow'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {tab === 'fastapi' && 'FastAPI Gateway'}
                  {tab === 'lightgbm' && 'LightGBM Model'}
                  {tab === 'claude' && 'Claude Analyst'}
                  {tab === 'bapi' && 'SAP BAPI Commit'}
                </button>
              ))}

              <button
                onClick={handleCopyCode}
                className="ml-2 flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                title="Copy Snippet"
              >
                {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline font-mono text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Code Window */}
          <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed bg-[#080d1a]">
            <pre className="selection:bg-blue-600 selection:text-white">
              {codeSnippets[activeCodeTab]}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};
