"use client"

import { Car, Building2 } from "lucide-react"
import { useSegment, type Segment } from "./segment-context"
import { cn } from "@/lib/utils"

const tabs: { value: Segment; label: string; Icon: typeof Car }[] = [
  { value: "personas",  label: "Personas",  Icon: Car       },
  { value: "empresas",  label: "Empresas",  Icon: Building2 },
]

interface SegmentSwitcherProps {
  className?: string
  size?: "sm" | "default"
}

export function SegmentSwitcher({ className, size = "default" }: SegmentSwitcherProps) {
  const { segment, setSegment } = useSegment()

  return (
    <div
      className={cn(
        "inline-flex rounded-xl border border-border bg-card p-1",
        className
      )}
      role="tablist"
      aria-label="Seleccionar segmento"
    >
      {tabs.map(({ value, label, Icon }) => (
        <button
          key={value}
          role="tab"
          aria-selected={segment === value}
          onClick={() => setSegment(value)}
          className={cn(
            "flex items-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1",
            size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm",
            segment === value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden="true" />
          {label}
        </button>
      ))}
    </div>
  )
}
