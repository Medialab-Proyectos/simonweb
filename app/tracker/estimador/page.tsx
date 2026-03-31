"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Calculator, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { loadProjects, loadConfig } from "@/lib/tracker/storage";
import { estimateProjectHours } from "@/lib/tracker/estimator";
import type { Project, EstimatorInput, EstimationResult, TrackerConfig } from "@/lib/tracker/types";

const schema = z.object({
  productName: z.string().min(1, "Requerido"),
  workType: z.enum(["Nuevo flujo", "Mejora", "Ajuste", "Copia/adaptación", "Corrección"]),
  platform: z.enum(["Mobile", "Web", "Ambos"]),
  complexity: z.enum(["Baja", "Media", "Alta"]),
  mainViews: z.number().min(1),
  responsiveViews: z.number().min(0),
  extraStateViews: z.number().min(0),
  requiresFlowConnection: z.boolean(),
  requiresDiscovery: z.boolean(),
  requirementClarity: z.enum(["bajo", "medio", "alto"]),
  roles: z.object({ junior: z.boolean(), senior: z.boolean(), lider: z.boolean() }),
  roleParticipation: z.object({
    junior: z.object({ percentage: z.number().min(0).max(100), participatesInResearch: z.boolean() }),
    senior: z.object({ percentage: z.number().min(0).max(100), participatesInResearch: z.boolean() }),
    lider: z.object({ percentage: z.number().min(0).max(100), participatesInResearch: z.boolean() }),
  }),
});

type FormData = z.infer<typeof schema>;

function defaultValues(): FormData {
  return {
    productName: "Nuevo proyecto",
    workType: "Nuevo flujo",
    platform: "Mobile",
    complexity: "Media",
    mainViews: 10,
    responsiveViews: 8,
    extraStateViews: 4,
    requiresFlowConnection: true,
    requiresDiscovery: false,
    requirementClarity: "medio",
    roles: { junior: true, senior: true, lider: false },
    roleParticipation: {
      junior: { percentage: 100, participatesInResearch: false },
      senior: { percentage: 100, participatesInResearch: false },
      lider: { percentage: 50, participatesInResearch: true },
    },
  };
}

const ROLE_LABELS: Record<string, string> = { junior: "Junior", senior: "Senior", lider: "Líder UX" };
const ROLE_COLORS: Record<string, string> = { Junior: "#f59e0b", Senior: "#3b82f6", "Líder UX": "#10b981" };

export default function EstimadorPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [config, setConfig] = useState<TrackerConfig | null>(null);
  const [result, setResult] = useState<EstimationResult | null>(null);

  useEffect(() => {
    setProjects(loadProjects());
    setConfig(loadConfig());
  }, []);

  const { register, handleSubmit, control, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues(),
  });

  const watchedRoles = watch("roles");
  const watchedDiscovery = watch("requiresDiscovery");

  function onSubmit(data: FormData) {
    if (!config) return;
    const input: EstimatorInput = data;
    const res = estimateProjectHours(projects, input, config);
    setResult(res);
  }

  const chartData = result
    ? Object.entries(result.byRole).map(([role, hours]) => ({
        role,
        "Diseño": hours.design,
        "Investigación": hours.research,
        "Total": hours.total,
      }))
    : [];

  const rangeData = result
    ? [
        { name: "Optimista", horas: result.optimistic, fill: "#10b981" },
        { name: "Probable", horas: result.probable, fill: "#3b82f6" },
        { name: "Base", horas: result.base, fill: "#6366f1" },
        { name: "Conservadora", horas: result.conservative, fill: "#f59e0b" },
      ]
    : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Estimador de proyecto</h1>
        <p className="mt-1 text-sm text-slate-400">
          Estimación basada en el histórico de {projects.length} proyectos registrados
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-5">
          {/* General */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-200">Datos del proyecto</h3>
            <div className="space-y-2">
              <FormField label="Nombre del producto">
                <Input {...register("productName")} className="bg-slate-950 border-slate-700 text-slate-100 h-8 text-sm" />
              </FormField>
              <div className="grid grid-cols-2 gap-2">
                <FormField label="Tipo de trabajo">
                  <Controller name="workType" control={control} render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-950 border-slate-700 text-slate-100 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {["Nuevo flujo", "Mejora", "Ajuste", "Copia/adaptación", "Corrección"].map((v) => (
                          <SelectItem key={v} value={v} className="text-slate-200 text-sm">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )} />
                </FormField>
                <FormField label="Plataforma">
                  <Controller name="platform" control={control} render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-950 border-slate-700 text-slate-100 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {["Mobile", "Web", "Ambos"].map((v) => (
                          <SelectItem key={v} value={v} className="text-slate-200 text-sm">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )} />
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField label="Complejidad">
                  <Controller name="complexity" control={control} render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-950 border-slate-700 text-slate-100 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {["Baja", "Media", "Alta"].map((v) => (
                          <SelectItem key={v} value={v} className="text-slate-200 text-sm">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )} />
                </FormField>
                <FormField label="Claridad del req.">
                  <Controller name="requirementClarity" control={control} render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-950 border-slate-700 text-slate-100 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {["alto", "medio", "bajo"].map((v) => (
                          <SelectItem key={v} value={v} className="text-slate-200 text-sm capitalize">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )} />
                </FormField>
              </div>
            </div>
          </section>

          {/* Views */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-200">Vistas estimadas</h3>
            <div className="grid grid-cols-3 gap-2">
              <FormField label="Principales">
                <Input type="number" min={0} {...register("mainViews", { valueAsNumber: true })}
                  className="bg-slate-950 border-slate-700 text-slate-100 h-8 text-sm" />
              </FormField>
              <FormField label="Responsive">
                <Input type="number" min={0} {...register("responsiveViews", { valueAsNumber: true })}
                  className="bg-slate-950 border-slate-700 text-slate-100 h-8 text-sm" />
              </FormField>
              <FormField label="Estados extra">
                <Input type="number" min={0} {...register("extraStateViews", { valueAsNumber: true })}
                  className="bg-slate-950 border-slate-700 text-slate-100 h-8 text-sm" />
              </FormField>
            </div>
          </section>

          {/* Flags */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-200">Características del proyecto</h3>
            <div className="space-y-2">
              {[
                { name: "requiresFlowConnection" as const, label: "Requiere conexión de flujos" },
                { name: "requiresDiscovery" as const, label: "Requiere discovery / investigación" },
              ].map(({ name, label }) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{label}</span>
                  <Controller name={name} control={control} render={({ field }) => (
                    <Switch checked={field.value as boolean} onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-cyan-500" />
                  )} />
                </div>
              ))}
            </div>
          </section>

          {/* Roles */}
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-200">Roles participantes</h3>
            {(["junior", "senior", "lider"] as const).map((key) => {
              const active = watchedRoles[key];
              return (
                <div key={key} className={cn("rounded-lg border p-3 space-y-2 transition-colors",
                  active ? "border-slate-700" : "border-slate-800 opacity-50"
                )}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: ROLE_COLORS[ROLE_LABELS[key]] }}>
                      {ROLE_LABELS[key]}
                    </span>
                    <Controller name={`roles.${key}`} control={control} render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-cyan-500" />
                    )} />
                  </div>
                  {active && (
                    <div className="grid grid-cols-2 gap-2">
                      <FormField label="% participación">
                        <Input type="number" min={0} max={100}
                          {...register(`roleParticipation.${key}.percentage`, { valueAsNumber: true })}
                          className="bg-slate-950 border-slate-700 text-slate-100 h-7 text-xs" />
                      </FormField>
                      {watchedDiscovery && (
                        <FormField label="Participa en research">
                          <Controller name={`roleParticipation.${key}.participatesInResearch`} control={control}
                            render={({ field }) => (
                              <div className="flex items-center gap-2 mt-1">
                                <Switch checked={field.value} onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-cyan-500 scale-75" />
                                <span className="text-[11px] text-slate-500">{field.value ? "Sí" : "No"}</span>
                              </div>
                            )} />
                        </FormField>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          <Button type="submit" className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold">
            <Calculator className="mr-2 h-4 w-4" />
            Calcular estimación
          </Button>
        </form>

        {/* Results */}
        <div className="lg:col-span-3 space-y-5">
          {!result ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 text-center p-8">
              <Calculator className="h-10 w-10 text-slate-600 mb-3" />
              <p className="text-slate-400 text-sm">Completa el formulario y haz clic en "Calcular estimación" para ver los resultados.</p>
            </div>
          ) : (
            <>
              {/* Estimation ranges */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-200">Estimación de horas</h3>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full ring-1",
                    result.confidence >= 70 ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" :
                    result.confidence >= 50 ? "bg-amber-500/10 text-amber-400 ring-amber-500/20" :
                    "bg-red-500/10 text-red-400 ring-red-500/20"
                  )}>
                    {result.confidence}% confianza
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Optimista", value: result.optimistic, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "Probable", value: result.probable, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "Base", value: result.base, color: "text-indigo-400", bg: "bg-indigo-500/10" },
                    { label: "Conservadora", value: result.conservative, color: "text-amber-400", bg: "bg-amber-500/10" },
                  ].map(({ label, value, color, bg }) => (
                    <div key={label} className={cn("rounded-lg p-3 text-center", bg)}>
                      <p className="text-xs text-slate-400 mb-1">{label}</p>
                      <p className={cn("text-2xl font-bold tabular-nums", color)}>{value}h</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-slate-800/50 p-3 space-y-1">
                  <p className="text-xs text-slate-400">
                    <span className="text-slate-200 font-medium">Entrega estimada:</span>{" "}
                    {result.deliveryRangeDays.min}–{result.deliveryRangeDays.max} días hábiles
                  </p>
                  <p className="text-xs text-slate-400">
                    <span className="text-slate-200 font-medium">Riesgo de retrabajo:</span>{" "}
                    {result.reworkRisk}%
                  </p>
                  <p className="text-xs text-slate-400">
                    <span className="text-slate-200 font-medium">Proyectos similares usados:</span>{" "}
                    {result.similarProjectsUsed}
                  </p>
                </div>
              </div>

              {/* By role chart */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <h3 className="text-sm font-semibold text-slate-200 mb-3">Horas por rol</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="role" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Diseño" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Investigación" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 space-y-1">
                  {Object.entries(result.byRole).map(([role, hours]) => (
                    <div key={role} className="flex items-center justify-between rounded bg-slate-800/40 px-3 py-1.5">
                      <span className="text-xs font-medium" style={{ color: ROLE_COLORS[role] }}>{role}</span>
                      <div className="flex gap-4 text-xs text-slate-400">
                        <span>Diseño: <span className="text-slate-200">{hours.design}h</span></span>
                        {hours.research > 0 && <span>Research: <span className="text-slate-200">{hours.research}h</span></span>}
                        <span className="font-medium text-slate-100">Total: {hours.total}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodology */}
              <Accordion type="multiple" className="space-y-2">
                <AccordionItem value="methodology" className="border border-slate-800 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-sm text-slate-200 hover:no-underline bg-slate-900">
                    Cómo se calculó esta estimación
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-900/50 px-4 pb-4 space-y-3">
                    <p className="text-xs text-slate-400 leading-relaxed">{result.methodology}</p>
                    {result.keyFactors.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-slate-300 mb-1">Factores que afectan el resultado:</p>
                        <ul className="space-y-1">
                          {result.keyFactors.map((f, i) => (
                            <li key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-cyan-400 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 italic">
                      La confianza de esta estimación es del {result.confidence}%.{" "}
                      {result.confidence < 60 && "Registrar más proyectos similares mejorará la precisión."}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data" className="border border-slate-800 rounded-xl overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 text-sm text-slate-200 hover:no-underline bg-slate-900">
                    Datos históricos utilizados
                  </AccordionTrigger>
                  <AccordionContent className="bg-slate-900/50 px-4 pb-4">
                    <p className="text-xs text-slate-400">
                      Se usaron <strong className="text-slate-200">{result.similarProjectsUsed}</strong> proyectos similares del histórico.{" "}
                      {result.similarProjectsUsed < 3
                        ? "Con menos de 3 proyectos similares, la estimación usa el promedio general del historial."
                        : "Se priorizaron proyectos con misma complejidad, tipo de trabajo y plataforma."}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-[11px] text-slate-400">{label}</Label>
      {children}
    </div>
  );
}
