// ============================================================
// KPI UX Performance Tracker — Estimator Logic
// ============================================================

import type {
  Project,
  EstimatorInput,
  EstimationResult,
  RoleType,
  TrackerConfig,
} from "./types";
import { DEFAULT_CONFIG } from "./types";
import { calculateEstimationAccuracy } from "./calculations";

// ============================================================
// Similarity scoring
// ============================================================

function projectSimilarityScore(project: Project, input: EstimatorInput): number {
  let score = 0;
  if (project.complexity === input.complexity) score += 3;
  if (project.workType === input.workType) score += 2;
  if (project.platform === input.platform) score += 1;
  // View count proximity
  const totalInputViews =
    input.mainViews + input.responsiveViews + input.extraStateViews;
  const roles: RoleType[] = ["Junior", "Senior", "Líder UX"];
  let totalProjectViews = 0;
  for (const r of roles) {
    if (project.roles[r].participated) {
      totalProjectViews +=
        project.roles[r].mainViews +
        project.roles[r].responsiveViews +
        project.roles[r].extraStateViews;
    }
  }
  const viewDiff = Math.abs(totalInputViews - totalProjectViews);
  if (viewDiff <= 5) score += 2;
  else if (viewDiff <= 15) score += 1;
  return score;
}

export function getSimilarProjects(
  projects: Project[],
  input: EstimatorInput,
  minScore = 3
): Project[] {
  return projects
    .map((p) => ({ project: p, score: projectSimilarityScore(p, input) }))
    .filter((x) => x.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.project);
}

// ============================================================
// Estimation engine
// ============================================================

function avgHoursByRole(
  projects: Project[],
  role: RoleType
): number {
  const participating = projects.filter((p) => p.roles[role].participated);
  if (participating.length === 0) return 0;
  return (
    participating.reduce((s, p) => {
      const r = p.roles[role];
      return (
        s +
        r.designHours +
        r.adjustmentHours +
        r.connectionHours +
        r.fileOrgHours
      );
    }, 0) / participating.length
  );
}

function avgResearchHoursByRole(projects: Project[], role: RoleType): number {
  const withResearch = projects.filter(
    (p) => p.roles[role].participated && p.roles[role].participatedInResearch
  );
  if (withResearch.length === 0) return 0;
  return (
    withResearch.reduce((s, p) => s + p.roles[role].researchHours, 0) /
    withResearch.length
  );
}

function avgReworkRate(projects: Project[]): number {
  const roles: RoleType[] = ["Junior", "Senior", "Líder UX"];
  let totalCorrected = 0,
    totalViews = 0;
  for (const p of projects) {
    for (const r of roles) {
      if (!p.roles[r].participated) continue;
      totalCorrected += p.roles[r].correctedViews;
      totalViews +=
        p.roles[r].mainViews +
        p.roles[r].responsiveViews +
        p.roles[r].extraStateViews;
    }
  }
  return totalViews > 0 ? totalCorrected / totalViews : 0.2;
}

// Complexity multipliers
const COMPLEXITY_MULTIPLIERS: Record<string, number> = {
  Baja: 0.7,
  Media: 1.0,
  Alta: 1.5,
};

// Work type multipliers
const WORK_TYPE_MULTIPLIERS: Record<string, number> = {
  "Copia/adaptación": 0.5,
  Corrección: 0.6,
  Ajuste: 0.75,
  Mejora: 1.0,
  "Nuevo flujo": 1.3,
};

// Platform multipliers
const PLATFORM_MULTIPLIERS: Record<string, number> = {
  Mobile: 1.0,
  Web: 1.1,
  Ambos: 1.5,
};

// Clarity impact
const CLARITY_MULTIPLIERS: Record<string, number> = {
  alto: 1.0,
  medio: 1.15,
  bajo: 1.35,
};

export function estimateProjectHours(
  projects: Project[],
  input: EstimatorInput,
  config: TrackerConfig = DEFAULT_CONFIG
): EstimationResult {
  const similar = getSimilarProjects(projects, input, 3);
  const basePool = similar.length >= 3 ? similar : projects;

  const complexityMult = COMPLEXITY_MULTIPLIERS[input.complexity] ?? 1.0;
  const workTypeMult = WORK_TYPE_MULTIPLIERS[input.workType] ?? 1.0;
  const platformMult = PLATFORM_MULTIPLIERS[input.platform] ?? 1.0;
  const clarityMult = CLARITY_MULTIPLIERS[input.requirementClarity] ?? 1.0;

  const totalViews =
    input.mainViews + input.responsiveViews + input.extraStateViews;

  const roleMap: Record<string, "Junior" | "Senior" | "Líder UX"> = {
    junior: "Junior",
    senior: "Senior",
    lider: "Líder UX",
  };

  const byRole: Record<string, { design: number; research: number; total: number }> = {};
  let totalBase = 0;

  for (const [key, roleName] of Object.entries(roleMap)) {
    const participating = input.roles[key as keyof typeof input.roles];
    if (!participating) continue;

    const roleConfig = input.roleParticipation[key as keyof typeof input.roleParticipation];
    const pct = (roleConfig?.percentage ?? 100) / 100;

    // Base hours from history
    let baseDesign = avgHoursByRole(basePool, roleName);
    if (baseDesign === 0) {
      // Fallback formula: ~0.5h per view for junior, 0.4 for senior, 0.3 for lider
      const basePerView = roleName === "Junior" ? 0.5 : roleName === "Senior" ? 0.4 : 0.3;
      baseDesign = totalViews * basePerView;
    } else {
      // Scale by view count difference
      const avgViews = basePool.reduce((s, p) => {
        const rp = p.roles[roleName];
        return rp.participated
          ? s +
              rp.mainViews +
              rp.responsiveViews +
              rp.extraStateViews
          : s;
      }, 0) / (basePool.filter((p) => p.roles[roleName].participated).length || 1);
      if (avgViews > 0) {
        baseDesign = (baseDesign / avgViews) * totalViews;
      }
    }

    // Apply multipliers
    let designHours =
      baseDesign * complexityMult * workTypeMult * platformMult * clarityMult * pct;

    // Research hours
    let researchHours = 0;
    if (input.requiresDiscovery && roleConfig?.participatesInResearch) {
      const baseResearch = avgResearchHoursByRole(basePool, roleName);
      researchHours =
        baseResearch > 0
          ? baseResearch * complexityMult * pct
          : totalViews * 0.15 * pct;
    }

    // Connection hours
    if (input.requiresFlowConnection) {
      designHours *= 1.15;
    }

    designHours = Math.round(designHours * 10) / 10;
    researchHours = Math.round(researchHours * 10) / 10;
    const total = designHours + researchHours;
    byRole[roleName] = { design: designHours, research: researchHours, total };
    totalBase += total;
  }

  // Rework risk
  const reworkRate = avgReworkRate(basePool);
  const reworkRisk = parseFloat((reworkRate * 100).toFixed(1));

  // Ranges
  const conservative = Math.round(totalBase * 1.3 * 10) / 10;
  const probable = Math.round(totalBase * 1.1 * 10) / 10;
  const optimistic = Math.round(totalBase * 0.85 * 10) / 10;
  const base = Math.round(totalBase * 10) / 10;

  // Delivery days (assuming 6h effective/day per team)
  const effectiveHoursPerDay = 6;
  const deliveryMin = Math.ceil(optimistic / effectiveHoursPerDay);
  const deliveryMax = Math.ceil(conservative / effectiveHoursPerDay);

  // Confidence based on pool size
  const confidence =
    similar.length >= 5
      ? 85
      : similar.length >= 3
      ? 70
      : similar.length >= 1
      ? 55
      : 35;

  // Historical accuracy
  const withEstimates = projects.filter(
    (p) => p.totalEstimatedHours > 0 && p.totalRealHours > 0
  );
  const historicalAccuracy =
    withEstimates.length > 0
      ? withEstimates.reduce(
          (s, p) =>
            s + calculateEstimationAccuracy(p.totalRealHours, p.totalEstimatedHours),
          0
        ) / withEstimates.length
      : 0;

  const keyFactors: string[] = [];
  if (complexityMult > 1) keyFactors.push(`Complejidad ${input.complexity} (+${Math.round((complexityMult - 1) * 100)}%)`);
  if (workTypeMult > 1) keyFactors.push(`Tipo de trabajo: ${input.workType} (+${Math.round((workTypeMult - 1) * 100)}%)`);
  if (platformMult > 1) keyFactors.push(`Plataforma ${input.platform} (+${Math.round((platformMult - 1) * 100)}%)`);
  if (clarityMult > 1) keyFactors.push(`Claridad ${input.requirementClarity} del requerimiento (+${Math.round((clarityMult - 1) * 100)}%)`);
  if (input.requiresDiscovery) keyFactors.push("Incluye discovery/investigación");
  if (input.requiresFlowConnection) keyFactors.push("Requiere conexión de flujos (+15%)");

  return {
    base,
    conservative,
    probable,
    optimistic,
    byRole,
    reworkRisk,
    deliveryRangeDays: { min: deliveryMin, max: deliveryMax },
    confidence,
    similarProjectsUsed: similar.length,
    methodology: `Estimación basada en ${basePool.length} proyecto${basePool.length !== 1 ? "s" : ""} del historial (${similar.length >= 3 ? "proyectos similares priorizados" : "promedio general"}) con precisión histórica del ${historicalAccuracy.toFixed(0)}%.`,
    keyFactors,
  };
}

export function estimateResearchHoursByRole(
  projects: Project[],
  role: RoleType,
  complexity: string
): number {
  const mult = COMPLEXITY_MULTIPLIERS[complexity] ?? 1.0;
  const base = avgResearchHoursByRole(projects, role);
  return Math.round(base * mult * 10) / 10;
}

export function estimateDeliveryRange(
  totalHours: number
): { min: number; max: number } {
  const effectiveHoursPerDay = 6;
  return {
    min: Math.ceil((totalHours * 0.85) / effectiveHoursPerDay),
    max: Math.ceil((totalHours * 1.3) / effectiveHoursPerDay),
  };
}

export function getRolePerformanceSummary(
  projects: Project[],
  role: RoleType
): { avgHours: number; avgRework: number; avgQuality: number; projectCount: number } {
  const participating = projects.filter((p) => p.roles[role].participated);
  if (participating.length === 0) {
    return { avgHours: 0, avgRework: 0, avgQuality: 0, projectCount: 0 };
  }
  const avgHours =
    participating.reduce((s, p) => {
      const r = p.roles[role];
      return s + r.designHours + r.adjustmentHours + r.connectionHours + r.fileOrgHours + r.researchHours;
    }, 0) / participating.length;

  let totalCorrect = 0, totalViews = 0;
  for (const p of participating) {
    totalCorrect += p.roles[role].correctedViews;
    totalViews += p.roles[role].mainViews + p.roles[role].responsiveViews + p.roles[role].extraStateViews;
  }

  const avgRework = totalViews > 0 ? (totalCorrect / totalViews) * 100 : 0;
  const avgQuality =
    participating.reduce((s, p) => s + p.roles[role].qualityScore, 0) /
    participating.length;

  return {
    avgHours: parseFloat(avgHours.toFixed(1)),
    avgRework: parseFloat(avgRework.toFixed(1)),
    avgQuality: parseFloat(avgQuality.toFixed(1)),
    projectCount: participating.length,
  };
}
