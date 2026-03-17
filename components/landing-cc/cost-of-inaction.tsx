"use client"

import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight } from "lucide-react"

const costs = [
  {
    stat: "65%",
    claim: "de los vehículos robados en Colombia no se recuperan",
    detail: "Sin rastreo activo, si tu vehículo se mueve en la noche nadie te avisa. Lo sabes cuando ya no hay nada que hacer.",
    action: "Ver cómo Simon activa alertas →",
    anchor: "#cc-features",
    color: "border-destructive/25 bg-destructive/4",
    statColor: "text-destructive",
    source: "Datos del sector asegurador colombiano",
  },
  {
    stat: "30 días",
    claim: "es lo que Simon te da de margen antes de cualquier vencimiento de documentos",
    detail: "SOAT, RTM, seguro — la mayoría de multas por documentos vencidos ocurre por falta de recordatorio, no por falta de dinero.",
    action: "Ver cómo funciona la alerta →",
    anchor: "#cc-features",
    color: "border-warning/25 bg-warning/4",
    statColor: "text-warning",
    source: "Ventaja directa con Simon",
  },
  {
    stat: "15–20%",
    claim: "más gasta una flota sin telemetría en combustible vs. una que sí la tiene",
    detail: "Sin datos de rutas, velocidades y paradas, optimizar una flota es adivinar. Y las suposiciones cuestan.",
    action: "Ver reportes de flota →",
    anchor: "#cc-enterprise",
    color: "border-secondary/25 bg-secondary/4",
    statColor: "text-secondary",
    source: "Benchmarks de la industria de gestión de flotas",
  },
]

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function CostOfInactionCC() {
  return (
    <section
      className="relative bg-background py-20 lg:py-28 overflow-hidden"
      aria-labelledby="cc-cost-heading"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-destructive/2 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-4 py-1.5 text-sm text-destructive mb-4">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Lo que les pasa a los vehículos sin Simon
          </motion.div>
          <motion.h2
            id="cc-cost-heading"
            variants={fadeInUp}
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Cada día sin control tiene un costo real
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-muted-foreground max-w-md mx-auto">
            No son hipótesis. Son los tres riesgos que Simon elimina desde el primer día.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {costs.map((c) => (
            <motion.div
              key={c.stat}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`rounded-2xl border p-6 cursor-default ${c.color}`}
            >
              {/* Hard stat */}
              <p className={`text-4xl font-bold tabular-nums mb-2 ${c.statColor}`}>{c.stat}</p>
              <p className="text-sm font-semibold text-foreground leading-snug mb-3">{c.claim}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{c.detail}</p>

              {/* Micro-CTA — scrolls to relevant feature */}
              <a
                href={c.anchor}
                className={`inline-flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-80 ${c.statColor}`}
              >
                {c.action}
              </a>

              {/* Source note */}
              <p className="mt-3 text-[10px] text-muted-foreground/50 italic">{c.source}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
