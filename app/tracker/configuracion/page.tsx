"use client";

import { useEffect, useState } from "react";
import { Settings, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadConfig, saveConfig } from "@/lib/tracker/storage";
import { DEFAULT_CONFIG, type TrackerConfig } from "@/lib/tracker/types";
import { cn } from "@/lib/utils";

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<TrackerConfig>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  function handleSave() {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    setConfig(DEFAULT_CONFIG);
    saveConfig(DEFAULT_CONFIG);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateWeight(key: keyof TrackerConfig["weights"], value: number) {
    setConfig((c) => ({ ...c, weights: { ...c.weights, [key]: value } }));
  }

  function updateRange(kpi: keyof TrackerConfig["kpiRanges"], level: "healthy" | "warning", value: number) {
    setConfig((c) => ({
      ...c,
      kpiRanges: {
        ...c.kpiRanges,
        [kpi]: { ...c.kpiRanges[kpi], [level]: value },
      },
    }));
  }

  function updateGoal(key: keyof TrackerConfig["goals"], value: number) {
    setConfig((c) => ({ ...c, goals: { ...c.goals, [key]: value } }));
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-cyan-400" />
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Configuración</h1>
            <p className="text-sm text-slate-400">Ajusta metas, pesos y rangos de semáforo</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}
            className="border-slate-700 text-slate-400 hover:bg-slate-800">
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Restaurar
          </Button>
          <Button size="sm" onClick={handleSave}
            className={cn("transition-colors", saved ? "bg-emerald-500 text-white" : "bg-cyan-500 text-slate-950 hover:bg-cyan-400")}>
            <Save className="mr-1.5 h-3.5 w-3.5" />
            {saved ? "Guardado" : "Guardar"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Weights */}
        <ConfigSection title="Factores de ponderación" description="Afectan el cálculo de throughput ponderado y capacidad efectiva">
          <ConfigRow
            label="Factor vistas responsive"
            description="Peso de las vistas responsive respecto a las principales (0.1 – 1.0)"
            value={config.weights.responsiveFactor}
            min={0.1} max={1} step={0.05}
            onChange={(v) => updateWeight("responsiveFactor", v)}
          />
          <ConfigRow
            label="Factor estados extra"
            description="Peso de los estados extra/negativos (0.1 – 1.0)"
            value={config.weights.extraStateFactor}
            min={0.1} max={1} step={0.05}
            onChange={(v) => updateWeight("extraStateFactor", v)}
          />
        </ConfigSection>

        {/* Goals */}
        <ConfigSection title="Metas del equipo" description="Umbrales objetivo para el desempeño del equipo">
          <ConfigRow
            label="Retrabajo máximo aceptable"
            description="% de retrabajo que se considera aceptable"
            value={config.goals.maxReworkRate}
            min={5} max={50} step={1} unit="%"
            onChange={(v) => updateGoal("maxReworkRate", v)}
          />
          <ConfigRow
            label="Calidad mínima"
            description="Puntaje mínimo de stakeholder (1-10)"
            value={config.goals.minQualityScore}
            min={1} max={10} step={0.5}
            onChange={(v) => updateGoal("minQualityScore", v)}
          />
          <ConfigRow
            label="Entrega a tiempo mínima"
            description="% de entregas dentro del plazo"
            value={config.goals.minOnTimeRate}
            min={10} max={100} step={5} unit="%"
            onChange={(v) => updateGoal("minOnTimeRate", v)}
          />
          <ConfigRow
            label="Conexión mínima"
            description="% de vistas correctamente conectadas"
            value={config.goals.minConnectionIndex}
            min={10} max={100} step={5} unit="%"
            onChange={(v) => updateGoal("minConnectionIndex", v)}
          />
          <ConfigRow
            label="Precisión de estimación mínima"
            description="% de precisión histórica deseable"
            value={config.goals.minEstimationAccuracy}
            min={10} max={100} step={5} unit="%"
            onChange={(v) => updateGoal("minEstimationAccuracy", v)}
          />
        </ConfigSection>

        {/* Semaphore ranges */}
        <div className="lg:col-span-2">
          <ConfigSection title="Rangos de semáforo por KPI" description="Define los umbrales saludable/atención para cada indicador">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(
                [
                  { key: "throughput" as const, label: "Throughput (v/h)", inverted: false },
                  { key: "reworkRate" as const, label: "Retrabajo (%)", inverted: true },
                  { key: "connectionIndex" as const, label: "Conexión (%)", inverted: false },
                  { key: "qualityScore" as const, label: "Calidad (/10)", inverted: false },
                  { key: "onTimeRate" as const, label: "Entrega a tiempo (%)", inverted: false },
                  { key: "effectiveCapacity" as const, label: "Cap. efectiva (v/h)", inverted: false },
                  { key: "estimationAccuracy" as const, label: "Precisión estimación (%)", inverted: false },
                ] as const
              ).map(({ key, label, inverted }) => (
                <div key={key} className="rounded-lg border border-slate-800 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-300">{label}</p>
                    {inverted && <span className="text-[10px] text-slate-500">menos es mejor</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-[10px] text-emerald-400 mb-1">Umbral saludable</Label>
                      <Input
                        type="number" step={0.1}
                        value={config.kpiRanges[key].healthy}
                        onChange={(e) => updateRange(key, "healthy", parseFloat(e.target.value))}
                        className="h-7 bg-slate-950 border-slate-700 text-slate-100 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] text-amber-400 mb-1">Umbral atención</Label>
                      <Input
                        type="number" step={0.1}
                        value={config.kpiRanges[key].warning}
                        onChange={(e) => updateRange(key, "warning", parseFloat(e.target.value))}
                        className="h-7 bg-slate-950 border-slate-700 text-slate-100 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ConfigSection>
        </div>
      </div>
    </div>
  );
}

function ConfigSection({
  title, description, children,
}: {
  title: string; description: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ConfigRow({
  label, description, value, min, max, step, unit, onChange,
}: {
  label: string; description: string; value: number;
  min: number; max: number; step: number;
  unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-300">{label}</p>
        <p className="text-[11px] text-slate-500">{description}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Input
          type="number" min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-20 h-7 bg-slate-950 border-slate-700 text-slate-100 text-sm text-right"
        />
        {unit && <span className="text-xs text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}
