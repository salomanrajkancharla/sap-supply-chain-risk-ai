import React from 'react';
import { 
  Bot, 
  Mic, 
  Play, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  Activity,
  Terminal,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

interface SiteNavbarProps {
  onOpenVoiceModal: () => void;
  onOpenVideoDemo: () => void;
  onOpenGithubModal: () => void;
  onOpenPromptLab: () => void;
  onScrollToSection: (sectionId: string) => void;
  isConsoleMode: boolean;
  setIsConsoleMode: (val: boolean) => void;
}

export const SiteNavbar: React.FC<SiteNavbarProps> = ({
  onOpenVoiceModal,
  onOpenVideoDemo,
  onOpenGithubModal,
  onOpenPromptLab,
  onScrollToSection,
  isConsoleMode,
  setIsConsoleMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Problem', id: 'problem' },
    { label: 'Solution', id: 'solution' },
    { label: 'Interactive Demo', id: 'live-demo' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'Impact & ROI', id: 'impact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b1120]/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 transition-transform group-hover:scale-105">
              <Layers className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-base group-hover:text-cyan-400 transition-colors">
                  SAP RiskEngine <span className="text-cyan-400 font-mono text-sm">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-400 border border-blue-500/30">
                  SAP Hackathon '26
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Autonomous S/4HANA Disruption Mitigation
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollToSection(item.id)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-cyan-400 transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Google AI Studio Prompts Button */}
          <button
            onClick={onOpenPromptLab}
            className="group relative flex items-center gap-1.5 rounded-xl border border-blue-500/40 bg-gradient-to-r from-blue-950/60 to-indigo-950/60 px-3 py-1.5 text-xs font-semibold text-cyan-300 shadow-sm transition-all hover:border-cyan-400 hover:bg-blue-900/40 hover:shadow-cyan-500/20 hover:scale-105"
            title="Open Google AI Studio Prompt Hub (8 Prompts)"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>AI Studio Prompts</span>
            <span className="rounded-full bg-cyan-500/20 px-1.5 py-0.2 text-[9px] font-mono font-bold text-cyan-300 border border-cyan-500/30">
              8
            </span>
          </button>

          {/* Voice Interface Trigger Button */}
          <button
            onClick={onOpenVoiceModal}
            className="group relative flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-3 py-1.5 text-xs font-semibold text-cyan-300 shadow-sm transition-all hover:border-cyan-400 hover:bg-cyan-900/30 hover:shadow-cyan-500/20 hover:scale-105"
            title="Ask Voice AI (Ctrl+K)"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
            </span>
            <Mic className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-200 transition-colors" />
            <span className="hidden md:inline">Ask AI</span>
            <kbd className="hidden xl:inline rounded bg-slate-800/90 px-1.5 py-0.2 text-[9px] font-mono text-slate-400 border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* GitHub Repo Modal Button */}
          <button
            onClick={onOpenGithubModal}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-all"
            title="View Hackathon Repository & Architecture"
          >
            <Github className="h-3.5 w-3.5 text-slate-400" />
            <span>Repo</span>
          </button>

          {/* Video Demo Button */}
          <button
            onClick={onOpenVideoDemo}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-blue-500/50 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Play className="h-3 w-3 text-blue-400" />
            <span>3-Min Demo</span>
          </button>

          {/* Primary View Switcher or Jump to Live Demo */}
          <button
            onClick={() => {
              if (isConsoleMode) {
                setIsConsoleMode(false);
              } else {
                onScrollToSection('live-demo');
              }
            }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02]"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>{isConsoleMode ? 'Showcase View' : 'Live Demo'}</span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0b1120] px-4 py-4 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onScrollToSection(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2 border-t border-slate-800">
            <button
              onClick={() => {
                onOpenPromptLab();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg bg-blue-950/60 border border-blue-500/40 px-3 py-2 text-xs font-semibold text-cyan-300"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>Google AI Studio Prompts</span>
              </div>
              <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
                8 Prompts
              </span>
            </button>
            <button
              onClick={() => {
                onOpenVideoDemo();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200"
            >
              <Play className="h-3.5 w-3.5 text-blue-400" />
              <span>Watch 3-Min Walkthrough</span>
            </button>
            <button
              onClick={() => {
                onOpenGithubModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300"
            >
              <Github className="h-3.5 w-3.5" />
              <span>View GitHub & Architecture</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
