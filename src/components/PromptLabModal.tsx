import React, { useState, useEffect } from 'react';
import { 
  googleAiStudioPrompts, 
  AiStudioPrompt 
} from '../data/googleAiStudioPrompts';
import { Shipment } from '../types';
import { 
  X, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  RotateCcw, 
  Terminal, 
  Code2, 
  Sliders, 
  FileText, 
  Globe2, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Bot,
  AlertTriangle,
  Zap,
  Download,
  Share2
} from 'lucide-react';

interface PromptLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipments: Shipment[];
  initialSelectedShipmentId?: string;
  initialPromptIndex?: number;
}

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'SGD' | 'JPY';

const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: '$', rate: 1.0, name: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP (£)' },
  SGD: { symbol: 'S$', rate: 1.34, name: 'SGD (S$)' },
  JPY: { symbol: '¥', rate: 154.0, name: 'JPY (¥)' }
};

export const PromptLabModal: React.FC<PromptLabModalProps> = ({
  isOpen,
  onClose,
  shipments,
  initialSelectedShipmentId,
  initialPromptIndex = 0,
}) => {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(initialPromptIndex);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(
    initialSelectedShipmentId || shipments[0]?.id || 'SHP-9021'
  );
  const [activeViewTab, setActiveViewTab] = useState<'output' | 'prompt' | 'python'>('output');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({});
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Sync selected shipment into customVariables
  useEffect(() => {
    const shipment = shipments.find((s) => s.id === selectedShipmentId);
    if (shipment) {
      setCustomVariables({
        SUPPLIER_NAME: `${shipment.supplier} (${shipment.supplierLocation})`,
        RISK_TYPE: `${shipment.riskLevel} ${shipment.riskDriver.toLowerCase()}`,
        RISK_SCORE: shipment.riskLevel === 'critical' ? '94' : shipment.riskLevel === 'medium' ? '68' : '32',
        ROOT_CAUSE: shipment.rootCauseAnalysis.summary,
        IMPACT_VALUE: shipment.financialImpact.toString(),
        DAYS: shipment.predictedDelayDays.toString(),
        RISK_SUMMARY: `${shipment.riskDriver} causing +${shipment.predictedDelayDays}d delay on ${shipment.material}`,
        REGION: `${shipment.origin} ➔ ${shipment.destination}`,
        PERCENTAGE: '88.4',
        EVENTS: 'Severe weather advisory & port congestion alert',
        WEATHER_CONDITIONS: shipment.riskDriver.includes('Typhoon') 
          ? 'Super Typhoon Gaemi, wind velocity 135 km/h, wave heights 7.2m' 
          : 'Severe meteorological disruption along sea transport corridor',
        PORT_STATUS: `${shipment.origin} container terminal operating at 118% capacity; 42 vessels waiting`,
        INDUSTRY: 'Automotive Electronics & High-Precision Assemblies',
        YEARS: '14',
        STATUS: 'Stable (Verified Tier-1 SAP S/4HANA Vendor)',
        RATING: '4.2',
        CRISIS_DESCRIPTION: `${shipment.riskDriver} halting shipments across ${shipment.route}`,
        SUPPLIER_1: `${shipment.supplier} ($${shipment.financialImpact.toLocaleString()})`,
        SUPPLIER_2: 'ASE Technology Holdings ($620,000)',
        TOTAL_AMOUNT: (shipment.financialImpact + 1200000).toString(),
        NUMBER: '142',
        ACTION_DESCRIPTION: `Expediting 40% batch via priority air freight charter and updating S/4HANA schedule lines for ${shipment.poNumber}`,
        COUNTRY: 'Germany / Taiwan / Singapore / US',
        STANDARDS: 'ISO 9001, IATF 16949, German LkSG, EU CBAM, RoHS',
        AGREEMENTS: 'EU-Singapore FTA, Incoterms 2020 DDP',
        OPTION_1_NAME: 'Priority Air Freight Charter (Lufthansa/China Airlines Cargo)',
        OPTION_2_NAME: 'Secondary Supplier Stock Expedite (NXP Singapore)',
        OPTION_3_NAME: 'Assembly Shift Resequencing & Buffer Extension',
        SITUATION_DESCRIPTION: `${shipment.riskDriver} causing +${shipment.predictedDelayDays}d delay on ${shipment.poNumber} (${shipment.material})`,
        AUDIENCE: 'Suppliers, Executive Management, Key OEM Buyers',
        TONE: 'Urgent yet reassuring, executive, decisive',
        GOAL: 'Confirm air charter allocation, secure C-suite budget approval, and safeguard OEM SLAs'
      });
    }
  }, [selectedShipmentId, shipments]);

  if (!isOpen) return null;

  const currentPrompt = googleAiStudioPrompts[selectedPromptIndex] || googleAiStudioPrompts[0];
  const { symbol, rate } = CURRENCY_RATES[selectedCurrency];

  const hydratedPromptText = currentPrompt.generateHydratedPrompt(customVariables);
  const simulatedOutputText = currentPrompt.generateSimulatedOutput(customVariables, symbol, rate);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(hydratedPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(simulatedOutputText);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 2200);
  };

  const handleSimulateRun = () => {
    setIsSimulating(true);
    setActiveViewTab('output');
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  // Generate Python @google/genai snippet
  const pythonSnippet = `# Google AI Studio Integration Script (@google/genai SDK)
# Target Model: gemini-3.8-flash / gemini-3.1-pro-preview
from google import genai
import os

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

# Prompt ${currentPrompt.number}: ${currentPrompt.title}
prompt = """${hydratedPromptText}"""

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents=prompt,
    config={
        "temperature": 0.2,
        "top_p": 0.95,
        "max_output_tokens": 2048,
    }
)

print("--- AI STUDIO ANALYSIS ARTIFACT ---")
print(response.text)`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0b1120] text-slate-100 shadow-2xl flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#0f172a] px-4 sm:px-6 py-3.5 gap-3">
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Google AI Studio <span className="text-cyan-400 font-mono">Prompt Hub</span>
                </h3>
                <span className="rounded-full bg-blue-500/20 border border-blue-500/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
                  8 Enterprise Prompts
                </span>
                <span className="hidden md:inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                International-grade prompt engineering templates optimized for Google AI Studio & Gemini 3.8
              </p>
            </div>
          </div>

          {/* Header Controls: Currency Selector, Launch Studio, Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2 py-1 text-xs">
              <Globe2 className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-xs font-mono font-bold text-cyan-300 focus:outline-none cursor-pointer"
                title="Convert Financial Exposure Currency"
              >
                {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((code) => (
                  <option key={code} value={code} className="bg-slate-900 text-white">
                    {CURRENCY_RATES[code].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Launch Google AI Studio in new tab */}
            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/40 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-all shadow-sm"
              title="Open aistudio.google.com in a new tab"
            >
              <span>Open AI Studio</span>
              <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
            </a>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

          </div>
        </div>

        {/* 8 Prompts Horizontal Scrollable Ribbon */}
        <div className="border-b border-slate-800 bg-[#080d1a] px-4 py-2 overflow-x-auto flex items-center gap-2 scrollbar-thin">
          {googleAiStudioPrompts.map((prompt, idx) => {
            const isSelected = selectedPromptIndex === idx;
            return (
              <button
                key={prompt.id}
                onClick={() => {
                  setSelectedPromptIndex(idx);
                  setActiveViewTab('output');
                }}
                className={`whitespace-nowrap flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono transition-all shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30 ring-1 ring-cyan-400'
                    : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80'
                }`}
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-white text-blue-900' : 'bg-slate-800 text-slate-400'
                }`}>
                  {prompt.number}
                </span>
                <span>{prompt.shortTitle}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                  isSelected ? 'bg-blue-800/80 text-cyan-200' : 'bg-slate-800 text-slate-400'
                }`}>
                  {prompt.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Real-Time Shipment Data Binding Strip */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-[#0c1322] px-4 sm:px-6 py-2.5 gap-3 text-xs">
          
          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-cyan-400" />
              Auto-Hydrate From Live SAP PO:
            </span>

            <select
              value={selectedShipmentId}
              onChange={(e) => setSelectedShipmentId(e.target.value)}
              className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-white font-bold focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {shipments.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.poNumber} &bull; {s.supplier} ({s.material} - {s.riskLevel.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-mono transition-all ${
                showCustomizer 
                  ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300' 
                  : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="h-3 w-3" />
              <span>{showCustomizer ? 'Hide Variables' : 'Edit Placeholders'}</span>
            </button>

            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-950/40 hover:bg-blue-900/50 px-3 py-1 text-xs font-semibold text-cyan-300 transition-all"
              title="Copy prompt with all variables interpolated"
            >
              {copiedPrompt ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedPrompt ? 'Copied for AI Studio!' : 'Copy Prompt'}</span>
            </button>

            <button
              onClick={handleSimulateRun}
              disabled={isSimulating}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 px-3 py-1 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition-all"
            >
              {isSimulating ? (
                <RotateCcw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-white" />
              )}
              <span>{isSimulating ? 'Reasoning...' : 'Run in Engine'}</span>
            </button>
          </div>

        </div>

        {/* Collapsible Variable Customizer Drawer */}
        {showCustomizer && (
          <div className="border-b border-slate-800 bg-[#080d1a] p-4 text-xs font-mono grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
            {currentPrompt.placeholders.map((key) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-semibold block truncate">
                  {`{${key}}`}
                </label>
                <input
                  type="text"
                  value={customVariables[key] || ''}
                  onChange={(e) =>
                    setCustomVariables((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-cyan-300 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            ))}
          </div>
        )}

        {/* Main Body with Tabs */}
        <div className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 space-y-4">
          
          {/* Prompt Header & Metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                  {currentPrompt.title}
                </span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                  Tone: {currentPrompt.tone}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {currentPrompt.useCase}
              </p>
            </div>

            {/* View Switcher: Simulated Output | Raw Hydrated Prompt | Python SDK Code */}
            <div className="flex items-center gap-1 rounded-xl bg-slate-900 p-1 border border-slate-800 shrink-0">
              <button
                onClick={() => setActiveViewTab('output')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeViewTab === 'output'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="h-3.5 w-3.5" />
                <span>AI Output</span>
              </button>

              <button
                onClick={() => setActiveViewTab('prompt')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeViewTab === 'prompt'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Hydrated Prompt</span>
              </button>

              <button
                onClick={() => setActiveViewTab('python')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeViewTab === 'python'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Python SDK</span>
              </button>
            </div>
          </div>

          {/* Content Stage */}
          <div className="flex-1 overflow-y-auto rounded-xl border border-slate-800 bg-[#080d1a] p-4 sm:p-6 shadow-inner font-mono text-xs leading-relaxed relative">
            
            {activeViewTab === 'output' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-emerald-400 font-bold">Inference Engine: Gemini 3.8 Flash + Claude 3.5 Sonnet</span>
                    <span>&bull;</span>
                    <span>Currency: {CURRENCY_RATES[selectedCurrency].name}</span>
                  </div>

                  <button
                    onClick={handleCopyOutput}
                    className="flex items-center gap-1 text-cyan-300 hover:text-white"
                  >
                    {copiedOutput ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedOutput ? 'Copied Brief!' : 'Copy Response'}</span>
                  </button>
                </div>

                <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-200 leading-relaxed selection:bg-blue-600 selection:text-white">
                  {simulatedOutputText}
                </div>
              </div>
            )}

            {activeViewTab === 'prompt' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="text-cyan-300 font-bold">
                    Ready to Paste directly into aistudio.google.com
                  </span>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1 text-cyan-300 hover:text-white"
                  >
                    {copiedPrompt ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedPrompt ? 'Copied!' : 'Copy Hydrated Prompt'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap text-slate-300 text-xs font-mono leading-relaxed selection:bg-blue-600 selection:text-white">
                  {hydratedPromptText}
                </pre>
              </div>
            )}

            {activeViewTab === 'python' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="text-cyan-300 font-bold">
                    Python Code using modern @google/genai SDK
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(pythonSnippet);
                      setCopiedPrompt(true);
                      setTimeout(() => setCopiedPrompt(false), 2000);
                    }}
                    className="flex items-center gap-1 text-cyan-300 hover:text-white"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Python Code</span>
                  </button>
                </div>
                <pre className="text-emerald-400 text-xs font-mono whitespace-pre-wrap selection:bg-blue-600 selection:text-white">
                  {pythonSnippet}
                </pre>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-800 bg-[#0f172a] px-4 sm:px-6 py-3.5 gap-3">
          
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="font-bold text-white">Google AI Studio Hackathon Suite</span>
            <span>&bull;</span>
            <span className="text-cyan-300">Prompt {currentPrompt.number} of 8 Selected</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>

            <a
              href="https://aistudio.google.com"
              target="_blank"
              rel="noreferrer"
              onClick={handleCopyPrompt}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy & Launch Google AI Studio</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
