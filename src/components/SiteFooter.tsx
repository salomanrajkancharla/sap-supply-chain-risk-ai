import React from 'react';
import { 
  Layers, 
  Github, 
  Heart, 
  Activity, 
  ShieldCheck, 
  ExternalLink, 
  ArrowUp,
  Cpu,
  Bot
} from 'lucide-react';

interface SiteFooterProps {
  onOpenGithubModal: () => void;
  onScrollToTop: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onOpenGithubModal,
  onScrollToTop,
  onScrollToSection,
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070b14] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand & Mission */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                SAP RiskEngine <span className="text-cyan-400 font-mono text-xs">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Autonomous supply chain risk prediction and mitigation platform engineered for SAP S/4HANA enterprises. Built in 24 hours for the SAP Global Hackathon 2026.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <button onClick={() => onScrollToSection('problem')} className="hover:text-cyan-400 transition-colors">
              The Problem
            </button>
            <button onClick={() => onScrollToSection('solution')} className="hover:text-cyan-400 transition-colors">
              Solution
            </button>
            <button onClick={() => onScrollToSection('live-demo')} className="hover:text-cyan-400 transition-colors">
              Live Demo
            </button>
            <button onClick={() => onScrollToSection('how-it-works')} className="hover:text-cyan-400 transition-colors">
              How It Works
            </button>
            <button onClick={() => onScrollToSection('tech-stack')} className="hover:text-cyan-400 transition-colors">
              Tech Stack
            </button>
            <button onClick={() => onScrollToSection('impact')} className="hover:text-cyan-400 transition-colors">
              Impact
            </button>
            <button onClick={onOpenGithubModal} className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
              <Github className="h-3.5 w-3.5" />
              <span>GitHub Repo</span>
            </button>
          </div>

          {/* Back to top button */}
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-all shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>

        </div>

        {/* Operational Status & Accolade Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              SAP Gateway: Online (99.98%)
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-400">ML Inference Latency: 14ms</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-cyan-400">Claude 3.5 Sonnet: Operational</span>
          </div>

          <div className="text-slate-400 flex items-center gap-1">
            <span>Built for</span>
            <strong className="text-white">SAP Global Hackathon 2026</strong>
            <span>&bull;</span>
            <span>Made with <Heart className="inline h-3 w-3 text-red-500 fill-red-500 mx-0.5" /> by <strong className="text-slate-200">Kancharla Saloman Raj</strong></span>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="text-center text-[10px] text-slate-500 border-t border-slate-900 pt-6">
          SAP, S/4HANA, and SAP TM are registered trademarks of SAP SE. This project is an independent hackathon prototype submission demonstrating autonomous ERP risk mitigation.
        </div>

      </div>
    </footer>
  );
};
