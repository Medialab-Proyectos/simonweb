"use client";

import { useEffect, useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { KPICard, SemaphoreBadge } from "@/components/tracker/kpi-card";
import { loadProjects, loadConfig } from "@/lib/tracker/storage";
import { calculateRoleKPIs, getPerformanceStatus } from "@/lib/tracker/calculations";
import type { Project, TrackerConfig, RoleKPIs, RoleType } from "@/lib/tracker/types";
import { cn } from "@/lib/utils";

const ROLES: RoleType[] = ["Junior", "Senior", "Líder UX"];
const ROLE_COLORS: Record<RoleType, string> = {
  "Junior": "#f59e0b",
  "Senior": "#3b82f6",
  "Líder UX": "#10b981",
};

function generateRoleInsights(kpi: RoleKPIs, config: TrackerConfig): { positives: string[]; attention: string[] } {
  const positives: string[] = [];
  const attention: string[] = [];

  if (kpi.throughput >= config.kpiRanges.throughput.healthy) {
    positives.push(`Throughput de ${kpi.throughput} v/h por encima del umbral saludable.`);
  }
  if (kpi.reworkRate <= config.kpiRanges.reworkRate.healthy) {
    positives.push(`Tasa de retrabajo de ${kpi.reworkRate}% dentro del rango óptimo.`);
  } else if (kpi.reworkRate > config.kpiRanges.reworkRate.warning) {
    attention.push(`Retrabajo del ${kpi.reworkRate}% es crítico — revisar claridad de requerimientos.`);
  }
  if (kpi.qualityScore >= config.kpiRanges.qualityScore.healthy) {
    positives.push(`Calidad promedio de ${kpi.qualityScore}/10 es sólida.`);
  } else if (kpi.qualityScore < config.kpiRanges.qualityScore.warning) {
    attention.push(`Puntaje de calidad de ${kpi.qualityScore}/10 requiere atención.`);
  }
  if (kpi.onTimeDeliveryRate >= config.kpiRanges.onTimeRate.healthy) {
    positives.push(`${kpi.onTimeDeliveryRate}% de entrega a tiempo — confiable.`);
  } else {
    attention.push(`Entrega a tiempo del ${kpi.onTimeDeliveryRate}% por debajo de la meta (${config.kpiRanges.onTimeRate.healthy}%).`);
  }
  if (kpi.connectionIndex >= config.kpiRanges.connectionIndex.healthy) {
    positives.push(`Índice de conexión de ${kpi.connectionIndex}% muestra buena estructura de flujo.`);
  } else {
    attention.push(`Conexión de ${kpi.connectionIndex}% sugiere flujos entregados sin contexto.`);
  }
  if (kpi.researchParticipationRate >= 50) {
    positives.push(`Alta participación en discovery (${kpi.researchParticipationRate.toFixed(0)}% de proyectos).`);
  }
  if (kpi.estimationAccuracy >= 75) {
    positives.push(`Precisión de estimación de ${kpi.estimationAccuracy.toFixed(0)}% — referencia confiable.`);
  }

  return { positives, attention };
}

function generateRoleRecommendation(kpi: RoleKPIs): string {
  if (kpi.reworkRate > 30) {
    return `El ${kpi.role} se beneficia de acompañamiento en validación temprana y claridad de requerimientos antes de iniciar producción.`;
  }
  if (kpi.connectionIndex < 70) {
    return `El ${kpi.role} debe priorizar la conexión de flujos desde el inicio del proyecto, no como etapa final.`;
  }
  if (kpi.qualityScore < 7) {
    return `El ${kpi.role} requiere mayor alineación con expectativas del stakeholder — sesiones de feedback más frecuentes.`;
  }
  if (kpi.estimationAccuracy < 60) {
    return `El ${kpi.role} debe registrar desglose por actividad para mejorar la calibración de estimaciones futuras.`;
  }
  return `El ${kpi.role} tiene desempeño sólido. Mantener consistencia y documentar mejores prácticas.`;
}

export default function RolesPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<TrackerConfig | null>(null);
  const [selected, setSelected] = useState<RoleType>("Junior");

  useEffect(() => {
    setProjects(loadProjects());
    setConfig(loadConfig());
  }, []);

  if (!config) return null;

  const roleKPIs = ROLES.map((r) => calculateRoleKPIs(projects, r, config));

  // Comparison data for chart
  const comparisonData = [
    { metric: "Throughput", ...Object.fromEntries(roleKPIs.map((r) => [r.role, r.throughput])) },
    { metric: "Retrabajo %", ...Object.fromEntries(roleKPIs.map((r) => [r.role, r.reworkRate])) },
    { metric: "Calidad /10", ...Object.fromEntries(roleKPIs.map((r) => [r.role, r.qualityScore])) },
    { metric: "Conexión %", ...Object.fromEntries(roleKPIs.map((r) => [r.role, r.connectionIndex])) },
    { metric: "A tiempo %", ...Object.fromEntries(roleKPIs.map((r) => [r.role, r.onTimeDeliveryRate])) },
    { metric: "Cap. efectiva", ...Object.fromEntries(roleKPIs.map((r) => [r.role, r.effectiveCapacity])) },
  ];

  const selectedKPI = roleKPIs.find((r) => r.role === selected)!;
  const insights = config ? generateRoleInsights(selectedKPI, config) : { positives: [], attention: [] };
  const recommendation = generateRoleRecommendation(selectedKPI);

  // Radar data (normalize to 0-100)
  const radarData = [
    { subject: "Throughput", value: Math.min(selectedKPI.throughput * 50, 100) },
    { subject: "Calidad", value: selectedKPI.qualityScore * 10 },
    { subject: "Conexión", value: selectedKPI.connectionIndex },
    { subject: "A tiempo", value: selectedKPI.onTimeDeliveryRate },
    { subject: "Inv.", value: Math.min(selectedKPI.researchParticipationRate, 100) },
    { subject: "Precisión", value: selectedKPI.estimationAccuracy },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">KPIs por rol</h1>
        <p className="mt-1 text-sm text-slate-400">Comparativa y detalle de desempeño por rol</p>
      </div>

      {/* Role selector */}
      <div className="flex gap-2">
        {ROLES.map((r) => (
          <button
            key={r}
            onClick={() => setSelected(r)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors border",
              selected === r
                ? "border-current bg-current/10"
                : "border-slate-700 text-slate-400 hover:bg-slate-800"
            )}
            style={selected === r ? { color: ROLE_COLORS[r], borderColor: ROLE_COLORS[r] } : undefined}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Role detail */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* KPI Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KPICard label="Proyectos" value={selectedKPI.projectCount} size="sm" />
            <KPICard label="Horas totales" value={selectedKPI.totalHours} unit="h" size="sm" />
            <KPICard label="Horas/proyecto" value={selectedKPI.avgHoursPerProject.toFixed(1)} unit="h" size="sm" />
            <KPICard label="H. investigación" value={selectedKPI.avgResearchHours.toFixed(1)} unit="h/proy" size="sm" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KPICard
              label="Throughput"
              value={selectedKPI.throughput}
              unit="v/h"
              size="sm"
              status={getPerformanceStatus(selectedKPI.throughput, "throughput", config)}
              tooltip="Vistas entregadas por hora"
            />
            <KPICard
              label="Retrabajo"
              value={`${selectedKPI.reworkRate}%`}
              size="sm"
              status={getPerformanceStatus(selectedKPI.reworkRate, "reworkRate", config, true)}
              tooltip="% vistas corregidas"
            />
            <KPICard
              label="Calidad"
              value={`${selectedKPI.qualityScore}/10`}
              size="sm"
              status={getPerformanceStatus(selectedKPI.qualityScore, "qualityScore", config)}
              tooltip="Puntaje promedio stakeholder"
            />
            <KPICard
              label="Conexión"
              value={`${selectedKPI.connectionIndex}%`}
              size="sm"
              status={getPerformanceStatus(selectedKPI.connectionIndex, "connectionIndex", config)}
              tooltip="Vistas conectadas correctamente"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <KPICard
              label="A tiempo"
              value={`${selectedKPI.onTimeDeliveryRate}%`}
              size="sm"
              status={getPerformanceStatus(selectedKPI.onTimeDeliveryRate, "onTimeRate", config)}
            />
            <KPICard
              label="Revisiones prom."
              value={selectedKPI.avgRevisions}
              size="sm"
            />
            <KPICard
              label="Cap. efectiva"
              value={selectedKPI.effectiveCapacity}
              unit="v/h"
              size="sm"
              status={getPerformanceStatus(selectedKPI.effectiveCapacity, "effectiveCapacity", config)}
            />
            <KPICard
              label="Precisión estim."
              value={`${selectedKPI.estimationAccuracy.toFixed(0)}%`}
              size="sm"
              status={getPerformanceStatus(selectedKPI.estimationAccuracy, "estimationAccuracy", config)}
            />
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="text-xs font-semibold text-emerald-400 mb-2">Señales positivas</p>
              {insights.positives.length === 0 ? (
                <p className="text-xs text-slate-500">Sin datos suficientes aún.</p>
              ) : (
                <ul className="space-y-1.5">
                  {insights.positives.map((ins, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <span className="mt-1 h-1 w-1 rounded-full bg-emerald-400 shrink-0" />
                      {ins}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-xs font-semibold text-amber-400 mb-2">Requiere atención</p>
              {insights.attention.length === 0 ? (
                <p className="text-xs text-slate-500">Sin alertas activas.</p>
              ) : (
                <ul className="space-y-1.5">
                  {insights.attention.map((ins, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <span className="mt-1 h-1 w-1 rounded-full bg-amber-400 shrink-0" />
                      {ins}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <p className="text-xs font-semibold text-cyan-400 mb-1">Recomendación</p>
            <p className="text-xs text-slate-300">{recommendation}</p>
          </div>
        </div>

        {/* Radar chart */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-sm font-medium text-slate-200 mb-3">Perfil de desempeño</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Radar name={selected} dataKey="value" stroke={ROLE_COLORS[selected]}
                fill={ROLE_COLORS[selected]} fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-slate-500 italic text-center">
            Valores normalizados a escala 0–100
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Comparativa entre roles
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                {["Métrica", "Junior", "Senior", "Líder UX"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Proyectos", values: roleKPIs.map((r) => r.projectCount), format: (v: number) => v },
                { label: "Horas totales", values: roleKPIs.map((r) => r.totalHours), format: (v: number) => `${v}h` },
                { label: "Horas promedio/proyecto", values: roleKPIs.map((r) => r.avgHoursPerProject.toFixed(1)), format: (v: string) => `${v}h` },
                { label: "Throughput", values: roleKPIs.map((r) => r.throughput), format: (v: number) => `${v} v/h` },
                { label: "Retrabajo", values: roleKPIs.map((r) => r.reworkRate), format: (v: number) => `${v}%` },
                { label: "Calidad", values: roleKPIs.map((r) => r.qualityScore), format: (v: number) => `${v}/10` },
                { label: "Conexión", values: roleKPIs.map((r) => r.connectionIndex), format: (v: number) => `${v}%` },
                { label: "A tiempo", values: roleKPIs.map((r) => r.onTimeDeliveryRate), format: (v: number) => `${v}%` },
                { label: "Cap. efectiva", values: roleKPIs.map((r) => r.effectiveCapacity), format: (v: number) => v },
                { label: "Precisión estimación", values: roleKPIs.map((r) => r.estimationAccuracy.toFixed(0)), format: (v: string) => `${v}%` },
              ].map(({ label, values, format }) => (
                <tr key={label} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-2.5 text-xs text-slate-400">{label}</td>
                  {values.map((v, i) => (
                    <td key={i} className="px-4 py-2.5 text-sm font-medium"
                      style={{ color: ROLE_COLORS[ROLES[i]] }}>
                      {(format as (v: unknown) => string | number)(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparison bar chart */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="text-sm font-medium text-slate-200 mb-3">Comparativa visual por KPI</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={comparisonData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 10 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            {ROLES.map((r) => (
              <Bar key={r} dataKey={r} fill={ROLE_COLORS[r]} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
