// ============================================================
// KPI UX Performance Tracker — Core Types
// ============================================================

export type Platform = "Mobile" | "Web" | "Ambos";
export type Complexity = "Baja" | "Media" | "Alta";
export type WorkType = "Nuevo flujo" | "Mejora" | "Ajuste" | "Copia/adaptación" | "Corrección";
export type ProjectStatus = "En proceso" | "Entregado" | "Aprobado" | "Requiere ajustes";
export type RoleType = "Junior" | "Senior" | "Líder UX";
export type ResearchType = "entrevista" | "análisis" | "revisión de hallazgos" | "definición funcional" | "benchmark" | "otro";

export interface RoleData {
  participated: boolean;
  // Design hours
  designHours: number;
  adjustmentHours: number;
  connectionHours: number;
  fileOrgHours: number;
  // Research
  participatedInResearch: boolean;
  researchHours: number;
  researchTypes: ResearchType[];
  // Production
  mainViews: number;
  responsiveViews: number;
  extraStateViews: number;
  correctedViews: number;
  totalAssignedViews: number;
  connectedViews: number;
  // Quality
  revisionsReceived: number;
  qualityScore: number; // 1-10
  deliveredOnTime: boolean;
  // Notes
  observations: string;
  blockers: string;
  dependencies: string;
}

export interface DesignSystemData {
  reusedComponents: number;
  newComponents: number;
  totalComponents: number;
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  // General
  productName: string;
  projectName: string;
  flowName: string;
  startDate: string;
  endDate: string;
  platform: Platform;
  complexity: Complexity;
  workType: WorkType;
  status: ProjectStatus;
  // Roles
  roles: Record<RoleType, RoleData>;
  // Design system
  designSystem: DesignSystemData;
  // Global timing
  totalRealHours: number;
  totalEstimatedHours: number;
  manualDeviation?: number;
  generalNotes: string;
}

// ============================================================
// KPI Result Types
// ============================================================

export interface KPIResult {
  value: number;
  label: string;
  unit: "%" | "vistas/hora" | "horas" | "score" | "número";
  status: "healthy" | "warning" | "critical" | "neutral";
  interpretation: string;
}

export interface RoleKPIs {
  role: RoleType;
  totalHours: number;
  avgHoursPerProject: number;
  avgResearchHours: number;
  researchParticipationRate: number;
  throughput: number;
  weightedThroughput: number;
  reworkRate: number;
  qualityScore: number;
  connectionIndex: number;
  avgRevisions: number;
  onTimeDeliveryRate: number;
  effectiveCapacity: number;
  estimationAccuracy: number;
  projectCount: number;
}

export interface ProductKPIs {
  productName: string;
  projectCount: number;
  totalHours: number;
  researchHours: number;
  totalViews: number;
  throughput: number;
  qualityScore: number;
  reworkRate: number;
  connectionIndex: number;
  onTimeRate: number;
  effectiveCapacity: number;
  estimationDeviation: number;
  healthStatus: "healthy" | "warning" | "critical";
  healthReason: string;
}

// ============================================================
// Estimator Types
// ============================================================

export interface EstimatorInput {
  productName: string;
  workType: WorkType;
  platform: Platform;
  complexity: Complexity;
  mainViews: number;
  responsiveViews: number;
  extraStateViews: number;
  requiresFlowConnection: boolean;
  requiresDiscovery: boolean;
  requirementClarity: "bajo" | "medio" | "alto";
  roles: {
    junior: boolean;
    senior: boolean;
    lider: boolean;
  };
  roleParticipation: {
    junior: { percentage: number; participatesInResearch: boolean };
    senior: { percentage: number; participatesInResearch: boolean };
    lider: { percentage: number; participatesInResearch: boolean };
  };
}

export interface EstimationResult {
  base: number;
  conservative: number;
  probable: number;
  optimistic: number;
  byRole: Record<string, { design: number; research: number; total: number }>;
  reworkRisk: number;
  deliveryRangeDays: { min: number; max: number };
  confidence: number;
  similarProjectsUsed: number;
  methodology: string;
  keyFactors: string[];
}

// ============================================================
// Configuration / Settings
// ============================================================

export interface TrackerConfig {
  weights: {
    responsiveFactor: number;
    extraStateFactor: number;
  };
  kpiRanges: {
    throughput: { healthy: number; warning: number };
    reworkRate: { healthy: number; warning: number };
    connectionIndex: { healthy: number; warning: number };
    qualityScore: { healthy: number; warning: number };
    onTimeRate: { healthy: number; warning: number };
    effectiveCapacity: { healthy: number; warning: number };
    estimationAccuracy: { healthy: number; warning: number };
  };
  goals: {
    maxReworkRate: number;
    minQualityScore: number;
    minOnTimeRate: number;
    minConnectionIndex: number;
    minEstimationAccuracy: number;
  };
}

export const DEFAULT_CONFIG: TrackerConfig = {
  weights: {
    responsiveFactor: 0.75,
    extraStateFactor: 0.5,
  },
  kpiRanges: {
    throughput: { healthy: 1.5, warning: 0.8 },
    reworkRate: { healthy: 15, warning: 30 },
    connectionIndex: { healthy: 85, warning: 65 },
    qualityScore: { healthy: 8, warning: 6 },
    onTimeRate: { healthy: 80, warning: 60 },
    effectiveCapacity: { healthy: 1.2, warning: 0.7 },
    estimationAccuracy: { healthy: 80, warning: 60 },
  },
  goals: {
    maxReworkRate: 20,
    minQualityScore: 7.5,
    minOnTimeRate: 80,
    minConnectionIndex: 80,
    minEstimationAccuracy: 75,
  },
};

// ============================================================
// Executive Summary
// ============================================================

export interface ExecutiveSummary {
  teamStatus: "healthy" | "warning" | "critical";
  availableCapacity: number;
  mainStrength: string;
  mainBottleneck: string;
  mostEfficientRole: RoleType;
  highestReworkRole: RoleType;
  bestEstimationRole: RoleType;
  healthiestProduct: string;
  mostDeviatedProduct: string;
  workloadRecommendation: string;
  researchRecommendation: string;
  insights: string[];
  executiveReading: string;
  conclusions: string[];
}
