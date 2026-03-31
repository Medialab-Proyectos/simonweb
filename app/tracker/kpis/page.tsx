"use client";

import { useState } from "react";
import { KPI_DEFINITIONS, type KPIDefinition } from "@/lib/tracker/kpi-definitions";
import { cn } from "@/lib/utils";
import { BookOpen, Search } from "lucide-react";

const IMPACT_COLORS: Record<string, string> = {
  productividad: "bg-blue-500/15 text-blue-400",
  calidad: "bg-emerald-500/15 text-emerald-400",
  capacidad: "bg-purple-500/15 text-purple-400",
  estimación: "bg-amber-500/15 text-amber-400",
};

const UNIT_LABELS: Record<string, string> = {
  "%": "Porcentaje",
  "vistas/hora": "Vistas por hora",
  "horas": "Horas",
  "score": "Puntaje",
  "número": "Número",
};

export default function KPIsPage() {
  const [search, setSearch] = useState("");
  const [filterImpact, setFilterImpact] = useState<string>("todos");
  const [selected, setSelected] = useState<KPIDefinition | null>(null);

  const filtered = KPI_DEFINITIONS.filter((kpi) => {
    const matchSearch =
      !search ||
      kpi.name.toLowerCase().includes(search.toLowerCase()) ||
      kpi.definition.toLowerCase().includes(search.toLowerCase());
    const matchImpact =
      filterImpact === "todos" ||
      kpi.impacts.includes(filterImpact as KPIDefinition["impacts"][0]);
    return matchSearch && matchImpact;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Definición de KPIs</h1>
          <p className="text-sm text-slate-400">Guía completa de indicadores con fórmulas e interpretación</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar KPI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 rounded-lg border border-slate-700 bg-slate-900 pl-8 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
        {["todos", "productividad", "calidad", "capacidad", "estimación"].map((f) => (
          <button
            key={f}
            onClick={() => setFilterImpact(f)}
            className={cn("rounded px-3 py-1 text-xs capitalize transition-colors",
              filterImpact === f ? "bg-cyan-500 text-slate-950 font-medium" :
              "text-slate-400 border border-slate-700 hover:text-slate-200"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* KPI list */}
        <div className="lg:col-span-1 space-y-2">
          {filtered.map((kpi) => (
            <button
              key={kpi.id}
              onClick={() => setSelected(kpi)}
              className={cn(
                "w-full text-left rounded-xl border p-4 transition-colors",
                selected?.id === kpi.id
                  ? "border-cyan-500/40 bg-cyan-500/5"
                  : "border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800/50"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-slate-200">{kpi.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{kpi.definition}</p>
                </div>
                <span className="text-[10px] rounded px-1.5 py-0.5 bg-slate-800 text-slate-400 shrink-0">
                  {kpi.unit}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {kpi.impacts.map((imp) => (
                  <span key={imp} className={cn("text-[10px] rounded-full px-1.5 py-0.5", IMPACT_COLORS[imp])}>
                    {imp}
                  </span>
                ))}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-sm text-slate-500 py-8">No se encontraron KPIs con ese criterio.</p>
          )}
        </div>

        {/* KPI detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">{selected.name}</h2>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selected.impacts.map((imp) => (
                      <span key={imp} className={cn("text-xs rounded-full px-2 py-0.5", IMPACT_COLORS[imp])}>
                        {imp}
                      </span>
                    ))}
                    <span className="text-xs rounded-full px-2 py-0.5 bg-slate-700 text-slate-300">
                      Unidad: {UNIT_LABELS[selected.unit] ?? selected.unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Definition */}
              <div className="rounded-lg bg-slate-800/50 p-4">
                <p className="text-xs font-semibold text-slate-400 mb-1">Definición</p>
                <p className="text-sm text-slate-200">{selected.definition}</p>
              </div>

              {/* Formula */}
              <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                <p className="text-xs font-semibold text-cyan-400 mb-1">Fórmula</p>
                <code className="text-sm text-slate-200 font-mono">{selected.formula}</code>
              </div>

              {/* Why / How to interpret */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1">Por qué importa</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{selected.whyItMatters}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-1">Cómo interpretarlo</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{selected.howToInterpret}</p>
                </div>
              </div>

              {/* Range */}
              <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <p className="text-xs font-semibold text-emerald-400">Rango recomendado</p>
                  <p className="text-xs text-slate-300">{selected.recommendedRange.label}</p>
                </div>
              </div>

              {/* Example */}
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1">Ejemplo de lectura</p>
                <p className="text-sm text-slate-400 italic leading-relaxed bg-slate-800/30 rounded-lg p-3">
                  {selected.example}
                </p>
              </div>

              {/* Tooltip */}
              <div className="rounded-lg bg-slate-800 px-3 py-2">
                <p className="text-xs text-slate-500">
                  <span className="text-slate-400 font-medium">Resumen rápido: </span>
                  {selected.tooltip}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 text-center p-8">
              <BookOpen className="h-10 w-10 text-slate-600 mb-3" />
              <p className="text-slate-400 text-sm">Selecciona un KPI de la lista para ver su definición completa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
