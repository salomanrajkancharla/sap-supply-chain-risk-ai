/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialShipments, initialQuickMetrics } from './data/mockShipments';
import { Shipment, QuickMetrics } from './types';
import { TopNav } from './components/TopNav';
import { StatCards } from './components/StatCards';
import { RiskCharts } from './components/RiskCharts';
import { ShipmentTable } from './components/ShipmentTable';
import { RiskMapNetwork } from './components/RiskMapNetwork';
import { MitigationModal } from './components/MitigationModal';
import { VoiceCommandModal } from './components/VoiceCommandModal';
import { 
  Table as TableIcon, 
  Map as MapIcon, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle,
  Info,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [metrics, setMetrics] = useState<QuickMetrics>(initialQuickMetrics);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeView, setActiveView] = useState<'table' | 'map'>('table');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    id: string;
    type: 'success' | 'info' | 'warning';
    title: string;
    message: string;
  } | null>(null);

  // Global hotkey Ctrl+K to trigger voice modal
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

  // Simulate refreshing the live SAP feed
  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setMetrics((prev) => ({
        ...prev,
        latencyMs: Math.floor(18 + Math.random() * 12),
      }));
      showNotification(
        'info',
        'SAP S/4HANA Sync Complete',
        'Refreshed telemetry from CDS Views & IBP buffer nodes. All 1,240 consignments synchronized.'
      );
    }, 800);
  };

  // Voice Command Execution
  const handleExecuteVoiceCommand = (command: string) => {
    const lower = command.toLowerCase();

    if (lower.includes('taiwan')) {
      setActiveFilter('critical');
      setSearchQuery('Taiwan');
      showNotification('success', 'Voice Filter Executed', 'Displaying high-risk Taiwan consignments.');
    } else if (lower.includes('500,000') || lower.includes('500000') || lower.includes('500k')) {
      setActiveFilter('critical');
      setSearchQuery('');
      showNotification('success', 'Voice Filter Executed', 'Showing critical shipments with high financial exposure.');
    } else if (lower.includes('health')) {
      showNotification('info', 'Supply Chain Health Status', `Current Health Index: ${metrics.healthScore}% (Nominal). No uncontained system disruptions.`);
    } else if (lower.includes('tsmc') || lower.includes('microconductor')) {
      const tsmc = shipments.find((s) => s.id === 'SHP-9021');
      if (tsmc) {
        setSelectedShipment(tsmc);
        showNotification('success', 'Voice AI Action', 'Opening Risk Mitigation workflow for TSMC Microconductors.');
      }
    } else if (lower.includes('weather')) {
      setActiveFilter('all');
      setSearchQuery('Weather');
      showNotification('success', 'Voice Filter Executed', 'Filtering shipments affected by severe weather anomalies.');
    } else if (lower.includes('reset')) {
      setActiveFilter('all');
      setSearchQuery('');
      showNotification('info', 'Filters Cleared', 'Reset view to show all active shipments.');
    } else {
      setSearchQuery(command);
      showNotification('info', 'Voice Search', `Searched SAP records for: "${command}"`);
    }
  };

  // When mitigation is applied in the modal
  const handleApplyMitigation = (shipmentId: string, optionId: string, workflowId: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          const opt = s.mitigationOptions.find((o) => o.id === optionId);
          const delayRed = opt ? opt.delayReductionDays : 5;
          const newDelay = Math.max(0, s.predictedDelayDays - delayRed);
          const newImpact = Math.round(s.financialImpact * 0.15); // reduced drastically
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
      healthScore: Math.min(98, prev.healthScore + 3),
    }));

    showNotification(
      'success',
      `SAP Workflow Dispatched (${workflowId})`,
      `Option ${optionId} executed on S/4HANA for shipment ${shipmentId}. Vendor notified via EDI 850.`
    );
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-16">
      
      {/* 1. TOP NAVIGATION BAR */}
      <TopNav
        metrics={metrics}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        isVoiceActive={isVoiceModalOpen}
        onRefreshFeed={handleRefreshFeed}
        isRefreshing={isRefreshing}
        activeFilter={activeFilter}
      />

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 space-y-6">
        
        {/* Floating Notification Toast */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md rounded-xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
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
                className="text-slate-500 hover:text-white text-xs"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Platform Purpose Banner & System Banner */}
        <div className="relative overflow-hidden rounded-xl border border-blue-900/40 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-indigo-950/40 p-4 sm:p-5 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
                  AI-Powered Predictive Risk & Automated Mitigation Engine
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                7-14 Day Pre-Disruption Early Warning System
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
                Aggregating AIS satellite tracking, weather patterns, port demurrage metrics, and SAP S/4HANA inventory buffers. Machine learning models synthesize resolution workflows before factory line stoppages occur.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* View Switcher: Table vs Corridor Map */}
              <div className="inline-flex rounded-lg border border-slate-700 bg-slate-800/80 p-1 text-xs">
                <button
                  onClick={() => setActiveView('table')}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-semibold transition-all ${
                    activeView === 'table'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TableIcon className="h-3.5 w-3.5" />
                  <span>Table View</span>
                </button>
                <button
                  onClick={() => setActiveView('map')}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 font-semibold transition-all ${
                    activeView === 'map'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapIcon className="h-3.5 w-3.5" />
                  <span>Corridor Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN STAT CARDS BAR */}
        <StatCards
          metrics={metrics}
          onFilterCritical={() => {
            setActiveFilter('critical');
            setActiveView('table');
          }}
        />

        {/* 5. ANALYTICS & FORECASTING DASHBOARD (Chart.js) */}
        <RiskCharts />

        {/* 3. INTERACTIVE RISK MAP / SHIPMENT TRACKER TABLE */}
        {activeView === 'table' ? (
          <ShipmentTable
            shipments={shipments}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onOpenMitigateModal={(shipment) => setSelectedShipment(shipment)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <RiskMapNetwork
            shipments={shipments}
            onSelectShipment={(shipment) => setSelectedShipment(shipment)}
          />
        )}

      </main>

      {/* 4. CLAUDE / GEMINI AI BUSINESS ANALYST PANEL (MODAL) */}
      <MitigationModal
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onApplyMitigation={handleApplyMitigation}
      />

      {/* 6. VOICE COMMAND INTERFACE SIMULATOR */}
      <VoiceCommandModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onExecuteCommand={handleExecuteVoiceCommand}
      />

    </div>
  );
}
