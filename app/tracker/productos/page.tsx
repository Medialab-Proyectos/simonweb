"use client";

import { useEffect, useState } from "react";
import { SemaphoreBadge } from "@/components/tracker/kpi-card";
import { loadProjects, loadConfig } from "@/lib/tracker/storage";
import { calculateProductKPIs } from "@/lib/tracker/calculations";
import type { Project, TrackerConfig, ProductKPIs } from "@/lib/tracker/types";
import { cn } from "@/lib/utils";

const PLATFORMS = ["Todos", "Mobile", "Web", "Ambos"] as const;
const COMPLEXITIES = ["Todos", "Baja", "Media", "Alta"] as const;

export default function ProductosPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<TrackerConfig | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<string>("Todos");
  const [filterComplexity, setFilterComplexity] = useState<string>("Todos");
  const [filterRole, setFilterRole] = useState<string>("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProjects(loadProjects());
    setConfig(loadConfig());
  }, []);

  if (!config) return null;

  // Apply filters
  let filtered = [...projects];
  if (filterPlatform !== "Todos") filtered = filtered.filter((p) => p.platform === filterPlatform);
  if (filterComplexity !== "Todos") filtered = filtered.filter((p) => p.complexity === filterComplexity);
  if (filterRole !== "Todos") {
    const roleMap: Record<string, "Junior" | "Senior" | "Líder UX"> = {
      Junior: "Junior", Senior: "Senior", "Líder UX": "Líder UX",
    };
    filtered = filtered.filter((p) => p.roles[roleMap[filterRole]]?.participated);
  }

  const productKPIs = calculateProductKPIs(filtered, config);
  const searchFiltered = search
    ? productKPIs.filter((p) => p.productName.toLowerCase().includes(search.toLowerCase()))
    : productKPIs;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">KPIs por producto</h1>
        <p className="mt-1 text-sm text-slate-400">{searchFiltered.length} producto{searchFiltered.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
        <FilterGroup label="Plataforma" value={filterPlatform} onChange={setFilterPlatform} options={PLATFORMS} />
        <FilterGroup label="Complejidad" value={filterComplexity} onChange={setFilterComplexity} options={COMPLEXITIES} />
        <FilterGroup label="Rol" value={filterRole} onChange={setFilterRole} options={["Todos", "Junior", "Senior", "Líder UX"]} />
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {searchFiltered.map((product) => (
          <ProductCard key={product.productName} product={product} />
        ))}
        {searchFiltered.length === 0 && (
          <div className="col-span-2 flex justify-center py-12 text-slate-500 text-sm">
            No hay productos que coincidan con los filtros seleccionados.
          </div>
        )}
      </div>

      {/* Comparison table */}
      {searchFiltered.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Tabla comparativa
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  {["Producto", "Proyectos", "Horas", "H. Invest.", "Vistas", "Throughput", "Calidad", "Retrabajo", "Conexión", "A tiempo", "Desviación", "Estado"].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-medium text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searchFiltered.map((p) => (
                  <tr key={p.productName} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="px-3 py-2.5 font-medium text-slate-200">{p.productName}</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.projectCount}</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.totalHours}h</td>
                    <td className="px-3 py-2.5 text-slate-400">{p.researchHours}h</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.totalViews}</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.throughput}</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.qualityScore}/10</td>
                    <td className="px-3 py-2.5">
                      <span className={p.reworkRate > 30 ? "text-red-400" : p.reworkRate > 20 ? "text-amber-400" : "text-emerald-400"}>
                        {p.reworkRate}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{p.connectionIndex}%</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.onTimeRate}%</td>
                    <td className="px-3 py-2.5">
                      <span className={Math.abs(p.estimationDeviation) > 25 ? "text-red-400" : Math.abs(p.estimationDeviation) > 15 ? "text-amber-400" : "text-emerald-400"}>
                        {p.estimationDeviation > 0 ? "+" : ""}{p.estimationDeviation}%
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <SemaphoreBadge status={p.healthStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

// ─── Product card ───────────────────────────────────────────

function ProductCard({ product }: { product: ProductKPIs }) {
  const kpis = [
    { label: "Throughput", value: `${product.throughput} v/h` },
    { label: "Calidad", value: `${product.qualityScore}/10` },
    { label: "Retrabajo", value: `${product.reworkRate}%`,
      color: product.reworkRate > 30 ? "text-red-400" : product.reworkRate > 20 ? "text-amber-400" : "text-emerald-400" },
    { label: "Conexión", value: `${product.connectionIndex}%` },
    { label: "A tiempo", value: `${product.onTimeRate}%` },
    { label: "Desviación", value: `${product.estimationDeviation > 0 ? "+" : ""}${product.estimationDeviation}%`,
      color: Math.abs(product.estimationDeviation) > 25 ? "text-red-400" : Math.abs(product.estimationDeviation) > 15 ? "text-amber-400" : "text-emerald-400" },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-100">{product.productName}</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {product.projectCount} proyecto{product.projectCount !== 1 ? "s" : ""} · {product.totalHours}h totales · {product.totalViews} vistas
          </p>
        </div>
        <SemaphoreBadge status={product.healthStatus} />
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-3 gap-2">
        {kpis.map(({ label, value, color }) => (
          <div key={label} className="rounded-lg bg-slate-800/40 px-3 py-2">
            <p className="text-[10px] text-slate-500 mb-0.5">{label}</p>
            <p className={cn("text-sm font-semibold text-slate-200", color)}>{value}</p>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="space-y-1.5">
        <MiniBar label="Horas de investigación" value={product.researchHours} max={product.totalHours} color="bg-emerald-500" />
        <MiniBar label="Capacidad efectiva" value={product.effectiveCapacity * 10} max={20} color="bg-cyan-500" />
      </div>

      {/* Health reason */}
      <p className={cn("text-xs", product.healthStatus === "healthy" ? "text-emerald-400" : product.healthStatus === "warning" ? "text-amber-400" : "text-red-400")}>
        {product.healthReason}
      </p>
    </div>
  );
}

function MiniBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between mb-0.5">
        <span className="text-[10px] text-slate-500">{label}</span>
        <span className="text-[10px] text-slate-400">{value.toFixed(1)}</span>
      </div>
      <div className="h-1 w-full rounded-full bg-slate-800">
        <div className={cn("h-1 rounded-full transition-all", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function FilterGroup({ label, value, onChange, options }: {
  label: string; value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-slate-500">{label}:</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn("rounded px-2 py-1 text-xs transition-colors",
            value === o ? "bg-cyan-500 text-slate-950 font-medium" : "text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
