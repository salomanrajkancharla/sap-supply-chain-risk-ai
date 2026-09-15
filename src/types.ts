export type RiskLevel = 'critical' | 'medium' | 'low';

export type RiskDriver = 
  | 'Typhoon / Port Congestion'
  | 'Rail Labor Strike'
  | 'Route Weather Impact'
  | 'Suez Canal Chokepoint'
  | 'Terminal Automation Glitch'
  | 'Customs Clearance Queue'
  | 'Nominal Conditions';

export interface MitigationOption {
  id: 'A' | 'B' | 'C';
  title: string;
  strategy: string;
  delayReductionDays: number;
  costEstimate: number;
  confidenceScore: number;
  sapAction: string;
  recommended?: boolean;
}

export interface Shipment {
  id: string;
  material: string;
  poNumber: string;
  supplier: string;
  supplierLocation: string;
  origin: string;
  destination: string;
  route: string;
  predictedDelayDays: number;
  financialImpact: number;
  riskLevel: RiskLevel;
  riskDriver: RiskDriver;
  transportMode: 'Maritime' | 'Rail' | 'Road' | 'Air';
  status: 'In Transit' | 'Port Delayed' | 'Customs Hold' | 'Mitigation Pending' | 'SAP Workflow Active' | 'Mitigated';
  sapDocumentId?: string;
  lastUpdated: string;
  coordinates: {
    origin: [number, number]; // [lat, lng]
    current: [number, number];
    destination: [number, number];
  };
  rootCauseAnalysis: {
    summary: string;
    telemetryData: string[];
    inventoryBufferRemainingDays: number;
    factoryIdleRisk: string;
    financialBreakdown: {
      productionDowntimeCost: number;
      expeditedFreightCost: number;
      slaPenaltyCost: number;
      inventoryHoldingCost: number;
    };
  };
  mitigationOptions: MitigationOption[];
}

export interface QuickMetrics {
  totalActiveShipments: number;
  highRiskAlerts: number;
  preventedLossesMillions: number;
  healthScore: number;
  supplierPerformanceIndex: number;
  meanTimeToResolutionHours: number;
  connectedSystem: string;
  latencyMs: number;
}

export interface SAPWorkflowStep {
  id: number;
  title: string;
  system: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp?: string;
  details: string;
}
