"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, MapPin, FileText, Headphones, BarChart3, Wallet, ArrowRight, Zap, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSegment } from "./segment-context"
import { useDemoModal } from "./demo-modal-context"

// ─── Solutions segmentadas ────────────────────────────────────────────────────
const solutionsPersonas = [
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
]

const solutionsEmpresas = solutionsPersonas

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

// ─── SolutionCard with 3D flip to reveal video ───────────────────────────────
type SolutionItem = (typeof solutionsPersonas)[number]

function SolutionCard({ item }: { item: SolutionItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [flipped, setFlipped] = useState(false)

  const handleMouseEnter = () => {
    if (!item.video) return
    setFlipped(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {/* autoplay blocked */})
    }
  }

  const handleMouseLeave = () => {
    if (!item.video) return
    setFlipped(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="cursor-default h-full"
      style={{ perspective: 1000 }}
    >
      {/* Flip container */}
      <div
        className="relative h-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── FRONT ── */}
        <div
          className={cn(
            "glass-card flex h-full flex-col rounded-2xl p-6 transition-shadow",
            item.borderHover,
            "[backface-visibility:hidden]"
          )}
        >
          {item.badge && (
            <span className={cn(
              "absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-semibold",
              item.badge === "Acceso anticipado"
                ? "bg-primary/15 text-primary"
                : item.badge.startsWith("Resuelve")
                ? "bg-warning/15 text-warning"
                : "bg-secondary/15 text-secondary"
            )}>
              {item.badge}
            </span>
          )}

          <div
            className={cn(
              "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
              item.bgIcon || "bg-primary/8"
            )}
          >
            <item.icon className={cn("h-6 w-6", item.color || "text-primary")} aria-hidden="true" />
          </div>

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
              Ver más detalles
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
              className="h-full w-full object-contain"
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
  const { open: openDemoModal } = useDemoModal()
  const solutions = segment === "empresas" ? solutionsEmpresas : solutionsPersonas

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
            Nuestros servicios
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            En Simon Movilidad, integramos en un solo sistema las soluciones claves que necesitas para gestionar tu movilidad de forma simple, segura y eficiente. Desde el rastreo satelital 24/7, asistencias de movilidad*, geocercas inteligentes, guantera digital y más beneficios exclusivos para ti*
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-3 max-w-2xl text-xs italic text-muted-foreground/60"
          >
            *Sujeto a disponibilidad del prestador de servicio.
          </motion.p>
        </motion.div>

        {/* Tabs Personas / Empresas */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-8 flex justify-center"
        >
          <div
            className="flex gap-2 rounded-2xl border border-border bg-card/60 p-1.5"
            role="group"
            aria-label="Selecciona tu perfil"
          >
            {(["personas", "empresas"] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setSegment(seg)}
                className={cn(
                  "rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 capitalize",
                  segment === seg
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={segment === seg}
              >
                {seg.charAt(0).toUpperCase() + seg.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid — con transición suave al cambiar segmento */}
        <AnimatePresence mode="wait">
          <motion.div
            key={segment}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            variants={stagger}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
          >
            {solutions.map((item) => (
              <SolutionCard key={item.title} item={item} />
            ))}
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

        {/* CTA — solo visible en tab Empresas */}
        {segment === "empresas" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10 flex justify-center"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary group"
              onClick={openDemoModal}
            >
              Agendar demo gratuita
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </motion.div>
        )}

      </div>
    </section>
  )
}
