import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Terminal, 
  ExternalLink, 
  Copy, 
  CheckCircle2, 
  Star, 
  GitFork, 
  Code2, 
  FileCode, 
  ShieldCheck, 
  Trophy 
} from 'lucide-react';

interface GithubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubModal: React.FC<GithubModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cloneCmd = `git clone https://github.com/sap-hackathon-2026/sap-supply-chain-risk-engine.git
cd sap-supply-chain-risk-engine

# Backend Setup (FastAPI & ML Inference)
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn server.main:app --port 8000 --reload

# Frontend Setup (React 19 & Tailwind)
npm install
npm run dev`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0c1322] text-slate-100 shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#0f172a] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-white">
              <Github className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  sap-supply-chain-risk-engine
                </h3>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  Public Repo
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                SAP Global Hackathon 2026 &bull; MIT Licensed
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Repo Badges */}
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-slate-300 border border-slate-700">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" /> 142 Stars
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-slate-300 border border-slate-700">
              <GitFork className="h-3 w-3 text-cyan-400" /> 28 Forks
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-blue-950/60 px-2.5 py-1 text-blue-300 border border-blue-500/30">
              <Trophy className="h-3 w-3 text-amber-400" /> Hackathon Finalist
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed">
            This repository contains the complete end-to-end source code for the <strong>SAP Supply Chain Risk Engine</strong>: the FastAPI OData ingestion microservice, the LightGBM delay forecasting pipeline, the Claude 3.5 Sonnet prompt synthesis engine, and the React 19 dark operations dashboard.
          </p>

          {/* Quickstart Code Block */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                Quickstart Installation:
              </span>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 px-2 py-1 text-[11px] text-slate-300 font-mono transition-colors"
              >
                {copied ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy Bash'}</span>
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#080d1a] p-3 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <pre>{cloneCmd}</pre>
            </div>
          </div>

          {/* Directory Architecture */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <span className="font-mono font-bold text-slate-300 block mb-1">
              Project Architecture:
            </span>
            <div className="font-mono text-[11px] text-slate-400 space-y-1">
              <div>📁 <strong>/server</strong> &mdash; FastAPI OData ingestion & Claude analyst bridge</div>
              <div>📁 <strong>/models</strong> &mdash; LightGBM gradient boosted delay predictor</div>
              <div>📁 <strong>/src/components</strong> &mdash; React operations room UI & Chart.js visualizers</div>
              <div>📁 <strong>/src/data</strong> &mdash; Realistic S/4HANA synthetic PO dataset</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-[#0f172a] px-6 py-4">
          <span className="text-[11px] text-slate-400 font-mono">
            SAP S/4HANA SDK &bull; Anthropic Claude SDK
          </span>

          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
