// ============================================================
// KPI UX Performance Tracker — Calculation Engine
// ============================================================

import type {
  Project,
  RoleType,
  RoleKPIs,
  ProductKPIs,
  TrackerConfig,
  KPIResult,
  ExecutiveSummary,
} from "./types";
import { DEFAULT_CONFIG } from "./types";

// ============================================================
// Core KPI Calculations
// ============================================================

export function calculateThroughput(
  totalViews: number,
  workHours: number
): number {
  if (workHours === 0) return 0;
  return parseFloat((totalViews / workHours).toFixed(3));
}

export function calculateWeightedThroughput(
  mainViews: number,
  responsiveViews: number,
  extraStateViews: number,
  workHours: number,
  config: TrackerConfig = DEFAULT_CONFIG
): number {
  if (workHours === 0) return 0;
  const weighted =
    mainViews +
    responsiveViews * config.weights.responsiveFactor +
    extraStateViews * config.weights.extraStateFactor;
  return parseFloat((weighted / workHours).toFixed(3));
}

export function calculateFlowVelocity(
  totalViews: number,
  daysElapsed: number
): number {
  if (daysElapsed === 0) return 0;
  return parseFloat((totalViews / daysElapsed).toFixed(3));
}

export function calculateReworkRate(
  correctedViews: number,
  totalDeliveredViews: number
): number {
  if (totalDeliveredViews === 0) return 0;
  return parseFloat(((correctedViews / totalDeliveredViews) * 100).toFixed(1));
}

export function calculateConnectionIndex(
  connectedViews: number,
  totalAssignedViews: number
): number {
  if (totalAssignedViews === 0) return 0;
  return parseFloat(((connectedViews / totalAssignedViews) * 100).toFixed(1));
}

export function calculateResearchEfficiency(
  researchHours: number,
  totalRoleHours: number
): number {
  if (totalRoleHours === 0) return 0;
  return parseFloat(((researchHours / totalRoleHours) * 100).toFixed(1));
}

export function calculateEffectiveCapacity(
  weightedViews: number,
  reworkRate: number,
  workHours: number
): number {
  if (workHours === 0) return 0;
  const reworkDecimal = reworkRate / 100;
  return parseFloat(
    ((weightedViews * (1 - reworkDecimal)) / workHours).toFixed(3)
  );
}

export function calculateEstimationAccuracy(
  realHours: number,
  estimatedHours: number
): number {
  if (estimatedHours === 0) return 0;
  const accuracy =
    (1 - Math.abs(realHours - estimatedHours) / estimatedHours) * 100;
  return parseFloat(Math.max(0, accuracy).toFixed(1));
}

export function calculateEstimationDeviation(
  realHours: number,
  estimatedHours: number
): number {
  if (estimatedHours === 0) return 0;
  return parseFloat(
    (((realHours - estimatedHours) / estimatedHours) * 100).toFixed(1)
  );
}

export function calculateDesignSystemCoverage(
  reusedComponents: number,
  totalComponents: number
): number {
  if (totalComponents === 0) return 0;
  return parseFloat(((reusedComponents / totalComponents) * 100).toFixed(1));
}

// ============================================================
// Role-level helpers
// ============================================================

function getRoleTotalHours(project: Project, role: RoleType): number {
  const r = project.roles[role];
  if (!r.participated) return 0;
  return (
    r.designHours +
    r.adjustmentHours +
    r.connectionHours +
    r.fileOrgHours +
    r.researchHours
  );
}

function getRoleTotalViews(project: Project, role: RoleType): number {
  const r = project.roles[role];
  if (!r.participated) return 0;
  return r.mainViews + r.responsiveViews + r.extraStateViews;
}

// ============================================================
// Aggregate KPIs by Role
// ============================================================

export function calculateRoleKPIs(
  projects: Project[],
  role: RoleType,
  config: TrackerConfig = DEFAULT_CONFIG
): RoleKPIs {
  const participating = projects.filter((p) => p.roles[role].participated);

  if (participating.length === 0) {
    return {
      role,
      totalHours: 0,
      avgHoursPerProject: 0,
      avgResearchHours: 0,
      researchParticipationRate: 0,
      throughput: 0,
      weightedThroughput: 0,
      reworkRate: 0,
      qualityScore: 0,
      connectionIndex: 0,
      avgRevisions: 0,
      onTimeDeliveryRate: 0,
      effectiveCapacity: 0,
      estimationAccuracy: 0,
      projectCount: 0,
    };
  }

  const totalHours = participating.reduce(
    (sum, p) => sum + getRoleTotalHours(p, role),
    0
  );
  const totalResearchHours = participating.reduce(
    (sum, p) => sum + p.roles[role].researchHours,
    0
  );
  const researchProjects = participating.filter(
    (p) => p.roles[role].participatedInResearch
  ).length;

  // Aggregate views
  const totalMainViews = participating.reduce(
    (sum, p) => sum + p.roles[role].mainViews,
    0
  );
  const totalResponsiveViews = participating.reduce(
    (sum, p) => sum + p.roles[role].responsiveViews,
    0
  );
  const totalExtraViews = participating.reduce(
    (sum, p) => sum + p.roles[role].extraStateViews,
    0
  );
  const totalCorrectedViews = participating.reduce(
    (sum, p) => sum + p.roles[role].correctedViews,
    0
  );
  const totalAssignedViews = participating.reduce(
    (sum, p) => sum + p.roles[role].totalAssignedViews,
    0
  );
  const totalConnectedViews = participating.reduce(
    (sum, p) => sum + p.roles[role].connectedViews,
    0
  );
  const totalDeliveredViews =
    totalMainViews + totalResponsiveViews + totalExtraViews;

  const throughput = calculateThroughput(totalDeliveredViews, totalHours);
  const weightedThroughput = calculateWeightedThroughput(
    totalMainViews,
    totalResponsiveViews,
    totalExtraViews,
    totalHours,
    config
  );
  const reworkRate = calculateReworkRate(totalCorrectedViews, totalDeliveredViews);
  const connectionIndex = calculateConnectionIndex(totalConnectedViews, totalAssignedViews);

  const avgQuality =
    participating.reduce((sum, p) => sum + p.roles[role].qualityScore, 0) /
    participating.length;
  const avgRevisions =
    participating.reduce(
      (sum, p) => sum + p.roles[role].revisionsReceived,
      0
    ) / participating.length;
  const onTimeCount = participating.filter(
    (p) => p.roles[role].deliveredOnTime
  ).length;
  const onTimeRate = (onTimeCount / participating.length) * 100;

  const weightedViews =
    totalMainViews +
    totalResponsiveViews * config.weights.responsiveFactor +
    totalExtraViews * config.weights.extraStateFactor;
  const effectiveCapacity = calculateEffectiveCapacity(
    weightedViews,
    reworkRate,
    totalHours
  );

  // Estimation accuracy (project level, averaged)
  const withEstimates = projects.filter(
    (p) => p.totalEstimatedHours > 0 && p.totalRealHours > 0
  );
  const estimationAccuracy =
    withEstimates.length > 0
      ? withEstimates.reduce(
          (sum, p) =>
            sum +
            calculateEstimationAccuracy(p.totalRealHours, p.totalEstimatedHours),
          0
        ) / withEstimates.length
      : 0;

  return {
    role,
    totalHours,
    avgHoursPerProject: totalHours / participating.length,
    avgResearchHours: totalResearchHours / participating.length,
    researchParticipationRate: (researchProjects / participating.length) * 100,
    throughput,
    weightedThroughput,
    reworkRate,
    qualityScore: parseFloat(avgQuality.toFixed(1)),
    connectionIndex,
    avgRevisions: parseFloat(avgRevisions.toFixed(1)),
    onTimeDeliveryRate: parseFloat(onTimeRate.toFixed(1)),
    effectiveCapacity,
    estimationAccuracy,
    projectCount: participating.length,
  };
}

// ============================================================
// Aggregate KPIs by Product
// ============================================================

export function calculateProductKPIs(
  projects: Project[],
  config: TrackerConfig = DEFAULT_CONFIG
): ProductKPIs[] {
  const productMap = new Map<string, Project[]>();
  for (const p of projects) {
    const list = productMap.get(p.productName) || [];
    list.push(p);
    productMap.set(p.productName, list);
  }

  return Array.from(productMap.entries()).map(([productName, projs]) => {
    const totalHours = projs.reduce((s, p) => s + p.totalRealHours, 0);
    const researchHours = projs.reduce((s, p) => {
      const roles: RoleType[] = ["Junior", "Senior", "Líder UX"];
      return (
        s +
        roles.reduce(
          (rs, r) =>
            rs + (p.roles[r].participated ? p.roles[r].researchHours : 0),
          0
        )
      );
    }, 0);

    const roles: RoleType[] = ["Junior", "Senior", "Líder UX"];
    let totalMainViews = 0,
      totalResponsiveViews = 0,
      totalExtraViews = 0,
      totalCorrectedViews = 0,
      totalConnectedViews = 0,
      totalAssignedViews = 0;

    for (const p of projs) {
      for (const r of roles) {
        if (!p.roles[r].participated) continue;
        totalMainViews += p.roles[r].mainViews;
        totalResponsiveViews += p.roles[r].responsiveViews;
        totalExtraViews += p.roles[r].extraStateViews;
        totalCorrectedViews += p.roles[r].correctedViews;
        totalConnectedViews += p.roles[r].connectedViews;
        totalAssignedViews += p.roles[r].totalAssignedViews;
      }
    }

    const totalViews = totalMainViews + totalResponsiveViews + totalExtraViews;
    const throughput = calculateThroughput(totalViews, totalHours);
    const qualityScores = projs.flatMap((p) =>
      roles
        .filter((r) => p.roles[r].participated)
        .map((r) => p.roles[r].qualityScore)
    );
    const qualityScore =
      qualityScores.length > 0
        ? qualityScores.reduce((s, v) => s + v, 0) / qualityScores.length
        : 0;
    const reworkRate = calculateReworkRate(totalCorrectedViews, totalViews);
    const connectionIndex = calculateConnectionIndex(
      totalConnectedViews,
      totalAssignedViews
    );
    const onTimeCount = projs.reduce((s, p) => {
      const delivered = roles.filter(
        (r) => p.roles[r].participated && p.roles[r].deliveredOnTime
      ).length;
      const total = roles.filter((r) => p.roles[r].participated).length;
      return s + (total > 0 ? delivered / total : 0);
    }, 0);
    const onTimeRate = projs.length > 0 ? (onTimeCount / projs.length) * 100 : 0;

    const weightedViews =
      totalMainViews +
      totalResponsiveViews * config.weights.responsiveFactor +
      totalExtraViews * config.weights.extraStateFactor;
    const effectiveCapacity = calculateEffectiveCapacity(
      weightedViews,
      reworkRate,
      totalHours
    );

    const withEstimates = projs.filter(
      (p) => p.totalEstimatedHours > 0 && p.totalRealHours > 0
    );
    const estimationDeviation =
      withEstimates.length > 0
        ? withEstimates.reduce(
            (s, p) =>
              s + calculateEstimationDeviation(p.totalRealHours, p.totalEstimatedHours),
            0
          ) / withEstimates.length
        : 0;

    // Health status
    let healthScore = 0;
    if (reworkRate <= config.kpiRanges.reworkRate.healthy) healthScore++;
    if (qualityScore >= config.kpiRanges.qualityScore.healthy) healthScore++;
    if (onTimeRate >= config.kpiRanges.onTimeRate.healthy) healthScore++;
    if (connectionIndex >= config.kpiRanges.connectionIndex.healthy) healthScore++;
    if (Math.abs(estimationDeviation) <= 20) healthScore++;

    const healthStatus: "healthy" | "warning" | "critical" =
      healthScore >= 4 ? "healthy" : healthScore >= 2 ? "warning" : "critical";
    const healthReason =
      healthStatus === "healthy"
        ? "KPIs dentro de rangos saludables."
        : healthStatus === "warning"
        ? reworkRate > config.kpiRanges.reworkRate.warning
          ? "Retrabajo elevado detectado."
          : onTimeRate < config.kpiRanges.onTimeRate.warning
          ? "Baja tasa de entrega a tiempo."
          : "Algunos KPIs requieren atención."
        : "Múltiples KPIs fuera de rango. Requiere intervención.";

    return {
      productName,
      projectCount: projs.length,
      totalHours,
      researchHours,
      totalViews,
      throughput,
      qualityScore: parseFloat(qualityScore.toFixed(1)),
      reworkRate,
      connectionIndex,
      onTimeRate: parseFloat(onTimeRate.toFixed(1)),
      effectiveCapacity,
      estimationDeviation: parseFloat(estimationDeviation.toFixed(1)),
      healthStatus,
      healthReason,
    };
  });
}

// ============================================================
// Dashboard Summary Stats
// ============================================================

export function calculateDashboardStats(
  projects: Project[],
  config: TrackerConfig = DEFAULT_CONFIG
) {
  if (projects.length === 0) {
    return {
      totalProjects: 0,
      totalProducts: 0,
      totalFlows: 0,
      totalHours: 0,
      totalResearchHours: 0,
      totalViews: 0,
      avgRework: 0,
      avgQuality: 0,
      avgConnection: 0,
      avgOnTime: 0,
      totalEffectiveCapacity: 0,
      estimationAccuracy: 0,
    };
  }

  const roles: RoleType[] = ["Junior", "Senior", "Líder UX"];
  let totalHours = 0,
    totalResearchHours = 0,
    totalMainViews = 0,
    totalResponsiveViews = 0,
    totalExtraViews = 0,
    totalCorrectedViews = 0,
    totalConnectedViews = 0,
    totalAssignedViews = 0;
  let qualityScoreSum = 0,
    qualityCount = 0;
  let onTimeCount = 0,
    participatingCount = 0;

  for (const p of projects) {
    totalHours += p.totalRealHours;
    for (const r of roles) {
      if (!p.roles[r].participated) continue;
      totalResearchHours += p.roles[r].researchHours;
      totalMainViews += p.roles[r].mainViews;
      totalResponsiveViews += p.roles[r].responsiveViews;
      totalExtraViews += p.roles[r].extraStateViews;
      totalCorrectedViews += p.roles[r].correctedViews;
      totalConnectedViews += p.roles[r].connectedViews;
      totalAssignedViews += p.roles[r].totalAssignedViews;
      if (p.roles[r].qualityScore > 0) {
        qualityScoreSum += p.roles[r].qualityScore;
        qualityCount++;
      }
      if (p.roles[r].deliveredOnTime) onTimeCount++;
      participatingCount++;
    }
  }

  const totalViews = totalMainViews + totalResponsiveViews + totalExtraViews;
  const avgRework = calculateReworkRate(totalCorrectedViews, totalViews);
  const avgConnection = calculateConnectionIndex(totalConnectedViews, totalAssignedViews);
  const avgQuality = qualityCount > 0 ? qualityScoreSum / qualityCount : 0;
  const avgOnTime =
    participatingCount > 0 ? (onTimeCount / participatingCount) * 100 : 0;

  const weightedViews =
    totalMainViews +
    totalResponsiveViews * config.weights.responsiveFactor +
    totalExtraViews * config.weights.extraStateFactor;
  const totalEffectiveCapacity = calculateEffectiveCapacity(
    weightedViews,
    avgRework,
    totalHours
  );

  const withEstimates = projects.filter(
    (p) => p.totalEstimatedHours > 0 && p.totalRealHours > 0
  );
  const estimationAccuracy =
    withEstimates.length > 0
      ? withEstimates.reduce(
          (s, p) =>
            s + calculateEstimationAccuracy(p.totalRealHours, p.totalEstimatedHours),
          0
        ) / withEstimates.length
      : 0;

  const products = new Set(projects.map((p) => p.productName));
  const flows = new Set(projects.map((p) => p.flowName));

  return {
    totalProjects: projects.length,
    totalProducts: products.size,
    totalFlows: flows.size,
    totalHours: parseFloat(totalHours.toFixed(1)),
    totalResearchHours: parseFloat(totalResearchHours.toFixed(1)),
    totalViews,
    avgRework: parseFloat(avgRework.toFixed(1)),
    avgQuality: parseFloat(avgQuality.toFixed(1)),
    avgConnection: parseFloat(avgConnection.toFixed(1)),
    avgOnTime: parseFloat(avgOnTime.toFixed(1)),
    totalEffectiveCapacity,
    estimationAccuracy: parseFloat(estimationAccuracy.toFixed(1)),
  };
}

// ============================================================
// Status helpers
// ============================================================

export function getPerformanceStatus(
  value: number,
  kpi: keyof TrackerConfig["kpiRanges"],
  config: TrackerConfig = DEFAULT_CONFIG,
  inversed = false
): "healthy" | "warning" | "critical" {
  const range = config.kpiRanges[kpi];
  if (inversed) {
    if (value <= range.healthy) return "healthy";
    if (value <= range.warning) return "warning";
    return "critical";
  } else {
    if (value >= range.healthy) return "healthy";
    if (value >= range.warning) return "warning";
    return "critical";
  }
}

export function getKpiStatusColor(
  status: "healthy" | "warning" | "critical" | "neutral"
): string {
  switch (status) {
    case "healthy":
      return "text-emerald-400";
    case "warning":
      return "text-amber-400";
    case "critical":
      return "text-red-400";
    default:
      return "text-slate-400";
  }
}

export function getKpiBadgeColor(
  status: "healthy" | "warning" | "critical" | "neutral"
): string {
  switch (status) {
    case "healthy":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "warning":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "critical":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    default:
      return "bg-slate-500/15 text-slate-400 border-slate-500/30";
  }
}

// ============================================================
// Executive Summary Generator
// ============================================================

export function generateExecutiveSummary(
  projects: Project[],
  config: TrackerConfig = DEFAULT_CONFIG
): ExecutiveSummary {
  const roles: RoleType[] = ["Junior", "Senior", "Líder UX"];
  const roleKPIs = roles.map((r) => calculateRoleKPIs(projects, r, config));
  const productKPIs = calculateProductKPIs(projects, config);

  // Overall health
  const overallRework =
    roleKPIs.reduce((s, r) => s + r.reworkRate, 0) / roleKPIs.length;
  const overallQuality =
    roleKPIs.reduce((s, r) => s + r.qualityScore, 0) / roleKPIs.length;
  const overallOnTime =
    roleKPIs.reduce((s, r) => s + r.onTimeDeliveryRate, 0) / roleKPIs.length;

  let teamStatus: "healthy" | "warning" | "critical" = "healthy";
  if (overallRework > 30 || overallQuality < 6 || overallOnTime < 60)
    teamStatus = "critical";
  else if (overallRework > 20 || overallQuality < 7.5 || overallOnTime < 80)
    teamStatus = "warning";

  // Best/worst roles
  const byEfficiency = [...roleKPIs].sort(
    (a, b) => b.effectiveCapacity - a.effectiveCapacity
  );
  const byRework = [...roleKPIs].sort((a, b) => b.reworkRate - a.reworkRate);
  const byEstimation = [...roleKPIs].sort(
    (a, b) => b.estimationAccuracy - a.estimationAccuracy
  );

  const mostEfficientRole = byEfficiency[0]?.role ?? "Senior";
  const highestReworkRole = byRework[0]?.role ?? "Junior";
  const bestEstimationRole = byEstimation[0]?.role ?? "Líder UX";

  // Best/worst products
  const byHealth = [...productKPIs].sort((a, b) =>
    a.healthStatus === "healthy" ? -1 : b.healthStatus === "healthy" ? 1 : 0
  );
  const byDeviation = [...productKPIs].sort(
    (a, b) => Math.abs(b.estimationDeviation) - Math.abs(a.estimationDeviation)
  );
  const healthiestProduct = byHealth[0]?.productName ?? "N/A";
  const mostDeviatedProduct = byDeviation[0]?.productName ?? "N/A";

  // Available capacity (sum effective capacity)
  const availableCapacity = roleKPIs.reduce(
    (s, r) => s + r.effectiveCapacity,
    0
  );

  // Strength and bottleneck
  const mainStrength =
    overallQuality >= 8
      ? "Alta calidad percibida por stakeholders"
      : overallOnTime >= 85
      ? "Excelente tasa de entrega a tiempo"
      : "Throughput constante del equipo";

  const mainBottleneck =
    overallRework > 25
      ? "Alta tasa de retrabajo que impacta capacidad efectiva"
      : overallOnTime < 70
      ? "Baja tasa de entrega a tiempo"
      : "Precisión de estimación mejorable";

  const insights: string[] = [
    `El ${highestReworkRole} registra el mayor retrabajo (${byRework[0]?.reworkRate.toFixed(1)}%), lo que sugiere oportunidad de mejora en validación temprana.`,
    `El ${mostEfficientRole} muestra la mayor capacidad efectiva del equipo.`,
    `La precisión de estimación promedio del equipo es del ${(roleKPIs.reduce((s, r) => s + r.estimationAccuracy, 0) / roleKPIs.length).toFixed(0)}%.`,
    projects.length < 5
      ? "El histórico es limitado. Las estimaciones mejorarán con más proyectos registrados."
      : `Con ${projects.length} proyectos registrados, el estimador tiene base histórica confiable.`,
    `Producto con mayor desviación de estimación: ${mostDeviatedProduct}.`,
  ];

  return {
    teamStatus,
    availableCapacity: parseFloat(availableCapacity.toFixed(2)),
    mainStrength,
    mainBottleneck,
    mostEfficientRole,
    highestReworkRole,
    bestEstimationRole,
    healthiestProduct,
    mostDeviatedProduct,
    workloadRecommendation: `Priorizar asignación de flujos complejos al ${mostEfficientRole}. El ${highestReworkRole} se beneficia de acompañamiento en proyectos de alta complejidad.`,
    researchRecommendation: `Se recomienda que el ${highestReworkRole} participe en discovery acompañado por ${bestEstimationRole} para reducir retrabajo por falta de claridad inicial.`,
    insights,
    executiveReading: `El equipo UX se encuentra en estado ${
      teamStatus === "healthy"
        ? "saludable"
        : teamStatus === "warning"
        ? "de atención"
        : "crítico"
    }. Calidad promedio: ${overallQuality.toFixed(1)}/10. Retrabajo promedio: ${overallRework.toFixed(1)}%. Entrega a tiempo: ${overallOnTime.toFixed(0)}%.`,
    conclusions: [
      `Con ${projects.length} proyectos registrados, el equipo muestra ${teamStatus === "healthy" ? "consistencia positiva" : "áreas de mejora identificadas"}.`,
      `El ${bestEstimationRole} lidera en precisión de estimación, lo que lo convierte en referencia para planificación de capacidad.`,
      `Registrar horas de investigación por rol mejora la calidad predictiva del estimador.`,
    ],
  };
}
