import React, { useState } from 'react';
import { Shipment, MitigationOption, SAPWorkflowStep } from '../types';
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Layers, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Cpu, 
  Bot, 
  ShieldCheck, 
  Radio, 
  ChevronRight,
  CheckCircle,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

interface MitigationModalProps {
  shipment: Shipment | null;
  onClose: () => void;
  onApplyMitigation: (shipmentId: string, optionId: string, workflowId: string) => void;
  onOpenPromptLab?: (shipmentId?: string, promptIdx?: number) => void;
}

export const MitigationModal: React.FC<MitigationModalProps> = ({
  shipment,
  onClose,
  onApplyMitigation,
  onOpenPromptLab,
}) => {
  if (!shipment) return null;

  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    shipment.mitigationOptions.find((o) => o.recommended)?.id || 'A'
  );
  const [isExecutingWorkflow, setIsExecutingWorkflow] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [workflowSuccess, setWorkflowSuccess] = useState(false);
  const [generatedSapDocId, setGeneratedSapDocId] = useState<string | null>(
    shipment.sapDocumentId || null
  );

  const workflowSteps: SAPWorkflowStep[] = [
    {
      id: 1,
      title: 'SAP S/4HANA OData v4 Authentication',
      system: 'SAP Gateway (US/EU Secure Tunnel)',
      status: 'pending',
      details: 'Validated Kerberos token & S/4HANA Principal RFC credentials.',
    },
    {
      id: 2,
      title: 'BAPI_PO_CHANGE Execution',
      system: 'SAP MM (Materials Management)',
      status: 'pending',
      details: `Updated Schedule Lines on ${shipment.poNumber} with revised shipping terms.`,
    },
    {
      id: 3,
      title: 'SAP TM Freight Re-routing Dispatch',
      system: 'SAP Transportation Management',
      status: 'pending',
      details: 'Created Expedited Booking reservation with priority routing clearance.',
    },
    {
      id: 4,
      title: 'EDI 850 / 855 Supplier Notification Push',
      system: 'SAP Business Network / Ariba',
      status: 'pending',
      details: `Automated dispatch sent to ${shipment.supplier} EDI endpoint with electronic ACK required.`,
    },
    {
      id: 5,
      title: 'MRP Controller Rescheduling Run',
      system: 'SAP IBP & Production Planning',
      status: 'pending',
      details: 'Recalculated plant buffer safety curves; factory idle alert cleared.',
    },
  ];

  const handleTriggerSapWorkflow = () => {
    setIsExecutingWorkflow(true);
    setActiveStepIndex(0);

    // Step-by-step realistic execution
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < workflowSteps.length) {
        setActiveStepIndex(current);
      } else {
        clearInterval(interval);
        const docId = `SAP-WF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
        setGeneratedSapDocId(docId);
        setIsExecutingWorkflow(false);
        setWorkflowSuccess(true);
        onApplyMitigation(shipment.id, selectedOptionId, docId);
      }
    }, 700);
  };

  const selectedOption = shipment.mitigationOptions.find((o) => o.id === selectedOptionId);
  const isCritical = shipment.riskLevel === 'critical';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700/80 bg-[#0c1322] text-slate-100 shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#0f172a] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  AI Business Analyst & Risk Mitigation Engine
                </h2>
                <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-400 border border-blue-500/20">
                  Claude / Gemini LLM Reasoning
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Consignment: <strong className="text-white font-mono">{shipment.id}</strong> | Material: <span className="text-slate-300">{shipment.material}</span>
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

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Quick Context Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">SAP PO Number</span>
              <p className="font-mono text-xs font-bold text-blue-400">{shipment.poNumber}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Route Corridor</span>
              <p className="font-mono text-xs text-slate-200 truncate">{shipment.route}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Predicted Disruption</span>
              <p className={`font-mono text-xs font-bold ${isCritical ? 'text-red-400' : 'text-amber-400'}`}>
                +{shipment.predictedDelayDays} Days ({shipment.riskDriver})
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Net Financial Exposure</span>
              <p className="font-mono text-xs font-bold text-red-300">
                ${shipment.financialImpact.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Section 1: AI Root Cause Analysis */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  1. AI Root Cause Analysis (Multi-Modal Telemetry)
                </h3>
              </div>

              {onOpenPromptLab && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenPromptLab(shipment.id, 0);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 transition-all"
                  title="Test all 8 prompts for this consignment in Google AI Studio Prompt Hub"
                >
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                  <span>Google AI Studio Prompts</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>

            <p className="text-xs leading-relaxed text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              {shipment.rootCauseAnalysis.summary}
            </p>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {shipment.rootCauseAnalysis.telemetryData.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 rounded bg-slate-800/40 px-2.5 py-1.5 text-[11px] text-slate-300 border border-slate-700/40">
                  <Radio className="h-3 w-3 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between rounded-lg bg-red-950/30 border border-red-900/40 px-3 py-2 text-xs">
              <span className="text-red-300 font-medium flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                Factory Stoppage Alert: {shipment.rootCauseAnalysis.factoryIdleRisk}
              </span>
              <span className="font-mono font-bold text-red-400">
                Buffer: {shipment.rootCauseAnalysis.inventoryBufferRemainingDays}d remaining
              </span>
            </div>
          </div>

          {/* Section 2: Financial Impact Breakdown */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                2. Financial Impact Breakdown (Cost of Inaction)
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5">
                <span className="text-[10px] text-slate-400 uppercase">Production Downtime</span>
                <p className="font-mono text-sm font-bold text-red-400">
                  ${shipment.rootCauseAnalysis.financialBreakdown.productionDowntimeCost.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5">
                <span className="text-[10px] text-slate-400 uppercase">Expedited Logistics</span>
                <p className="font-mono text-sm font-bold text-amber-400">
                  ${shipment.rootCauseAnalysis.financialBreakdown.expeditedFreightCost.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5">
                <span className="text-[10px] text-slate-400 uppercase">OEM SLA Penalties</span>
                <p className="font-mono text-sm font-bold text-slate-200">
                  ${shipment.rootCauseAnalysis.financialBreakdown.slaPenaltyCost.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5">
                <span className="text-[10px] text-slate-400 uppercase">Inventory Carrying</span>
                <p className="font-mono text-sm font-bold text-slate-300">
                  ${shipment.rootCauseAnalysis.financialBreakdown.inventoryHoldingCost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: 3 AI Actionable Recommendations */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  3. Actionable AI Recommendations (Select One to Trigger)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                Click a card to designate for execution
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {shipment.mitigationOptions.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/30 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/10'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-bold ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {opt.id}
                        </span>

                        {opt.recommended && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
                            Recommended
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-bold text-white mb-1.5">
                        {opt.title}
                      </h4>

                      <p className="text-[11px] text-slate-300 leading-normal mb-3">
                        {opt.strategy}
                      </p>
                    </div>

                    <div className="border-t border-slate-800/80 pt-2.5 space-y-1 text-[11px] font-mono">
                      <div className="flex items-center justify-between text-emerald-400">
                        <span>Delay Recovery:</span>
                        <span className="font-bold">-{opt.delayReductionDays} Days</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Expedited Cost:</span>
                        <span>+${opt.costEstimate.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-blue-400">
                        <span>AI Confidence:</span>
                        <span>{opt.confidenceScore}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedOption && (
              <div className="mt-3 rounded-lg bg-blue-950/40 border border-blue-800/50 p-3 text-xs text-blue-200">
                <span className="font-bold text-blue-300">Selected SAP Action:</span>{' '}
                <span className="font-mono text-xs text-cyan-300">{selectedOption.sapAction}</span>
              </div>
            )}
          </div>

          {/* Section 4: One-Click Execution & Workflow Log Simulation */}
          {isExecutingWorkflow || workflowSuccess ? (
            <div className="rounded-xl border border-blue-500/40 bg-slate-950/80 p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className={`h-4 w-4 text-blue-400 ${isExecutingWorkflow ? 'animate-spin' : ''}`} />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    {isExecutingWorkflow ? 'Automating SAP S/4HANA Workflow Execution...' : 'SAP Workflow Execution Complete!'}
                  </h4>
                </div>

                {workflowSuccess && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="h-3.5 w-3.5" /> IDoc Dispatched
                  </span>
                )}
              </div>

              {/* Progress Steps */}
              <div className="space-y-3">
                {workflowSteps.map((step, idx) => {
                  const isDone = idx <= activeStepIndex || workflowSuccess;
                  const isCurrent = idx === activeStepIndex && isExecutingWorkflow;

                  return (
                    <div 
                      key={step.id} 
                      className={`flex items-start gap-3 rounded-lg p-2.5 transition-all text-xs ${
                        isDone ? 'bg-slate-900/80 border border-slate-800' : 'opacity-40'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <div className="h-4 w-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-slate-600" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">{step.title}</span>
                          <span className="font-mono text-[10px] text-blue-400">{step.system}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{step.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {workflowSuccess && generatedSapDocId && (
                <div className="mt-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 p-3.5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-emerald-300 font-bold block">
                        SAP Confirmation Document Issued:
                      </span>
                      <span className="font-mono text-sm font-extrabold text-white tracking-wider">
                        {generatedSapDocId}
                      </span>
                    </div>
                    <div className="text-right text-[11px] text-emerald-400">
                      Supplier EDI Acknowledgment Logged &bull; SAP TM Lock Confirmed
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-[#0f172a] px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {workflowSuccess ? 'Close Panel' : 'Cancel'}
          </button>

          {!workflowSuccess && (
            <button
              onClick={handleTriggerSapWorkflow}
              disabled={isExecutingWorkflow}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {isExecutingWorkflow ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing SAP Workflow...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Auto-Trigger SAP Workflow & Notify Supplier</span>
                </>
              )}
            </button>
          )}

          {workflowSuccess && (
            <button
              onClick={onClose}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-500/20"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Done (Mitigation Applied to S/4HANA)</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
