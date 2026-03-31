"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine, Area, AreaChart,
} from "recharts";
import { loadProjects, loadConfig } from "@/lib/tracker/storage";
import {
  calculateRoleKPIs, calculateReworkRate, calculateConnectionIndex,
  calculateEstimationAccuracy,
} from "@/lib/tracker/calculations";
import type { Project, TrackerConfig, RoleType } from "@/lib/tracker/types";
import { cn } from "@/lib/utils";

const ROLES: RoleType[] = ["Junior", "Senior", "Líder UX"];
const ROLE_COLORS: Record<RoleType, string> = {
  "Junior": "#f59e0b",
  "Senior": "#3b82f6",
  "Líder UX": "#10b981",
};

function interpretTrend(values: number[], direction: "up_good" | "down_good"): string {
  if (values.length < 2) return "Datos insuficientes para calcular tendencia.";
  const first = values[0];
  const last = values[values.length - 1];
  const delta = last - first;
  const improving = direction === "up_good" ? delta > 0 : delta < 0;
  const stable = Math.abs(delta) < (first * 0.05);
  if (stable) return "Tendencia estable. Sin variación significativa.";
  return improving
    ? `Mejora sostenida de ${Math.abs(delta).toFixed(1)} desde el inicio del período.`
    : `Deterioro de ${Math.abs(delta).toFixed(1)} desde el inicio. Requiere atención.`;
}

export default function TendenciasPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<TrackerConfig | null>(null);

  useEffect(() => {
    setProjects(loadProjects());
    setConfig(loadConfig());
  }, []);

  if (!config) return null;

  const sorted = [...projects].sort((a, b) => a.startDate.localeCompare(b.startDate));

  // Build per-project trend data for each role
  function buildRoleTrend(key: "throughput" | "rework" | "quality" | "connection" | "capacity") {
    return sorted.map((p, i) => {
      const subset = sorted.slice(0, i + 1);
      const entry: Record<string, number | string> = {
        name: p.projectName.length > 10 ? p.projectName.slice(0, 10) + "…" : p.projectName,
      };
      for (const role of ROLES) {
        const kpi = calculateRoleKPIs(subset.filter((pp) => pp.roles[role].participated), role, config);
        if (key === "throughput") entry[role] = kpi.throughput;
        else if (key === "rework") entry[role] = kpi.reworkRate;
        else if (key === "quality") entry[role] = kpi.qualityScore;
        else if (key === "connection") entry[role] = kpi.connectionIndex;
        else if (key === "capacity") entry[role] = kpi.effectiveCapacity;
      }
      return entry;
    });
  }

  // Hours per project trend
  const hoursData = sorted.map((p) => ({
    name: p.projectName.length > 10 ? p.projectName.slice(0, 10) + "…" : p.projectName,
    "Horas reales": p.totalRealHours,
    "Horas estimadas": p.totalEstimatedHours || null,
  }));

  // Estimation accuracy trend
  const accuracyData = sorted
    .filter((p) => p.totalEstimatedHours > 0)
    .map((p) => ({
      name: p.projectName.length > 10 ? p.projectName.slice(0, 10) + "…" : p.projectName,
      "Precisión %": parseFloat(calculateEstimationAccuracy(p.totalRealHours, p.totalEstimatedHours).toFixed(1)),
    }));

  const throughputTrend = buildRoleTrend("throughput");
  const reworkTrend = buildRoleTrend("rework");
  const qualityTrend = buildRoleTrend("quality");
  const connectionTrend = buildRoleTrend("connection");
  const capacityTrend = buildRoleTrend("capacity");

  // Interpretation per role
  const interpretations: Record<RoleType, string[]> = {
    "Junior": [
      "Foco: reducción de retrabajo y mejora de conexión de flujos.",
      "La curva de aprendizaje es visible en los primeros 3-4 proyectos.",
    ],
    "Senior": [
      "Foco: consistencia de velocidad y calidad estructural.",
      "Alta throughput con caída en conexión indica potencial mejora en integración de flujos.",
    ],
    "Líder UX": [
      "Foco: precisión de estimación, calidad y eficiencia de investigación.",
      "Es el rol con menor retrabajo y mayor precisión histórica.",
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Tendencias y curvas de desempeño</h1>
        <p className="mt-1 text-sm text-slate-400">
          Evolución de KPIs a lo largo de {sorted.length} proyectos registrados
        </p>
      </div>

      {/* Role learning curves */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Curvas de aprendizaje por rol
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ROLES.map((role) => {
            const kpi = calculateRoleKPIs(projects, role, config);
            return (
              <div key={role} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: ROLE_COLORS[role] }}>{role}</span>
                  <span className="text-xs text-slate-500">{kpi.projectCount} proyectos</span>
                </div>
                <div className="space-y-1.5">
                  {interpretations[role].map((txt, i) => (
                    <p key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: ROLE_COLORS[role] }} />
                      {txt}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Charts grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TrendChart
          title="Throughput por rol"
          description="Vistas por hora (acumulado por proyecto)"
          direction="up_good"
          data={throughputTrend}
          config={config}
          referenceValue={config.kpiRanges.throughput.healthy}
          referenceLabel={`Meta ${config.kpiRanges.throughput.healthy}`}
        />
        <TrendChart
          title="Retrabajo por rol"
          description="% de vistas corregidas (acumulado)"
          direction="down_good"
          data={reworkTrend}
          config={config}
          referenceValue={config.kpiRanges.reworkRate.healthy}
          referenceLabel={`Meta ${config.kpiRanges.reworkRate.healthy}%`}
          unit="%"
        />
        <TrendChart
          title="Calidad por rol"
          description="Puntaje promedio stakeholder (acumulado)"
          direction="up_good"
          data={qualityTrend}
          config={config}
          referenceValue={config.kpiRanges.qualityScore.healthy}
          referenceLabel={`Meta ${config.kpiRanges.qualityScore.healthy}`}
          domain={[0, 10]}
        />
        <TrendChart
          title="Conexión de flujos por rol"
          description="% de vistas conectadas correctamente"
          direction="up_good"
          data={connectionTrend}
          config={config}
          referenceValue={config.kpiRanges.connectionIndex.healthy}
          referenceLabel={`Meta ${config.kpiRanges.connectionIndex.healthy}%`}
          unit="%"
        />
        <TrendChart
          title="Capacidad efectiva por rol"
          description="Throughput neto ajustado por retrabajo"
          direction="up_good"
          data={capacityTrend}
          config={config}
          referenceValue={config.kpiRanges.effectiveCapacity.healthy}
          referenceLabel={`Meta ${config.kpiRanges.effectiveCapacity.healthy}`}
        />

        {/* Horas reales vs estimadas */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-sm font-medium text-slate-200">Horas reales vs estimadas</h3>
          <p className="text-xs text-slate-500 mb-3">Por proyecto registrado</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hoursData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 9 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Horas reales" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Horas estimadas" stroke="#f59e0b" strokeDasharray="5 5" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-1 text-[11px] text-slate-500 italic">
            Líneas cercanas = estimación precisa. Brecha creciente = sesgo sistemático de subestimación.
          </p>
        </div>

        {/* Estimation accuracy */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-sm font-medium text-slate-200">Precisión de estimación histórica</h3>
          <p className="text-xs text-slate-500 mb-3">Por proyecto con horas estimadas</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={accuracyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 9 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} unit="%" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
              <ReferenceLine y={75} stroke="#06b6d4" strokeDasharray="4 4" label={{ value: "Meta 75%", fill: "#06b6d4", fontSize: 10 }} />
              <Area type="monotone" dataKey="Precisión %" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} strokeWidth={2} dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="mt-1 text-[11px] text-slate-500 italic">
            La precisión mejora con más proyectos registrados y desglose detallado de horas por actividad.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Reusable trend chart ───────────────────────────────────

function TrendChart({
  title, description, direction, data, config,
  referenceValue, referenceLabel, unit, domain,
}: {
  title: string;
  description: string;
  direction: "up_good" | "down_good";
  data: Record<string, number | string>[];
  config: TrackerConfig;
  referenceValue?: number;
  referenceLabel?: string;
  unit?: string;
  domain?: [number, number];
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-medium text-slate-200">{title}</h3>
      <p className="text-xs text-slate-500 mb-3">{description}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 9 }} />
          <YAxis domain={domain} tick={{ fill: "#94a3b8", fontSize: 11 }} unit={unit} />
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {referenceValue !== undefined && (
            <ReferenceLine y={referenceValue} stroke="#06b6d4" strokeDasharray="4 4"
              label={{ value: referenceLabel, fill: "#06b6d4", fontSize: 10 }} />
          )}
          {(["Junior", "Senior", "Líder UX"] as RoleType[]).map((r) => (
            <Line key={r} type="monotone" dataKey={r}
              stroke={ROLE_COLORS[r]} strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
