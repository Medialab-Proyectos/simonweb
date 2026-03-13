"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  FileText,
  Shield,
  Eye,
  TrendingUp,
  Zap,
  CheckCircle2,
  Car,
  Building2,
} from "lucide-react"
import Image from "next/image"

const personasProblems = [
  {
    problem: "No saber dónde está tu vehículo",
    solution: "Ubicación en tiempo real desde tu celular",
    icon: MapPin,
  },
  {
    problem: "Olvidar documentos y mantenimientos",
    solution: "Guantera digital con alertas automáticas",
    icon: FileText,
  },
  {
    problem: "Preocupación constante por la seguridad",
    solution: "Monitoreo 24/7 y alertas instantáneas",
    icon: Shield,
  },
]

const empresasProblems = [
  {
    problem: "Operación sin visibilidad total",
    solution: "Dashboard centralizado con todos los vehículos",
    icon: Eye,
  },
  {
    problem: "Costos ocultos y seguimiento fragmentado",
    solution: "Análisis de consumo y alertas preventivas",
    icon: TrendingUp,
  },
  {
    problem: "Decisiones lentas por falta de datos",
    solution: "Control centralizado para toda tu flota",
    icon: Zap,
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
}

type Tab = "personas" | "empresas"

export function ProblemSection() {
  const [activeTab, setActiveTab] = useState<Tab>("personas")
  const problems = activeTab === "personas" ? personasProblems : empresasProblems

  return (
    <section id="soluciones" className="py-20 lg:py-28" aria-labelledby="problems-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: contextual image ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-28"
          >
            <figure
              className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-64 w-full sm:h-80 lg:h-[440px]"
              role="img"
              aria-label="Usuario verificando la ubicación de su vehículo desde el celular"
            >
              <Image
                src="/images/audience-personas-new.png"
                alt="Usuario verificando la ubicación de su vehículo desde el celular"
                fill
                className="object-cover"
              />
            </figure>

            {/* Emotional copy below image */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-5 rounded-xl border border-border bg-card px-5 py-4"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Simon elimina esa incertidumbre.</span>{" "}
                Sabe dónde está tu vehículo, cuándo vencen tus documentos y recibe alertas
                en el momento justo — todo desde tu celular.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: heading + tabs + problems ───────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {/* Heading */}
            <motion.span
              variants={fadeInUp}
              className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
            >
              El problema
            </motion.span>
            <motion.h2
              id="problems-heading"
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
            >
              ¿Te identificas con alguno de estos desafíos?
            </motion.h2>

            {/* Tab toggle */}
            <motion.div
              variants={fadeInUp}
              className="mt-8"
            >
              <div
                className="inline-flex rounded-xl border border-border bg-card p-1"
                role="tablist"
                aria-label="Segmento de cliente"
              >
                {(["personas", "empresas"] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${activeTab === tab
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {tab === "personas" ? (
                      <Car className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Building2 className="h-4 w-4" aria-hidden="true" />
                    )}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Problems list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -8 }}
                variants={stagger}
                className="mt-8 flex flex-col gap-4"
                role="tabpanel"
                aria-label={activeTab === "personas" ? "Problemas para personas" : "Problemas para empresas"}
              >
                {problems.map((item) => (
                  <motion.div
                    key={item.problem}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-default"
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground line-through decoration-destructive/40">
                        {item.problem}
                      </p>
                      <p className="mt-1.5 flex items-center gap-2 text-base font-semibold text-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                        {item.solution}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
