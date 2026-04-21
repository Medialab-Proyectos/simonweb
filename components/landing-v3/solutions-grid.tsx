"use client"

import { motion } from "framer-motion"
import { Shield, MapPin, FileText, Headphones, BarChart3, ShieldCheck, FileCheck } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Servicios (presentación unificada — sin split personas/empresas) ─────────
const solutions = [
  {
    icon: MapPin,
    title: "Monitoreo en tiempo real 24/7",
    description:
      "Localiza tu vehículo estés donde estés, desde cualquier dispositivo con acceso a internet.",
    color: "text-primary",
    bgIcon: "bg-primary/15",
    borderHover: "hover:border-primary/40 hover:shadow-primary/10",
    badge: null,
    video: "/videos/services/monitoreo.mp4",
  },
  {
    icon: Headphones,
    title: "Asistencias",
    description:
      "Soporte inmediato ante averías o contratiempos en la vía. Incluye servicio de grúa, carro taller, teleorientación mecánica y legal, cobertura para accesorios y protección de contenidos.",
    color: "text-chart-5",
    bgIcon: "bg-chart-5/15",
    borderHover: "hover:border-chart-5/40 hover:shadow-chart-5/10",
    badge: null,
    video: "/videos/services/asistencias.mp4",
  },
  {
    icon: Shield,
    title: "Geocercas inteligentes",
    description:
      "Ubicación de zonas seguras, alertas si tu vehículo entra o sale de ellas. Máxima protección antirrobo desde tu móvil.",
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
    badge: null,
    video: "/videos/services/geocercas.mp4",
  },
  {
    icon: FileText,
    title: "Guantera digital",
    description:
      "Gestiona y centraliza de forma segura tus documentos y mantenimientos clave, tales como SOAT, RTM licencia de tránsito, póliza de seguro con acceso instantáneo desde la app.",
    color: "text-success",
    bgIcon: "bg-success/15",
    borderHover: "hover:border-success/40 hover:shadow-success/10",
    badge: null,
    video: "/videos/services/guantera.mp4",
  },
  {
    icon: BarChart3,
    title: "Reportes inteligentes",
    description:
      "Genera reportes de recorrido. Conoce en detalle las direcciones y desplazamientos de tus viajes.",
    color: "text-warning",
    bgIcon: "bg-warning/15",
    borderHover: "hover:border-warning/40 hover:shadow-warning/10",
    badge: null,
    video: "/videos/services/reportes.mp4",
  },
  {
    // TODO: Copy final pendiente — equipo de marketing
    icon: ShieldCheck,
    title: "Seguros vehiculares",
    description:
      "Cotiza, compara y adquiere seguros para tu vehículo directamente desde la app. Protección real, sin intermediarios y en minutos.",
    color: "text-chart-4",
    bgIcon: "bg-chart-4/15",
    borderHover: "hover:border-chart-4/40 hover:shadow-chart-4/10",
    badge: null,
    video: null,
  },
  {
    // TODO: Copy final pendiente — equipo de marketing
    icon: FileCheck,
    title: "SOAT digital",
    description:
      "Compra y renueva tu SOAT desde Simon sin filas ni trámites. Recibe tu póliza digital al instante y mantén tu vehículo siempre al día.",
    color: "text-chart-3",
    bgIcon: "bg-chart-3/15",
    borderHover: "hover:border-chart-3/40 hover:shadow-chart-3/10",
    badge: null,
    video: null,
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

// ─── Types ───────────────────────────────────────────────────────────────────
type SolutionItem = (typeof solutions)[number]

// ─── SolutionCard ────────────────────────────────────────────────────────────
function SolutionCard({ item }: { item: SolutionItem }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "glass-card group relative flex h-full flex-col rounded-2xl p-6 transition-all cursor-default",
        item.borderHover,
        "hover:shadow-xl"
      )}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

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

      <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground/90 transition-colors">{item.title}</h3>
      <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground z-10 relative">{item.description}</p>
    </motion.div>
  )
}

export function SolutionsGrid() {
  return (
    <section
      id="soluciones-grid"
      className="bg-surface py-12 lg:py-16"
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
          <motion.h2
            id="solutions-heading"
            variants={fadeInUp}
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Todo lo que necesitas para tener el control de{" "}
            <span className="gradient-text">tu vehículo</span>.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            Gestiona, protege y optimiza tu vehículo desde un solo lugar. Descubre cómo cada solución trabaja para ti:
          </motion.p>
        </motion.div>

        {/* Grid — presentación unificada */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr"
        >
          {solutions.map((item) => (
            <SolutionCard key={item.title} item={item} />
          ))}
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

      </div>
    </section>
  )
}
