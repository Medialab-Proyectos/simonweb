// ============================================================
// KPI UX Performance Tracker — localStorage helpers
// ============================================================

import type { Project, TrackerConfig } from "./types";
import { DEFAULT_CONFIG } from "./types";
import { MOCK_PROJECTS } from "./mock-data";

const STORAGE_KEYS = {
  projects: "ux_tracker_projects",
  config: "ux_tracker_config",
  initialized: "ux_tracker_initialized",
} as const;

// ============================================================
// Project storage
// ============================================================

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    // Seed mock data on first load
    const initialized = localStorage.getItem(STORAGE_KEYS.initialized);
    if (!initialized) {
      localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(MOCK_PROJECTS));
      localStorage.setItem(STORAGE_KEYS.initialized, "true");
      return MOCK_PROJECTS;
    }
    const raw = localStorage.getItem(STORAGE_KEYS.projects);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
  } catch {
    console.error("Error saving projects to localStorage");
  }
}

export function addProject(project: Project): Project[] {
  const projects = loadProjects();
  const updated = [...projects, project];
  saveProjects(updated);
  return updated;
}

export function updateProject(updated: Project): Project[] {
  const projects = loadProjects();
  const list = projects.map((p) => (p.id === updated.id ? updated : p));
  saveProjects(list);
  return list;
}

export function deleteProject(id: string): Project[] {
  const projects = loadProjects();
  const list = projects.filter((p) => p.id !== id);
  saveProjects(list);
  return list;
}

export function duplicateProject(id: string): Project[] {
  const projects = loadProjects();
  const source = projects.find((p) => p.id === id);
  if (!source) return projects;
  const copy: Project = {
    ...source,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    projectName: `${source.projectName} (copia)`,
    status: "En proceso",
  };
  const updated = [...projects, copy];
  saveProjects(updated);
  return updated;
}

// ============================================================
// Config storage
// ============================================================

export function loadConfig(): TrackerConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.config);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) } as TrackerConfig;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: TrackerConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config));
  } catch {
    console.error("Error saving config to localStorage");
  }
}

// ============================================================
// Export/Import
// ============================================================

export function exportProjectsJSON(projects: Project[]): void {
  const blob = new Blob([JSON.stringify(projects, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ux-tracker-export-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportProjectsCSV(projects: Project[]): void {
  const headers = [
    "ID", "Producto", "Proyecto", "Flujo", "Inicio", "Fin",
    "Plataforma", "Complejidad", "Tipo trabajo", "Estado",
    "Horas reales", "Horas estimadas",
    "Junior participó", "Senior participó", "Líder participó",
    "Vistas totales", "Retrabajo",
  ];

  const rows = projects.map((p) => {
    const roles = ["Junior", "Senior", "Líder UX"] as const;
    let totalViews = 0;
    let totalCorrected = 0;
    for (const r of roles) {
      if (p.roles[r].participated) {
        totalViews += p.roles[r].mainViews + p.roles[r].responsiveViews + p.roles[r].extraStateViews;
        totalCorrected += p.roles[r].correctedViews;
      }
    }
    const rework = totalViews > 0 ? ((totalCorrected / totalViews) * 100).toFixed(1) : "0";
    return [
      p.id, p.productName, p.projectName, p.flowName,
      p.startDate, p.endDate, p.platform, p.complexity,
      p.workType, p.status, p.totalRealHours, p.totalEstimatedHours,
      p.roles["Junior"].participated ? "Sí" : "No",
      p.roles["Senior"].participated ? "Sí" : "No",
      p.roles["Líder UX"].participated ? "Sí" : "No",
      totalViews, rework,
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ux-tracker-export-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProjectsFromJSON(
  jsonString: string
): { success: boolean; projects?: Project[]; error?: string } {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data)) {
      return { success: false, error: "El archivo no contiene un array de proyectos." };
    }
    return { success: true, projects: data as Project[] };
  } catch {
    return { success: false, error: "El archivo JSON no es válido." };
  }
}

// ============================================================
// Utilities
// ============================================================

export function generateId(): string {
  return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
