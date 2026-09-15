/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialShipments, initialQuickMetrics } from './data/mockShipments';
import { Shipment, QuickMetrics } from './types';
import { SiteNavbar } from './components/SiteNavbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionFeaturesSection } from './components/SolutionFeaturesSection';
import { LiveDemoSection } from './components/LiveDemoSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TechStackSection } from './components/TechStackSection';
import { ImpactSection } from './components/ImpactSection';
import { SiteFooter } from './components/SiteFooter';
import { MitigationModal } from './components/MitigationModal';
import { VoiceCommandModal } from './components/VoiceCommandModal';
import { VideoDemoModal } from './components/VideoDemoModal';
import { GithubModal } from './components/GithubModal';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  X,
  Layers,
  ArrowUp
} from 'lucide-react';

export default function App() {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [metrics, setMetrics] = useState<QuickMetrics>(initialQuickMetrics);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  
  // Modals state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState<boolean>(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);
  const [isFullScreenConsole, setIsFullScreenConsole] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Toast Notification
  const [notification, setNotification] = useState<{
    id: string;
    type: 'success' | 'info' | 'warning';
    title: string;
    message: string;
  } | null>(null);

  // Global hotkey Ctrl+K / Cmd+K to trigger voice assistant modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsVoiceModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showNotification = (
    type: 'success' | 'info' | 'warning',
    title: string,
    message: string
  ) => {
    const id = Date.now().toString();
    setNotification({ id, type, title, message });
    setTimeout(() => {
      setNotification((prev) => (prev?.id === id ? null : prev));
    }, 5000);
  };

  const scrollToSection = (sectionId: string) => {
    if (isFullScreenConsole) {
      setIsFullScreenConsole(false);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Simulate refreshing the live SAP feed
  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setMetrics((prev) => ({
        ...prev,
        latencyMs: Math.floor(14 + Math.random() * 8),
      }));
      showNotification(
        'info',
        'SAP S/4HANA OData v4 Sync Complete',
        'Refreshed telemetry across 1,240 active consignments & IBP inventory buffers.'
      );
    }, 700);
  };

  // Voice Command Execution (NLP / Speech parser)
  const handleExecuteVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();

    if (lower.includes('taiwan')) {
      setActiveFilter('critical');
      setSearchQuery('Taiwan');
      scrollToSection('live-demo');
      showNotification('success', 'Voice Intent Executed', 'Filtered high-risk Taiwan corridor shipments.');
    } else if (lower.includes('500,000') || lower.includes('500000') || lower.includes('critical') || lower.includes('high risk')) {
      setActiveFilter('critical');
      setSearchQuery('');
      scrollToSection('live-demo');
      showNotification('success', 'Voice Intent Executed', 'Filtered critical consignments with extreme financial exposure.');
    } else if (lower.includes('tsmc') || lower.includes('microconductor')) {
      const tsmc = shipments.find((s) => s.id === 'SHP-9021');
      if (tsmc) {
        setSelectedShipment(tsmc);
        showNotification('success', 'Voice AI Action', 'Opening Claude Root Cause & S/4HANA Mitigation for TSMC Microconductors.');
      }
    } else if (lower.includes('health') || lower.includes('status')) {
      showNotification('info', 'Supply Chain Health Status', `Current Health Index: ${metrics.healthScore}% (Nominal). No uncontained assembly line stoppages.`);
    } else if (lower.includes('weather') || lower.includes('typhoon')) {
      setActiveFilter('all');
      setSearchQuery('Typhoon');
      scrollToSection('live-demo');
      showNotification('success', 'Voice Intent Executed', 'Displaying shipments impacted by Typhoon Gaemi.');
    } else if (lower.includes('reset') || lower.includes('clear')) {
      setActiveFilter('all');
      setSearchQuery('');
      showNotification('info', 'Filters Reset', 'Reset view to display all active shipments.');
    } else {
      setSearchQuery(command);
      scrollToSection('live-demo');
      showNotification('info', 'Voice Search', `Searched SAP purchase orders for: "${command}"`);
    }
  };

  // When mitigation is confirmed & executed in the Claude modal
  const handleApplyMitigation = (shipmentId: string, optionId: string, workflowId: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          const opt = s.mitigationOptions.find((o) => o.id === optionId);
          const delayRed = opt ? opt.delayReductionDays : 5;
          const newDelay = Math.max(0, s.predictedDelayDays - delayRed);
          const newImpact = Math.round(s.financialImpact * 0.12); // drastically reduce exposure
          return {
            ...s,
            status: 'Mitigated',
            predictedDelayDays: newDelay,
            financialImpact: newImpact,
            riskLevel: newDelay > 3 ? 'medium' : 'low',
            sapDocumentId: workflowId,
          };
        }
        return s;
      })
    );

    // Update Quick Metrics
    setMetrics((prev) => ({
      ...prev,
      highRiskAlerts: Math.max(0, prev.highRiskAlerts - 1),
      preventedLossesMillions: +(prev.preventedLossesMillions + 0.68).toFixed(2),
      healthScore: Math.min(99, prev.healthScore + 3),
    }));

    showNotification(
      'success',
      `SAP S/4HANA Workflow Committed (${workflowId})`,
      `Option ${optionId} applied for consignment ${shipmentId}. EDI 850 sent to vendor & SAP TM booking confirmed.`
    );
  };

  // Shortcut from Hero to open TSMC microconductors directly
  const handleQuickInspectTSMC = () => {
    const tsmc = shipments.find((s) => s.id === 'SHP-9021');
    if (tsmc) {
      setSelectedShipment(tsmc);
    } else {
      scrollToSection('live-demo');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. TOP NAVBAR */}
      <SiteNavbar
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
        onScrollToSection={scrollToSection}
        isConsoleMode={isFullScreenConsole}
        setIsConsoleMode={setIsFullScreenConsole}
      />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md rounded-xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              {notification.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              ) : notification.type === 'warning' ? (
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              ) : (
                <Info className="h-5 w-5 text-blue-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-white">{notification.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{notification.message}</p>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-slate-500 hover:text-white text-xs p-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      {!isFullScreenConsole ? (
        <main>
          
          {/* 1. HERO SECTION */}
          <HeroSection
            onScrollToDemo={() => scrollToSection('live-demo')}
            onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onQuickInspectTSMC={handleQuickInspectTSMC}
          />

          {/* 2. PROBLEM SECTION */}
          <ProblemSection />

          {/* 3. SOLUTION / FEATURES SECTION */}
          <SolutionFeaturesSection
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onScrollToDemo={() => scrollToSection('live-demo')}
          />

          {/* 4. LIVE DEMO PREVIEW & INTERACTIVE SANDBOX */}
          <LiveDemoSection
            shipments={shipments}
            metrics={metrics}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenMitigateModal={(shipment) => setSelectedShipment(shipment)}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onRefreshFeed={handleRefreshFeed}
            isRefreshing={isRefreshing}
            isFullScreen={isFullScreenConsole}
            setIsFullScreen={setIsFullScreenConsole}
          />

          {/* 5. HOW IT WORKS (4 STEPS) */}
          <HowItWorksSection />

          {/* 6. PRODUCTION TECH STACK */}
          <TechStackSection />

          {/* 7. IMPACT & ACCREDITATION */}
          <ImpactSection
            onScrollToDemo={() => scrollToSection('live-demo')}
          />

          {/* 8. FOOTER */}
          <SiteFooter
            onOpenGithubModal={() => setIsGithubModalOpen(true)}
            onScrollToTop={() => scrollToSection('hero')}
            onScrollToSection={scrollToSection}
          />

        </main>
      ) : (
        /* Pure Standalone Fullscreen Operations Console Mode */
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <LiveDemoSection
            shipments={shipments}
            metrics={metrics}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenMitigateModal={(shipment) => setSelectedShipment(shipment)}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onRefreshFeed={handleRefreshFeed}
            isRefreshing={isRefreshing}
            isFullScreen={isFullScreenConsole}
            setIsFullScreen={setIsFullScreenConsole}
          />
        </div>
      )}

      {/* CLAUDE AI ROOT CAUSE & SAP MITIGATION MODAL */}
      <MitigationModal
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onApplyMitigation={handleApplyMitigation}
      />

      {/* VOICE COMMAND ASSISTANT SIMULATOR MODAL */}
      <VoiceCommandModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onExecuteCommand={handleExecuteVoiceCommand}
      />

      {/* 3-MINUTE INTERACTIVE PRODUCT WALKTHROUGH VIDEO DEMO MODAL */}
      <VideoDemoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        onOpenLiveSandbox={() => {
          setIsVideoDemoOpen(false);
          scrollToSection('live-demo');
        }}
      />

      {/* GITHUB REPOSITORY & ARCHITECTURE MODAL */}
      <GithubModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />

    </div>
  );
}
