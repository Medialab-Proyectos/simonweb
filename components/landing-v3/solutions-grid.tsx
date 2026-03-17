"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, MapPin, FileText, Headphones, BarChart3, Wallet, ArrowRight, Zap, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSegment } from "./segment-context"

// ─── Solutions segmentadas ────────────────────────────────────────────────────
const solutionsPersonas = [
  {
    icon: Shield,
    title: "Seguridad vehicular",
    description:
      "Protección 24/7 con monitoreo satelital, alertas instantáneas y geocercas inteligentes para mantener tu vehículo siempre seguro.",
    highlight: true,
    color: "text-primary",
    bgIcon: "bg-primary/15",
    borderHover: "hover:border-primary/40 hover:shadow-primary/10",
    badge: null,
    video: "/videos/services/geocercas.mp4",
  },
  {
    icon: MapPin,
    title: "Rastreo satelital 24/7",
    description:
      "Ubicación exacta con actualizaciones al segundo. Accede desde cualquier dispositivo, en cualquier momento.",
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
    badge: null,
    video: "/videos/services/monitoreo.mp4",
  },
  {
    icon: FileText,
    title: "Documentos del vehículo",
    description:
      "SOAT, tecnomecánica, seguros y más en un solo lugar — para uno o varios vehículos de tu familia. Alertas automáticas antes del vencimiento.",
    color: "text-success",
    bgIcon: "bg-success/15",
    borderHover: "hover:border-success/40 hover:shadow-success/10",
    badge: null,
    video: "/videos/services/guantera.mp4",
  },
  {
    icon: Headphones,
    title: "Asistencias de movilidad*",
    description:
      "Llama al #280 desde la app con un toque. Grúa, cerrajería y carro taller disponibles en vía — sin buscar a quién llamar en un momento crítico.",
    disclaimer: "* Sujeto a disponibilidad del prestador de servicio.",
    color: "text-chart-5",
    bgIcon: "bg-chart-5/15",
    borderHover: "hover:border-chart-5/40 hover:shadow-chart-5/10",
    badge: null,
    ctaIcon: Hash,
    ctaLabel: "#280 asistencia vial",
    video: "/videos/services/asistencias.mp4",
  },
  {
    icon: Wallet,
    title: "Simon Pay — Peajes y pagos",
    description:
      "Paga peajes con Colpass, seguros y servicios de movilidad en una sola billetera integrada. Registra tu interés para acceso anticipado.",
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
    badge: "Acceso anticipado",
    video: null,
  },
]

const solutionsEmpresas = [
  {
    icon: BarChart3,
    title: "Control total de flota",
    description:
      "Recorridos, consumos y KPIs operativos. Reportes exportables para reducir costos y tomar decisiones rápidas.",
    color: "text-warning",
    bgIcon: "bg-warning/15",
    borderHover: "hover:border-warning/40 hover:shadow-warning/10",
    badge: null,
    video: "/videos/services/reportes.mp4",
  },
  {
    icon: MapPin,
    title: "Rastreo satelital 24/7",
    description:
      "Visibilidad en tiempo real de toda tu flota. Rutas y alertas centralizadas en un solo panel.",
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
    badge: null,
    video: "/videos/services/monitoreo.mp4",
  },
  {
    icon: Shield,
    title: "Seguridad y geocercas",
    description:
      "Define zonas autorizadas y recibe alertas inmediatas cuando un vehículo sale de ruta o área permitida.",
    color: "text-primary",
    bgIcon: "bg-primary/15",
    borderHover: "hover:border-primary/40 hover:shadow-primary/10",
    badge: null,
    video: "/videos/services/geocercas.mp4",
  },
  {
    icon: FileText,
    title: "Documentos del vehículo",
    description:
      "Centraliza SOAT, revisiones técnicas y seguros de toda la flota. Alertas de vencimiento por vehículo para que nunca se te pase una fecha.",
    color: "text-success",
    bgIcon: "bg-success/15",
    borderHover: "hover:border-success/40 hover:shadow-success/10",
    badge: null,
    video: "/videos/services/guantera.mp4",
  },
  {
    icon: Headphones,
    title: "Asistencias de movilidad*",
    description:
      "Llama al #280 desde la app con un toque para toda tu flota. Soporte prioritario en vía para que ningún vehículo quede varado.",
    disclaimer: "* Sujeto a disponibilidad del prestador de servicio.",
    color: "text-chart-5",
    bgIcon: "bg-chart-5/15",
    borderHover: "hover:border-chart-5/40 hover:shadow-chart-5/10",
    badge: null,
    ctaIcon: Hash,
    ctaLabel: "#280 asistencia vial",
    video: "/videos/services/asistencias.mp4",
  },
  {
    icon: Wallet,
    title: "Simon Pay — Peajes y pagos",
    description:
      "Gestión centralizada de peajes con Colpass, seguros y servicios de movilidad para toda la flota en una sola billetera.",
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
    badge: "Acceso anticipado",
    video: null,
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

// ─── SolutionCard with 3D flip to reveal video ───────────────────────────────
type SolutionItem = (typeof solutionsPersonas)[number]

function SolutionCard({ item }: { item: SolutionItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    if (videoRef.current && item.video) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {/* autoplay blocked */})
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="cursor-default"
      style={{ perspective: 1000 }}
    >
      {/* Flip container */}
      <div
        className={cn(
          "group relative transition-all duration-500",
          "[transform-style:preserve-3d]",
          item.video ? "hover:[transform:rotateY(180deg)]" : ""
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── FRONT ── */}
        <div
          className={cn(
            "glass-card flex flex-col rounded-2xl p-6 transition-shadow",
            item.borderHover,
            "hover:shadow-xl",
            "[backface-visibility:hidden]"
          )}
        >
          {item.badge && (
            <span className={cn(
              "absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-semibold",
              item.badge === "Acceso anticipado"
                ? "bg-primary/15 text-primary"
                : "bg-secondary/15 text-secondary"
            )}>
              {item.badge}
            </span>
          )}

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={cn(
              "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
              item.bgIcon || "bg-primary/8"
            )}
          >
            <item.icon className={cn("h-6 w-6", item.color || "text-primary")} aria-hidden="true" />
          </motion.div>

          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">{item.description}</p>

          {item.disclaimer && (
            <p className="mt-3 text-[11px] text-muted-foreground/55 italic">{item.disclaimer}</p>
          )}

          {"ctaLabel" in item && item.ctaLabel ? (
            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-chart-5">
              {"ctaIcon" in item && item.ctaIcon && <item.ctaIcon className="h-3 w-3" aria-hidden="true" />}
              {item.ctaLabel}
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
              <Zap className="h-3 w-3" aria-hidden="true" />
              {item.badge === "Acceso anticipado" ? "Regístrate para acceso anticipado" : "Incluido en todos los planes"}
            </div>
          )}
        </div>

        {/* ── BACK (video) — only rendered when there's a video ── */}
        {item.video && (
          <div
            className={cn(
              "absolute inset-0 rounded-2xl overflow-hidden border border-border",
              "[backface-visibility:hidden] [transform:rotateY(180deg)]"
            )}
          >
            <video
              ref={videoRef}
              src={item.video}
              muted
              loop
              playsInline
              preload="none"
              className="h-full w-full object-cover"
              aria-hidden="true"
            />
            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function SolutionsGrid() {
  const { segment, setSegment } = useSegment()
  const solutions = segment === "empresas" ? solutionsEmpresas : solutionsPersonas

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
            Todo en un solo lugar
          </motion.span>
          <motion.h2
            id="solutions-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            {segment === "empresas"
              ? "Todo lo que necesita tu flota"
              : "Control total de tu movilidad"}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
          >
            {segment === "empresas"
              ? "Visibilidad, trazabilidad y control operativo — en una sola plataforma."
              : "Seguridad, rastreo, documentos y pagos — todo desde una sola app."}
          </motion.p>
        </motion.div>

        {/* Grid — con transición suave al cambiar segmento */}
        <AnimatePresence mode="wait">
          <motion.div
            key={segment}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className={cn(
                "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
                // Cuando hay 5 tarjetas, centramos la última fila
                solutions.length === 5 && "lg:[&>*:last-child]:col-start-2"
              )}
            >
              {solutions.map((item) => (
                <SolutionCard key={item.title} item={item} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

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
            Ver demo en vivo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
