"use client";

import { useEffect, useState } from "react";
import { FileText, TrendingUp, TrendingDown, Minus, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { loadProjects, loadConfig } from "@/lib/tracker/storage";
import { generateExecutiveSummary, calculateRoleKPIs } from "@/lib/tracker/calculations";
import type { Project, TrackerConfig, ExecutiveSummary } from "@/lib/tracker/types";
import { cn } from "@/lib/utils";

const ROLES = ["Junior", "Senior", "Líder UX"] as const;

export default function ResumenPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<TrackerConfig | null>(null);
  const [summary, setSummary] = useState<ExecutiveSummary | null>(null);

  useEffect(() => {
    const p = loadProjects();
    const c = loadConfig();
    setProjects(p);
    setConfig(c);
    setSummary(generateExecutiveSummary(p, c));
  }, []);

  if (!config || !summary) return null;

  const statusConfig = {
    healthy: { label: "Saludable", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle },
    warning: { label: "Atención", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: AlertTriangle },
    critical: { label: "Crítico", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: AlertTriangle },
  };
  const sc = statusConfig[summary.teamStatus];
  const StatusIcon = sc.icon;

  const roleKPIs = ROLES.map((r) => calculateRoleKPIs(projects, r, config));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Resumen ejecutivo</h1>
          <p className="text-sm text-slate-400">Generado automáticamente · {projects.length} proyectos analizados</p>
        </div>
      </div>

      {/* Status banner */}
      <div className={cn("rounded-xl border p-5 flex items-start gap-4", sc.bg)}>
        <StatusIcon className={cn("h-6 w-6 shrink-0 mt-0.5", sc.color)} />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-base font-bold", sc.color)}>Estado del equipo: {sc.label}</span>
          </div>
          <p className="text-sm text-slate-300">{summary.executiveReading}</p>
        </div>
      </div>

      {/* Key metrics row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard
          icon={Star}
          label="Rol más eficiente"
          value={summary.mostEfficientRole}
          color="text-emerald-400"
        />
        <MetricCard
          icon={TrendingDown}
          label="Mayor retrabajo"
          value={summary.highestReworkRole}
          color="text-amber-400"
        />
        <MetricCard
          icon={TrendingUp}
          label="Mejor estimación"
          value={summary.bestEstimationRole}
          color="text-blue-400"
        />
        <MetricCard
          icon={CheckCircle}
          label="Producto más saludable"
          value={summary.healthiestProduct}
          color="text-cyan-400"
        />
      </div>

      {/* Main sections */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Fortaleza y cuello de botella */}
        <div className="space-y-3">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> Principal fortaleza
            </p>
            <p className="text-sm text-slate-300">{summary.mainStrength}</p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-xs font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" /> Principal cuello de botella
            </p>
            <p className="text-sm text-slate-300">{summary.mainBottleneck}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
            <p className="text-xs font-semibold text-slate-400 mb-1">Producto con mayor desviación</p>
            <p className="text-sm text-slate-300">{summary.mostDeviatedProduct}</p>
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="space-y-3">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <p className="text-xs font-semibold text-cyan-400 mb-2">Recomendación de asignación de carga</p>
            <p className="text-sm text-slate-300 leading-relaxed">{summary.workloadRecommendation}</p>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
            <p className="text-xs font-semibold text-purple-400 mb-2">Recomendación de investigación por rol</p>
            <p className="text-sm text-slate-300 leading-relaxed">{summary.researchRecommendation}</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">Insights clave</h3>
        <div className="space-y-2">
          {summary.insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-2.5 py-2 border-b border-slate-800 last:border-0">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
              <p className="text-sm text-slate-300">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Role KPI summary */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-4">Desempeño por rol</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {roleKPIs.map((r) => {
            const COLORS: Record<string, string> = {
              "Junior": "#f59e0b",
              "Senior": "#3b82f6",
              "Líder UX": "#10b981",
            };
            return (
              <div key={r.role} className="rounded-lg border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: COLORS[r.role] }}>{r.role}</span>
                  <span className="text-xs text-slate-500">{r.projectCount} proyectos</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: "Calidad", value: `${r.qualityScore}/10` },
                    { label: "Retrabajo", value: `${r.reworkRate}%` },
                    { label: "Conexión", value: `${r.connectionIndex}%` },
                    { label: "A tiempo", value: `${r.onTimeDeliveryRate}%` },
                    { label: "Cap. efectiva", value: `${r.effectiveCapacity} v/h` },
                    { label: "Precisión", value: `${r.estimationAccuracy.toFixed(0)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{label}</span>
                      <span className="text-xs font-medium text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conclusions */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">Conclusiones para gerencia</h3>
        <div className="space-y-2">
          {summary.conclusions.map((c, i) => (
            <p key={i} className="text-sm text-slate-400 leading-relaxed flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-slate-500 shrink-0" />
              {c}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string; color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("h-4 w-4", color)} />
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <p className={cn("text-sm font-bold", color)}>{value}</p>
    </div>
  );
}
