"use client"

import { motion } from "framer-motion"
import { Shield, Award, Clock, Zap, CheckCircle2 } from "lucide-react"

const highlights = [
  {
    icon: Clock,
    title: "+4 años",
    description: "Impulsando la movilidad inteligente del país",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Award,
    title: "12 meses de garantía",
    description: "En todos nuestros equipos de rastreo",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Shield,
    title: "Soporte 24/7",
    description: "Equipo dedicado disponible en todo momento",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Zap,
    title: "Tecnología de punta",
    description: "Dispositivos GPS de última generación",
    color: "text-warning",
    bg: "bg-warning/10",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function ProblemSection() {
  return (
    <section id="soluciones" className="relative py-20 lg:py-28 overflow-hidden" aria-labelledby="about-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080808]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-primary/3 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: content ──────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary"
            >
              Por qué confiar en Simon
            </motion.span>

            <motion.h2
              id="about-heading"
              variants={fadeInUp}
              className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight text-balance"
            >
              Más de 4 años impulsando la movilidad{" "}
              <span className="gradient-text">inteligente en Colombia</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-xl"
            >
              Construidos con cada vehículo conectado. Con tecnología de punta, soporte real y
              cobertura nacional, somos el aliado que tu vehículo necesita.
            </motion.p>

            {/* Key differentiators */}
            <motion.div variants={fadeInUp} className="mt-8 space-y-3">
              {[
                "Integración completa con app móvil y plataforma web",
                "Alertas inteligentes y geocercas configurables",
                "12 meses de garantía en todos los equipos",
                "Cobertura a nivel nacional",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: highlight cards grid ────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card relative group flex flex-col items-start gap-3 rounded-2xl p-5 cursor-default hover:border-primary/30 transition-all"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} aria-hidden="true" />
                </motion.div>

                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
