"use client"

import { motion } from "framer-motion"
import {
  MapPin,
  Globe,
  FileText,
  Headphones,
  BarChart3,
  Users,
  ArrowRight,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const solutions = [
  {
    icon: MapPin,
    title: "Rastreo satelital 24/7",
    description:
      "Ubicación exacta con actualizaciones al segundo, las 24 horas del día. Accede desde cualquier dispositivo, en cualquier momento.",
  },
  {
    icon: Globe,
    title: "Geocercas y alertas",
    description:
      "Define zonas seguras y recibe notificaciones instantáneas cuando un vehículo entra o sale de ellas.",
  },
  {
    icon: FileText,
    title: "Guantera digital",
    description:
      "SOAT, tecnomecánica, seguros y más en un solo lugar. Alertas automáticas antes de que venzan.",
  },
  {
    icon: Headphones,
    title: "Asistencias de movilidad*",
    description:
      "Accede a asistencia vial y emergencias con un solo toque desde la aplicación.",
    disclaimer: "* Sujeto a disponibilidad del prestador de servicio.",
  },
  {
    icon: BarChart3,
    title: "Reportes inteligentes",
    description:
      "Analiza recorridos, consumos y comportamiento de conducción con reportes detallados y exportables.",
  },
  {
    icon: Users,
    title: "Gestión de flotas",
    description:
      "Administra múltiples vehículos, conductores y grupos desde un panel centralizado y colaborativo.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

export function SolutionsGrid() {
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
            Soluciones
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

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {solutions.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/18">
                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {"disclaimer" in item && item.disclaimer && (
                <p className="mt-3 text-[11px] text-muted-foreground/60 italic">
                  {item.disclaimer}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Simon Pay teaser banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.15 }}
          className="mt-10 flex items-center gap-3 rounded-2xl border border-secondary/25 bg-secondary/5 px-5 py-4"
          role="note"
          aria-label="Próximamente Simon Pay"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15">
            <Wallet className="h-5 w-5 text-secondary" aria-hidden="true" />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-secondary">Muy pronto:</span>{" "}
            Integra pagos de peajes, seguros y servicios en una sola billetera.
          </p>
        </motion.div>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:border-primary hover:text-primary"
            asChild
          >
            <Link href="#demo">
              Ver todas las soluciones
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
