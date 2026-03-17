"use client"

import { motion } from "framer-motion"
import { MapPin, FileText, BarChart3, CheckCircle2 } from "lucide-react"

const pains = [
  {
    id: "ubicacion",
    icon: MapPin,
    title: "¿Dónde está tu vehículo ahora mismo?",
    description:
      "Si no tienes Simon, la respuesta es: no lo sabes con certeza. Solo lo sabes cuando ya es tarde.",
    color: "text-destructive",
    bg: "bg-destructive/8",
    border: "border-destructive/20",
    glow: "hover:shadow-destructive/10",
  },
  {
    id: "documentos",
    icon: FileText,
    title: "El SOAT vence. Te enteras en el retén.",
    description:
      "SOAT, RTM, seguro — documentos que manejas en papel, correo y recordatorios manuales que siempre fallan.",
    color: "text-warning",
    bg: "bg-warning/8",
    border: "border-warning/20",
    glow: "hover:shadow-warning/10",
  },
  {
    id: "flota",
    icon: BarChart3,
    title: "¿Cuánto está costando tu flota hoy?",
    description:
      "Sin datos en tiempo real, optimizar combustible, rutas y mantenimiento es una estimación, no una decisión.",
    color: "text-secondary",
    bg: "bg-secondary/8",
    border: "border-secondary/20",
    glow: "hover:shadow-secondary/10",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export function ProblemSectionV2() {
  return (
    <section
      id="dolores"
      className="relative py-20 lg:py-28 overflow-hidden bg-[#080808]"
      aria-labelledby="problem-heading-v2"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-destructive/3 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block rounded-full bg-destructive/10 border border-destructive/20 px-4 py-1 text-sm text-destructive"
          >
            Los dolores reales
          </motion.span>
          <motion.h2
            id="problem-heading-v2"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Tres problemas reales.{" "}
            <span className="gradient-text">Una sola solución.</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            Si alguno de estos te suena familiar, Simon está hecho exactamente para ti.
          </motion.p>
        </motion.div>

        {/* Pain columns */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {pains.map((pain) => (
            <motion.div
              key={pain.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`glass-card group relative flex flex-col rounded-2xl border ${pain.border} p-7 cursor-default hover:shadow-xl ${pain.glow} transition-all`}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/2 to-transparent pointer-events-none" />

              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${pain.bg}`}>
                <pain.icon className={`h-6 w-6 ${pain.color}`} aria-hidden="true" />
              </div>

              <h3 className="text-lg font-semibold text-foreground leading-snug">{pain.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pain.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Credibility strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex items-center justify-center gap-3 rounded-2xl border border-primary/15 bg-primary/4 px-6 py-4 text-center"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Llevamos más de{" "}
            <span className="font-semibold text-foreground">4 años</span>{" "}
            resolviendo exactamente estos problemas para propietarios de vehículos y flotas en Colombia.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
