"use client";

import { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";
import { KPICard } from "@/components/tracker/kpi-card";
import { loadProjects, loadConfig } from "@/lib/tracker/storage";
import {
  calculateDashboardStats,
  calculateRoleKPIs,
  getPerformanceStatus,
} from "@/lib/tracker/calculations";
import type { Project, TrackerConfig } from "@/lib/tracker/types";

const ROLES = ["Junior", "Senior", "Líder UX"] as const;
const ROLE_COLORS = {
  "Junior": "#f59e0b",
  "Senior": "#3b82f6",
  "Líder UX": "#10b981",
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<TrackerConfig | null>(null);

  useEffect(() => {
    setProjects(loadProjects());
    setConfig(loadConfig());
  }, []);

  if (!config) return null;

  const stats = calculateDashboardStats(projects, config);
  const roleKPIs = ROLES.map((r) => calculateRoleKPIs(projects, r, config));

  // Chart data
  const throughputData = ROLES.map((r, i) => ({
    role: r,
    throughput: roleKPIs[i].throughput,
    throughputPonderado: roleKPIs[i].weightedThroughput,
  }));

  const hoursData = ROLES.map((r, i) => ({
    role: r,
    "Horas totales": roleKPIs[i].totalHours,
    "H. investigación": Math.round(roleKPIs[i].avgResearchHours * roleKPIs[i].projectCount),
  }));

  const reworkData = ROLES.map((r, i) => ({
    role: r,
    retrabajo: roleKPIs[i].reworkRate,
  }));

  const capacityData = ROLES.map((r, i) => ({
    role: r,
    capacidad: roleKPIs[i].effectiveCapacity,
    calidad: roleKPIs[i].qualityScore,
  }));

  // Trend: quality & accuracy per project (last 10)
  const trendProjects = [...projects]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(-10);

  const trendData = trendProjects.map((p) => {
    const qualityScores = ROLES.flatMap((r) =>
      p.roles[r].participated ? [p.roles[r].qualityScore] : []
    );
    const avgQuality =
      qualityScores.length > 0
        ? qualityScores.reduce((s, v) => s + v, 0) / qualityScores.length
        : 0;
    const accuracy =
      p.totalEstimatedHours > 0
        ? Math.max(
            0,
            (1 - Math.abs(p.totalRealHours - p.totalEstimatedHours) / p.totalEstimatedHours) * 100
          )
        : null;
    return {
      name: p.projectName.length > 12 ? p.projectName.slice(0, 12) + "…" : p.projectName,
      calidad: parseFloat(avgQuality.toFixed(1)),
      "Horas reales": p.totalRealHours,
      "Horas estimadas": p.totalEstimatedHours || null,
      precision: accuracy !== null ? parseFloat(accuracy.toFixed(1)) : null,
    };
  });

  const reworkStatus = getPerformanceStatus(stats.avgRework, "reworkRate", config, true);
  const qualityStatus = getPerformanceStatus(stats.avgQuality, "qualityScore", config);
  const connectionStatus = getPerformanceStatus(stats.avgConnection, "connectionIndex", config);
  const onTimeStatus = getPerformanceStatus(stats.avgOnTime, "onTimeRate", config);
  const capacityStatus = getPerformanceStatus(stats.totalEffectiveCapacity, "effectiveCapacity", config);
  const accuracyStatus = getPerformanceStatus(stats.estimationAccuracy, "estimationAccuracy", config);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Dashboard general</h1>
        <p className="mt-1 text-sm text-slate-400">
          Resumen de desempeño del equipo UX · {stats.totalProjects} proyectos registrados
        </p>
      </div>

      {/* Summary cards — row 1 */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Volumen
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KPICard label="Proyectos" value={stats.totalProjects} tooltip="Total de proyectos registrados en el sistema." />
          <KPICard label="Productos" value={stats.totalProducts} tooltip="Productos distintos con al menos un proyecto registrado." />
          <KPICard label="Flujos" value={stats.totalFlows} tooltip="Flujos o módulos únicos registrados." />
          <KPICard label="Horas trabajadas" value={stats.totalHours} unit="h" tooltip="Suma de horas reales de todos los proyectos." />
          <KPICard label="Horas investigación" value={stats.totalResearchHours} unit="h" tooltip="Total de horas de discovery o research." />
          <KPICard label="Vistas entregadas" value={stats.totalViews} tooltip="Total de vistas (principales + responsive + estados) entregadas." />
        </div>
      </section>

      {/* Summary cards — row 2 (KPIs) */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          KPIs del equipo
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <KPICard
            label="Retrabajo promedio"
            value={`${stats.avgRework}%`}
            status={reworkStatus}
            tooltip="% de vistas corregidas sobre total de vistas entregadas."
            meaning="Menos es mejor. Meta < 20%."
          />
          <KPICard
            label="Calidad promedio"
            value={stats.avgQuality}
            unit="/10"
            status={qualityStatus}
            tooltip="Promedio de evaluación del stakeholder."
            meaning="Meta ≥ 7.5."
          />
          <KPICard
            label="Conexión promedio"
            value={`${stats.avgConnection}%`}
            status={connectionStatus}
            tooltip="% de vistas correctamente conectadas en el flujo."
            meaning="Meta > 80%."
          />
          <KPICard
            label="Entrega a tiempo"
            value={`${stats.avgOnTime}%`}
            status={onTimeStatus}
            tooltip="% de entregas realizadas dentro del plazo acordado."
            meaning="Meta > 80%."
          />
          <KPICard
            label="Capacidad efectiva"
            value={stats.totalEffectiveCapacity}
            unit="v/h"
            status={capacityStatus}
            tooltip="Throughput neto del equipo ajustado por retrabajo."
            meaning="Mayor es mejor. Meta > 1.0."
          />
          <KPICard
            label="Precisión estimación"
            value={`${stats.estimationAccuracy}%`}
            status={accuracyStatus}
            tooltip="Qué tan cerca estuvieron las estimaciones de las horas reales."
            meaning="Meta > 75%."
          />
        </div>
      </section>

      {/* Charts — row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Throughput por rol */}
        <ChartCard
          title="Throughput por rol"
          description="Vistas entregadas por hora de trabajo"
          meaning="Mayor valor indica mayor velocidad de producción. Analizar junto con calidad para evitar lecturas engañosas."
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={throughputData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="role" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="throughput" name="Simple" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="throughputPonderado" name="Ponderado" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Horas por rol */}
        <ChartCard
          title="Horas invertidas por rol"
          description="Horas totales vs horas de investigación"
          meaning="Visualiza la distribución de carga entre roles y la proporción de investigación."
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hoursData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="role" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Horas totales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="H. investigación" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Retrabajo por rol */}
        <ChartCard
          title="Retrabajo por rol"
          description="% de vistas corregidas sobre total"
          meaning="Menos es mejor. Valores sobre 20% requieren atención. Sobre 30% es crítico."
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={reworkData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="role" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} unit="%" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
              <ReferenceLine y={20} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Meta 20%", fill: "#f59e0b", fontSize: 10 }} />
              <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Crítico 30%", fill: "#ef4444", fontSize: 10 }} />
              <Bar dataKey="retrabajo" name="Retrabajo %" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Capacidad efectiva */}
        <ChartCard
          title="Capacidad efectiva por rol"
          description="Throughput neto ajustado por retrabajo"
          meaning="El KPI más completo de productividad. Combina velocidad y calidad de entrega."
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={capacityData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="role" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94a3b8", fontSize: 11 }} domain={[0, 10]} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="capacidad" name="Cap. efectiva (v/h)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="calidad" name="Calidad (/10)" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Trend charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quality trend */}
        <ChartCard
          title="Tendencia de calidad"
          description="Puntaje promedio por proyecto en el tiempo"
          meaning="Una línea ascendente indica mejora sostenida en calidad percibida por stakeholders."
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis domain={[0, 10]} tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
              <ReferenceLine y={7.5} stroke="#06b6d4" strokeDasharray="4 4" label={{ value: "Meta 7.5", fill: "#06b6d4", fontSize: 10 }} />
              <Line type="monotone" dataKey="calidad" name="Calidad" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Horas reales vs estimadas */}
        <ChartCard
          title="Horas reales vs estimadas"
          description="Comparativa por proyecto"
          meaning="Líneas cercanas = estimación precisa. Brecha positiva = subestimación sistemática."
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Horas reales" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Horas estimadas" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Role KPIs table */}
      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Resumen por rol
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                {["Rol", "Proyectos", "Horas totales", "Throughput", "Retrabajo", "Calidad", "Conexión", "A tiempo", "Cap. efectiva"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roleKPIs.map((r, i) => (
                <tr key={r.role} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium" style={{ color: Object.values(ROLE_COLORS)[i] }}>
                    {r.role}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{r.projectCount}</td>
                  <td className="px-4 py-3 text-slate-300">{r.totalHours}h</td>
                  <td className="px-4 py-3 text-slate-300">{r.throughput}</td>
                  <td className="px-4 py-3">
                    <span className={r.reworkRate > 30 ? "text-red-400" : r.reworkRate > 20 ? "text-amber-400" : "text-emerald-400"}>
                      {r.reworkRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{r.qualityScore}/10</td>
                  <td className="px-4 py-3 text-slate-300">{r.connectionIndex}%</td>
                  <td className="px-4 py-3 text-slate-300">{r.onTimeDeliveryRate}%</td>
                  <td className="px-4 py-3 text-slate-300">{r.effectiveCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// ─── Chart wrapper ─────────────────────────────────────────

function ChartCard({
  title,
  description,
  meaning,
  children,
}: {
  title: string;
  description: string;
  meaning: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-1">
        <h3 className="text-sm font-medium text-slate-200">{title}</h3>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      {children}
      <p className="mt-2 text-[11px] text-slate-500 italic leading-relaxed">{meaning}</p>
    </div>
  );
}
