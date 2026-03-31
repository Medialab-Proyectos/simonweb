"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus, Pencil, Trash2, Copy, Download, Upload,
  ChevronDown, ChevronUp, HelpCircle, ToggleLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  loadProjects, saveProjects, addProject, updateProject,
  deleteProject, duplicateProject, generateId,
  exportProjectsJSON, exportProjectsCSV,
} from "@/lib/tracker/storage";
import type { Project, RoleType, RoleData } from "@/lib/tracker/types";

// ─── Schema ────────────────────────────────────────────────

const roleSchema = z.object({
  participated: z.boolean(),
  designHours: z.number().min(0),
  adjustmentHours: z.number().min(0),
  connectionHours: z.number().min(0),
  fileOrgHours: z.number().min(0),
  participatedInResearch: z.boolean(),
  researchHours: z.number().min(0),
  researchTypes: z.array(z.string()),
  mainViews: z.number().min(0),
  responsiveViews: z.number().min(0),
  extraStateViews: z.number().min(0),
  correctedViews: z.number().min(0),
  totalAssignedViews: z.number().min(0),
  connectedViews: z.number().min(0),
  revisionsReceived: z.number().min(0),
  qualityScore: z.number().min(0).max(10),
  deliveredOnTime: z.boolean(),
  observations: z.string(),
  blockers: z.string(),
  dependencies: z.string(),
});

const projectSchema = z.object({
  productName: z.string().min(1, "Requerido"),
  projectName: z.string().min(1, "Requerido"),
  flowName: z.string().min(1, "Requerido"),
  startDate: z.string().min(1, "Requerido"),
  endDate: z.string().min(1, "Requerido"),
  platform: z.enum(["Mobile", "Web", "Ambos"]),
  complexity: z.enum(["Baja", "Media", "Alta"]),
  workType: z.enum(["Nuevo flujo", "Mejora", "Ajuste", "Copia/adaptación", "Corrección"]),
  status: z.enum(["En proceso", "Entregado", "Aprobado", "Requiere ajustes"]),
  roles: z.object({
    "Junior": roleSchema,
    "Senior": roleSchema,
    "Líder UX": roleSchema,
  }),
  designSystem: z.object({
    reusedComponents: z.number().min(0),
    newComponents: z.number().min(0),
    totalComponents: z.number().min(0),
  }),
  totalRealHours: z.number().min(0),
  totalEstimatedHours: z.number().min(0),
  generalNotes: z.string(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

// ─── Default role ──────────────────────────────────────────

function defaultRole(): RoleData {
  return {
    participated: false,
    designHours: 0, adjustmentHours: 0, connectionHours: 0, fileOrgHours: 0,
    participatedInResearch: false, researchHours: 0, researchTypes: [],
    mainViews: 0, responsiveViews: 0, extraStateViews: 0, correctedViews: 0,
    totalAssignedViews: 0, connectedViews: 0,
    revisionsReceived: 0, qualityScore: 0, deliveredOnTime: true,
    observations: "", blockers: "", dependencies: "",
  };
}

function defaultFormValues(): ProjectFormData {
  return {
    productName: "", projectName: "", flowName: "",
    startDate: "", endDate: "",
    platform: "Mobile", complexity: "Media",
    workType: "Nuevo flujo", status: "En proceso",
    roles: { "Junior": defaultRole(), "Senior": defaultRole(), "Líder UX": defaultRole() },
    designSystem: { reusedComponents: 0, newComponents: 0, totalComponents: 0 },
    totalRealHours: 0, totalEstimatedHours: 0, generalNotes: "",
  };
}

const ROLES: RoleType[] = ["Junior", "Senior", "Líder UX"];
const RESEARCH_TYPES = ["entrevista", "análisis", "revisión de hallazgos", "definición funcional", "benchmark", "otro"];

// ─── Status badge colors ────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  "En proceso": "bg-blue-500/15 text-blue-400",
  "Entregado": "bg-slate-500/15 text-slate-300",
  "Aprobado": "bg-emerald-500/15 text-emerald-400",
  "Requiere ajustes": "bg-amber-500/15 text-amber-400",
};

// ─── Main component ─────────────────────────────────────────

export default function RegistroPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mode, setMode] = useState<"rapido" | "completo">("rapido");
  const [helpOpen, setHelpOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  const { register, handleSubmit, control, reset, watch, setValue, formState: { errors } } =
    useForm<ProjectFormData>({
      resolver: zodResolver(projectSchema),
      defaultValues: defaultFormValues(),
    });

  const watchedRoles = watch("roles");

  function openNew() {
    reset(defaultFormValues());
    setEditingId(null);
    setOpen(true);
  }

  function openEdit(p: Project) {
    reset(p as unknown as ProjectFormData);
    setEditingId(p.id);
    setOpen(true);
  }

  function onSubmit(data: ProjectFormData) {
    const now = new Date().toISOString();
    if (editingId) {
      const updated: Project = {
        ...(projects.find((p) => p.id === editingId)!),
        ...data,
        updatedAt: now,
      };
      const list = updateProject(updated);
      setProjects(list);
    } else {
      const newProject: Project = {
        ...data,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      const list = addProject(newProject);
      setProjects(list);
    }
    setOpen(false);
  }

  function handleDelete(id: string) {
    const list = deleteProject(id);
    setProjects(list);
    setDeleteConfirm(null);
  }

  function handleDuplicate(id: string) {
    const list = duplicateProject(id);
    setProjects(list);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as Project[];
        saveProjects(data);
        setProjects(data);
      } catch {
        alert("Archivo JSON inválido.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Registro de proyectos</h1>
          <p className="mt-1 text-sm text-slate-400">
            {projects.length} proyecto{projects.length !== 1 ? "s" : ""} registrado{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => exportProjectsJSON(projects)}>
            <Download className="mr-1.5 h-3.5 w-3.5" /> JSON
          </Button>
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => exportProjectsCSV(projects)}>
            <Download className="mr-1.5 h-3.5 w-3.5" /> CSV
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800" asChild>
              <span><Upload className="mr-1.5 h-3.5 w-3.5" /> Importar</span>
            </Button>
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => setHelpOpen(true)}>
            <HelpCircle className="mr-1.5 h-3.5 w-3.5" /> Ayuda
          </Button>
          <Button size="sm" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400" onClick={openNew}>
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Nuevo proyecto
          </Button>
        </div>
      </div>

      {/* Project list */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 py-16 text-center">
          <p className="text-slate-400">No hay proyectos registrados.</p>
          <Button size="sm" className="mt-4 bg-cyan-500 text-slate-950 hover:bg-cyan-400" onClick={openNew}>
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Registrar primer proyecto
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                {["Producto", "Proyecto", "Flujo", "Plataforma", "Complejidad", "Estado", "Horas R.", "Horas E.", "Roles", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const participatingRoles = ROLES.filter((r) => p.roles[r].participated);
                return (
                  <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-200">{p.productName}</td>
                    <td className="px-4 py-3 text-slate-300">{p.projectName}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{p.flowName}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{p.platform}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full",
                        p.complexity === "Alta" ? "bg-red-500/15 text-red-400" :
                        p.complexity === "Media" ? "bg-amber-500/15 text-amber-400" :
                        "bg-emerald-500/15 text-emerald-400"
                      )}>{p.complexity}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full", STATUS_COLORS[p.status])}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{p.totalRealHours}h</td>
                    <td className="px-4 py-3 text-slate-400">{p.totalEstimatedHours}h</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {participatingRoles.map((r) => (
                          <span key={r} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                            {r === "Líder UX" ? "Líder" : r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(p)} className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDuplicate(p.id)} className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setDeleteConfirm(p.id)} className="p-1 rounded hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar proyecto" : "Registrar proyecto"}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Complete los campos del proyecto.
            </DialogDescription>
          </DialogHeader>

          {/* Mode toggle */}
          <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3">
            <ToggleLeft className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-400">Modo:</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setMode("rapido")}
                className={cn("rounded px-3 py-1 text-xs transition-colors",
                  mode === "rapido" ? "bg-cyan-500 text-slate-950 font-medium" : "text-slate-400 hover:text-slate-200"
                )}
              >
                Rápido
              </button>
              <button
                type="button"
                onClick={() => setMode("completo")}
                className={cn("rounded px-3 py-1 text-xs transition-colors",
                  mode === "completo" ? "bg-cyan-500 text-slate-950 font-medium" : "text-slate-400 hover:text-slate-200"
                )}
              >
                Completo
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* A. General data */}
            <section className="space-y-4 rounded-lg border border-slate-800 p-4">
              <h3 className="text-sm font-semibold text-slate-200">A. Datos generales</h3>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Producto" error={errors.productName?.message}>
                  <Input {...register("productName")} placeholder="Ej: Simon App" className="bg-slate-900 border-slate-700 text-slate-100" />
                </Field>
                <Field label="Proyecto" error={errors.projectName?.message}>
                  <Input {...register("projectName")} placeholder="Ej: Onboarding V2" className="bg-slate-900 border-slate-700 text-slate-100" />
                </Field>
                <Field label="Flujo / módulo" error={errors.flowName?.message} className="col-span-2">
                  <Input {...register("flowName")} placeholder="Ej: Registro y activación" className="bg-slate-900 border-slate-700 text-slate-100" />
                </Field>
                <Field label="Inicio">
                  <Input type="date" {...register("startDate")} className="bg-slate-900 border-slate-700 text-slate-100" />
                </Field>
                <Field label="Fin">
                  <Input type="date" {...register("endDate")} className="bg-slate-900 border-slate-700 text-slate-100" />
                </Field>
                <Field label="Plataforma">
                  <Controller name="platform" control={control} render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {["Mobile", "Web", "Ambos"].map((v) => <SelectItem key={v} value={v} className="text-slate-200">{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )} />
                </Field>
                <Field label="Complejidad">
                  <Controller name="complexity" control={control} render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {["Baja", "Media", "Alta"].map((v) => <SelectItem key={v} value={v} className="text-slate-200">{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  )} />
                </Field>
                <Field label="Tipo de trabajo">
                  <Controller name="workType" control={control} render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {["Nuevo flujo", "Mejora", "Ajuste", "Copia/adaptación", "Corrección"].map((v) => (
                          <SelectItem key={v} value={v} className="text-slate-200">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )} />
                </Field>
                <Field label="Estado">
                  <Controller name="status" control={control} render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        {["En proceso", "Entregado", "Aprobado", "Requiere ajustes"].map((v) => (
                          <SelectItem key={v} value={v} className="text-slate-200">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )} />
                </Field>
              </div>
            </section>

            {/* B. Roles */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-200">B. Participación por rol</h3>
              {ROLES.map((role) => {
                const participated = watchedRoles[role]?.participated;
                return (
                  <div key={role} className="rounded-lg border border-slate-800 overflow-hidden">
                    {/* Role header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50">
                      <span className="text-sm font-medium text-slate-200">{role}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">
                          {participated ? "Participó" : "No participó"}
                        </span>
                        <Controller
                          name={`roles.${role}.participated`}
                          control={control}
                          render={({ field }) => (
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-cyan-500"
                            />
                          )}
                        />
                      </div>
                    </div>

                    {participated && (
                      <div className="p-4 space-y-4 bg-slate-900/20">
                        {/* Design hours */}
                        <div>
                          <p className="mb-2 text-xs font-medium text-slate-400">1. Horas de diseño</p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            <Field label="Diseño" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.designHours`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <Field label="Ajustes" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.adjustmentHours`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <Field label="Conexión" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.connectionHours`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            {mode === "completo" && (
                              <Field label="Org. archivo" size="sm">
                                <Input type="number" min={0} {...register(`roles.${role}.fileOrgHours`, { valueAsNumber: true })}
                                  className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                              </Field>
                            )}
                          </div>
                        </div>

                        {/* Research */}
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <p className="text-xs font-medium text-slate-400">2. Investigación</p>
                            <Controller
                              name={`roles.${role}.participatedInResearch`}
                              control={control}
                              render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-cyan-500 scale-75" />
                              )}
                            />
                            <span className="text-[11px] text-slate-500">
                              {watchedRoles[role]?.participatedInResearch ? "Sí participó" : "No participó"}
                            </span>
                          </div>
                          {watchedRoles[role]?.participatedInResearch && (
                            <div className="grid grid-cols-2 gap-2">
                              <Field label="Horas de investigación" size="sm">
                                <Input type="number" min={0} {...register(`roles.${role}.researchHours`, { valueAsNumber: true })}
                                  className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                              </Field>
                              {mode === "completo" && (
                                <Field label="Tipo de participación" size="sm">
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {RESEARCH_TYPES.map((t) => {
                                      const types = watchedRoles[role]?.researchTypes || [];
                                      const active = types.includes(t);
                                      return (
                                        <button
                                          key={t}
                                          type="button"
                                          onClick={() => {
                                            const curr = watchedRoles[role]?.researchTypes || [];
                                            setValue(`roles.${role}.researchTypes`,
                                              active ? curr.filter((x) => x !== t) : [...curr, t]
                                            );
                                          }}
                                          className={cn("text-[10px] px-2 py-0.5 rounded-full border transition-colors",
                                            active ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400" : "border-slate-700 text-slate-500 hover:text-slate-300"
                                          )}
                                        >
                                          {t}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </Field>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Production */}
                        <div>
                          <p className="mb-2 text-xs font-medium text-slate-400">3. Producción</p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            <Field label="Vistas principales" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.mainViews`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <Field label="Vistas responsive" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.responsiveViews`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <Field label="Estados extra" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.extraStateViews`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <Field label="Vistas corregidas" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.correctedViews`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <Field label="Asignadas (total)" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.totalAssignedViews`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <Field label="Conectadas correctamente" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.connectedViews`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                          </div>
                        </div>

                        {/* Quality */}
                        <div>
                          <p className="mb-2 text-xs font-medium text-slate-400">4. Calidad y entrega</p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 items-end">
                            <Field label="Revisiones recibidas" size="sm">
                              <Input type="number" min={0} {...register(`roles.${role}.revisionsReceived`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <Field label="Calidad stakeholder (1-10)" size="sm">
                              <Input type="number" min={1} max={10} step={0.5} {...register(`roles.${role}.qualityScore`, { valueAsNumber: true })}
                                className="bg-slate-900 border-slate-700 text-slate-100 h-8 text-sm" />
                            </Field>
                            <div className="flex flex-col gap-1">
                              <Label className="text-xs text-slate-400">Entregó a tiempo</Label>
                              <Controller
                                name={`roles.${role}.deliveredOnTime`}
                                control={control}
                                render={({ field }) => (
                                  <div className="flex items-center gap-2 mt-1">
                                    <Switch checked={field.value} onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-emerald-500" />
                                    <span className="text-xs text-slate-400">{field.value ? "Sí" : "No"}</span>
                                  </div>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Notes (completo mode) */}
                        {mode === "completo" && (
                          <div>
                            <p className="mb-2 text-xs font-medium text-slate-400">5. Notas</p>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                              <Field label="Observaciones" size="sm">
                                <Textarea {...register(`roles.${role}.observations`)}
                                  className="bg-slate-900 border-slate-700 text-slate-100 text-xs min-h-16 resize-none" />
                              </Field>
                              <Field label="Bloqueos" size="sm">
                                <Textarea {...register(`roles.${role}.blockers`)}
                                  className="bg-slate-900 border-slate-700 text-slate-100 text-xs min-h-16 resize-none" />
                              </Field>
                              <Field label="Dependencias" size="sm">
                                <Textarea {...register(`roles.${role}.dependencies`)}
                                  className="bg-slate-900 border-slate-700 text-slate-100 text-xs min-h-16 resize-none" />
                              </Field>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>

            {/* C. Design system (completo) */}
            {mode === "completo" && (
              <section className="space-y-3 rounded-lg border border-slate-800 p-4">
                <h3 className="text-sm font-semibold text-slate-200">C. Sistema de diseño</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Reutilizados">
                    <Input type="number" min={0} {...register("designSystem.reusedComponents", { valueAsNumber: true })}
                      className="bg-slate-900 border-slate-700 text-slate-100" />
                  </Field>
                  <Field label="Nuevos creados">
                    <Input type="number" min={0} {...register("designSystem.newComponents", { valueAsNumber: true })}
                      className="bg-slate-900 border-slate-700 text-slate-100" />
                  </Field>
                  <Field label="Total usados">
                    <Input type="number" min={0} {...register("designSystem.totalComponents", { valueAsNumber: true })}
                      className="bg-slate-900 border-slate-700 text-slate-100" />
                  </Field>
                </div>
              </section>
            )}

            {/* D. Global timing */}
            <section className="space-y-3 rounded-lg border border-slate-800 p-4">
              <h3 className="text-sm font-semibold text-slate-200">D. Tiempos globales</h3>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Horas reales totales">
                  <Input type="number" min={0} {...register("totalRealHours", { valueAsNumber: true })}
                    className="bg-slate-900 border-slate-700 text-slate-100" />
                </Field>
                <Field label="Horas estimadas">
                  <Input type="number" min={0} {...register("totalEstimatedHours", { valueAsNumber: true })}
                    className="bg-slate-900 border-slate-700 text-slate-100" />
                </Field>
                {mode === "completo" && (
                  <Field label="Notas generales" className="col-span-2">
                    <Textarea {...register("generalNotes")}
                      placeholder="Contexto, decisiones, aprendizajes del proyecto..."
                      className="bg-slate-900 border-slate-700 text-slate-100 min-h-20 resize-none" />
                  </Field>
                )}
              </div>
            </section>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800">
                Cancelar
              </Button>
              <Button type="submit" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                {editingId ? "Guardar cambios" : "Registrar proyecto"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm bg-slate-950 border-slate-800 text-slate-100">
          <DialogHeader>
            <DialogTitle>¿Eliminar proyecto?</DialogTitle>
            <DialogDescription className="text-slate-400">
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800">
              Cancelar
            </Button>
            <Button onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="bg-red-600 hover:bg-red-500 text-white">
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-lg bg-slate-950 border-slate-800 text-slate-100 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ayuda para registro de proyectos</DialogTitle>
          </DialogHeader>
          <Accordion type="multiple" className="space-y-1">
            {[
              ["¿Cómo llenar este formulario?", "Usa el modo Rápido para registrar los datos esenciales. Usa el modo Completo para capturar todo el detalle, incluyendo notas, sistema de diseño y tipos de investigación."],
              ["¿Qué datos son obligatorios?", "Nombre del producto, proyecto, flujo, fechas y al menos un rol participante con horas y vistas."],
              ["¿Qué pasa si un rol no participó?", "Desactiva el switch del rol. Sus campos se ocultarán y no entrarán en los cálculos."],
              ["¿Cómo registrar horas de investigación?", "Dentro del card de cada rol, activa 'Investigación'. Ingresa las horas y, en modo completo, el tipo de participación."],
              ["¿Cómo registrar vistas corregidas?", "En el campo 'Vistas corregidas' del rol, ingresa el número de vistas que debieron rehacerse o corregirse por revisión del stakeholder."],
            ].map(([q, a]) => (
              <AccordionItem key={q} value={q!} className="border-slate-800">
                <AccordionTrigger className="text-sm text-slate-200 hover:no-underline px-3">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-slate-400 px-3 pb-3">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Field helper ───────────────────────────────────────────

function Field({
  label, error, children, className, size,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label className={cn("text-slate-400", size === "sm" ? "text-[11px]" : "text-xs")}>
        {label}
      </Label>
      {children}
      {error && <span className="text-[11px] text-red-400">{error}</span>}
    </div>
  );
}
