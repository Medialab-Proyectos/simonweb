"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: "healthy" | "warning" | "critical" | "neutral";
  tooltip?: string;
  meaning?: string;
  subtext?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const statusColors = {
  healthy: {
    badge: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    dot: "bg-emerald-400",
    label: "Saludable",
  },
  warning: {
    badge: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    dot: "bg-amber-400",
    label: "Atención",
  },
  critical: {
    badge: "bg-red-500/10 text-red-400 ring-red-500/20",
    dot: "bg-red-400",
    label: "Crítico",
  },
  neutral: {
    badge: "bg-slate-500/10 text-slate-400 ring-slate-500/20",
    dot: "bg-slate-400",
    label: "—",
  },
};

export function KPICard({
  label,
  value,
  unit,
  status = "neutral",
  tooltip,
  meaning,
  subtext,
  className,
  size = "md",
}: KPICardProps) {
  const colors = statusColors[status];

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-4 transition-shadow hover:shadow-lg hover:shadow-black/20",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "text-slate-400",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm font-medium" : "text-xs"
          )}
        >
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          {status !== "neutral" && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1",
                colors.badge
              )}
            >
              <span className={cn("h-1 w-1 rounded-full", colors.dot)} />
              {colors.label}
            </span>
          )}
          {(tooltip || meaning) && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-slate-600 hover:text-slate-400 transition-colors">
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs border-slate-700 bg-slate-900 text-slate-200"
                >
                  {tooltip && <p className="text-xs">{tooltip}</p>}
                  {meaning && (
                    <p className="mt-1 text-[11px] text-slate-400">{meaning}</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-bold tabular-nums text-slate-100",
            size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl"
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs text-slate-500">{unit}</span>
        )}
      </div>

      {/* Subtext */}
      {subtext && (
        <p className="text-[11px] text-slate-500 leading-relaxed">{subtext}</p>
      )}
    </div>
  );
}

// ─── Semaphore Badge ───────────────────────────────────────

interface SemaphoreBadgeProps {
  status: "healthy" | "warning" | "critical";
  label?: string;
}

export function SemaphoreBadge({ status, label }: SemaphoreBadgeProps) {
  const colors = statusColors[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1",
        colors.badge
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", colors.dot)} />
      {label ?? colors.label}
    </span>
  );
}
