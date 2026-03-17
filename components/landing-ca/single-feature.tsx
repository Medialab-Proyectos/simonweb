"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, BarChart3, Bell, FileText, TrendingUp, Eye, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useSegment } from "@/components/landing/segment-context"
import { cn } from "@/lib/utils"

const personasContent = {
  overline: "Para tu vehículo particular",
  heading: "Sabe dónde está tu carro en este momento",
  description:
    "Simon transmite la ubicación de tu vehículo segundo a segundo. Si algo pasa — movimiento inesperado, salida de geocerca, velocidad inusual — recibes una alerta de inmediato en tu celular.",
  icon: MapPin,
  color: "text-primary",
  bg: "bg-primary/10",
  border: "border-primary/20",
  bullets: [
    "Ubicación exacta en tiempo real, 24/7",
    "Alertas instantáneas ante movimiento no autorizado",
    "Historial de recorridos de los últimos 90 días",
  ],
  allFeaturesLabel: "Ver documentos, reportes y más funciones",
  allFeatures: [
    { icon: Bell, text: "Alertas accionables en el momento justo" },
    { icon: FileText, text: "Documentos del vehículo centralizados y con alertas de vencimiento" },
    { icon: BarChart3, text: "Reportes de velocidad, paradas y consumo exportables" },
  ],
}

const empresasContent = {
  overline: "Para tu flota empresarial",
  heading: "Reduce costos de flota sin agregar procesos",
  description:
    "Simon centraliza toda la operación de tu flota en un dashboard en tiempo real. Ves KPIs, alertas y trazabilidad de cada vehículo sin necesidad de llamadas ni hojas de cálculo.",
  icon: BarChart3,
  color: "text-secondary",
  bg: "bg-secondary/10",
  border: "border-secondary/20",
  bullets: [
    "Dashboard unificado con el estado de toda la flota",
    "KPIs de combustible y rutas para optimizar costos",
    "Reportes exportables para auditoría y control",
  ],
  allFeaturesLabel: "Ver geocercas, alertas y más funciones",
  allFeatures: [
    { icon: Eye, text: "Visibilidad total de la flota en tiempo real" },
    { icon: TrendingUp, text: "Tendencias operativas y comparativas por vehículo" },
    { icon: Bell, text: "Alertas centralizadas para toda la flota" },
  ],
}

export function SingleFeatureCA() {
  const { segment } = useSegment()
  const [expanded, setExpanded] = useState(false)
  const content = segment === "empresas" ? empresasContent : personasContent
  const Icon = content.icon

  return (
    <section
      id="ca-feature"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="ca-feature-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left: Visual */}
          <motion.div
            key={segment + "-visual"}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div
              className={cn(
                "flex h-64 w-64 lg:h-80 lg:w-80 items-center justify-center rounded-3xl border",
                content.border, content.bg
              )}
              style={{ boxShadow: segment === "empresas" ? "0 0 80px rgba(25,181,255,0.07)" : "0 0 80px rgba(0,255,194,0.07)" }}
            >
              <Icon
                className={cn("h-24 w-24 lg:h-32 lg:w-32", content.color)}
                strokeWidth={1.25}
                aria-hidden="true"
              />
            </div>
            {/* Decorative rings */}
            <div className={cn("absolute inset-0 rounded-full border opacity-10 scale-110", content.border)} aria-hidden="true" />
            <div className={cn("absolute inset-0 rounded-full border opacity-5 scale-125", content.border)} aria-hidden="true" />
          </motion.div>

          {/* Right: Copy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={segment}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
            >
              <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-semibold", content.bg, content.color)}>
                {content.overline}
              </span>

              <h2
                id="ca-feature-heading"
                className="mt-4 text-3xl font-bold text-foreground sm:text-4xl leading-tight text-balance"
              >
                {content.heading}
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {content.description}
              </p>

              <ul className="mt-7 space-y-3" aria-label="Características principales">
                {content.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className={cn("mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center", content.bg)}>
                      <div className={cn("h-2 w-2 rounded-full", content.color.replace("text-", "bg-"))} />
                    </div>
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Progressive disclosure — more features */}
              <div className="mt-8">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium transition-colors",
                    content.color, "hover:opacity-80"
                  )}
                  aria-expanded={expanded}
                >
                  {expanded ? "Cerrar" : content.allFeaturesLabel}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-4 space-y-3"
                      aria-label="Funciones adicionales"
                    >
                      {content.allFeatures.map((f) => (
                        <li key={f.text} className="flex items-center gap-3">
                          <div className={cn("h-9 w-9 shrink-0 flex items-center justify-center rounded-xl", content.bg)}>
                            <f.icon className={cn("h-4 w-4", content.color)} aria-hidden="true" />
                          </div>
                          <span className="text-sm text-muted-foreground">{f.text}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
