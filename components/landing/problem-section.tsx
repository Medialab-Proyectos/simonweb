"use client"

import { motion } from "framer-motion"
import { Shield, Award, Clock, Zap } from "lucide-react"

const highlights = [
  {
    icon: Shield,
    title: "Seguridad",
    description:
      "Monitoreo constante y alertas instantáneas 24/7 para tu tranquilidad.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Monitoreo",
    description:
      "Control total con soluciones digitales para la gestión de tu vehículo  y optimización avanzada de flotas.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Award,
    title: "Garantía",
    description: "12 meses en equipos.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Clock,
    title: "Garantizamos tu movilidad",
    description:
      "Contamos con altos estándares de cumplimiento normativo y el aval del MinTIC, que respalda la calidad y seguridad de nuestras soluciones tecnológicas.",
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
    <section id="soluciones" className="relative py-12 lg:py-16 overflow-hidden" aria-labelledby="about-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
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
              ¿Quiénes somos?
            </motion.span>

            <motion.h2
              id="about-heading"
              variants={fadeInUp}
              className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight text-balance"
            >
              Control inteligente en{" "}
              <span className="gradient-text">cada kilómetro</span>.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-xl"
            >
              En Simon Movilidad combinamos tecnología y datos para que gestiones tu vehículo y flota de forma más eficiente, segura y rentable. Con telemetría avanzada, rastreo en tiempo real y optimización inteligente de rutas, te damos visibilidad y control para tomar mejores decisiones en el camino. Así transformamos tu experiencia en el camino.
            </motion.p>

          </motion.div>

          {/* ── Right: highlight cards grid ────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
