"use client"

import { motion } from "framer-motion"
import { Shield, MapPin, FileText, Headphones, BarChart3, Wallet, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSegment } from "./segment-context"

// ─── 5 service cards with color accents ────────────────────────────────────────
const solutions = [
  {
    icon: Shield,
    title: "Seguridad vehicular",
    description:
      "Protección 24/7 con monitoreo satelital en tiempo real, alertas instantáneas y geocercas inteligentes para mantener tu vehículo siempre seguro.",
    highlight: true,
    color: "text-primary",
    bgIcon: "bg-primary/15",
    borderHover: "hover:border-primary/40 hover:shadow-primary/10",
  },
  {
    icon: MapPin,
    title: "Rastreo satelital 24/7",
    description:
      "Ubicación exacta con actualizaciones al segundo, las 24 horas del día. Accede desde cualquier dispositivo, en cualquier momento y desde cualquier lugar.",
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
  },
  {
    icon: FileText,
    title: "Guantera digital",
    description:
      "SOAT, tecnomecánica, seguros y más documentos en un solo lugar. Alertas automáticas antes de que venzan para que nunca pierdas una fecha importante.",
    color: "text-success",
    bgIcon: "bg-success/15",
    borderHover: "hover:border-success/40 hover:shadow-success/10",
  },
  {
    icon: BarChart3,
    title: "Control total de flota",
    description:
      "Analiza recorridos, consumos y comportamiento de conducción. Reportes exportables y KPIs operativos para reducir costos y tomar decisiones rápidas.",
    color: "text-warning",
    bgIcon: "bg-warning/15",
    borderHover: "hover:border-warning/40 hover:shadow-warning/10",
  },
  {
    icon: Headphones,
    title: "Asistencias de movilidad*",
    description:
      "Accede a asistencia vial, emergencias y servicios de movilidad con un solo toque desde la aplicación Simon.",
    disclaimer: "* Sujeto a disponibilidad del prestador de servicio.",
    color: "text-chart-5",
    bgIcon: "bg-chart-5/15",
    borderHover: "hover:border-chart-5/40 hover:shadow-chart-5/10",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

export function SolutionsGrid() {
  const { setSegment } = useSegment()

  const handleAgendarDemo = () => {
    setSegment("empresas")
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="soluciones-grid"
      className="bg-surface py-20 lg:py-28"
      aria-labelledby="solutions-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
          >
            Nuestros servicios
          </motion.span>
          <motion.h2
            id="solutions-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Una sola plataforma para ver, actuar y decidir
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
          >
            Todo lo que necesitas para el control de tu movilidad en un solo lugar.
          </motion.p>
        </motion.div>

        {/* Grid — 5 cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {solutions.map((item, idx) => {
            const isLast = idx === solutions.length - 1
            return (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "glass-card group relative flex flex-col rounded-2xl p-6 transition-all cursor-default",
                  `${item.borderHover} hover:shadow-xl`,
                  item.highlight && "border-primary/20 shadow-sm shadow-primary/8",
                  isLast && "md:col-span-2 lg:col-span-1 lg:col-start-2"
                )}
              >
                {/* Icon with animated glow on hover */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all",
                    item.bgIcon || "bg-primary/8",
                    "group-hover:shadow-lg"
                  )}
                >
                  <item.icon className={cn("h-6 w-6", item.color || "text-primary")} aria-hidden="true" />
                </motion.div>

                <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.disclaimer && (
                  <p className="mt-3 text-[11px] text-muted-foreground/55 italic">
                    {item.disclaimer}
                  </p>
                )}

                {/* Hover reveal: "Explorar" link */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 0 }}
                  className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Incluido en tu plan
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Section disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-xs text-muted-foreground/60 italic"
        >
          * Sujeto a disponibilidad del prestador de servicio.
        </motion.p>

        {/* Simon Pay teaser */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.01 }}
          className="mt-8 flex items-center gap-3 rounded-2xl border border-secondary/25 bg-secondary/5 px-5 py-4 cursor-default hover:border-secondary/40 transition-colors"
          role="note"
          aria-label="Próximamente Simon Pay"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15"
          >
            <Wallet className="h-5 w-5 text-secondary" aria-hidden="true" />
          </motion.div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-secondary">Muy pronto:</span>{" "}
            Integra pagos de peajes, seguros y servicios en una sola billetera.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary group"
            onClick={handleAgendarDemo}
          >
            Conoce nuestras soluciones
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
