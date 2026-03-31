"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Calculator,
  Users,
  Package,
  TrendingUp,
  BookOpen,
  HelpCircle,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/tracker", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tracker/registro", label: "Registro", icon: ClipboardList },
  { href: "/tracker/estimador", label: "Estimador", icon: Calculator },
  { href: "/tracker/roles", label: "KPIs por Rol", icon: Users },
  { href: "/tracker/productos", label: "KPIs por Producto", icon: Package },
  { href: "/tracker/tendencias", label: "Tendencias", icon: TrendingUp },
  { href: "/tracker/kpis", label: "Definición KPIs", icon: BookOpen },
  { href: "/tracker/guia", label: "Guía de uso", icon: HelpCircle },
  { href: "/tracker/resumen", label: "Resumen ejecutivo", icon: FileText },
  { href: "/tracker/configuracion", label: "Configuración", icon: Settings },
];

export function TrackerSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-slate-800 bg-slate-950 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/30">
          <Activity className="h-4 w-4 text-cyan-400" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-100">
              KPI UX Tracker
            </p>
            <p className="truncate text-[10px] text-slate-500">Simon Movilidad</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/tracker"
              ? pathname === "/tracker"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  active ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {active && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-center border-t border-slate-800 py-3 text-slate-500 hover:text-slate-300 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </aside>
  );
}
