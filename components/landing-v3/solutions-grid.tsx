"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, MapPin, FileText, Headphones, BarChart3, Zap, ShieldCheck, FileCheck, Play, X } from "lucide-react"
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
    badge: "Próximamente",
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
    badge: "Próximamente",
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

// ─── Video modal (backdrop blur + video centrado) ────────────────────────────
function VideoModal({
  item,
  onClose,
}: {
  item: SolutionItem
  onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-label={`Video: ${item.title}`}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-xs rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Cerrar video"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Video */}
        <div className="aspect-[9/16] w-full bg-black">
          <video
            ref={videoRef}
            src={item.video!}
            muted
            loop
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-card border-t border-border">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              item.bgIcon
            )}
          >
            <item.icon className={cn("h-5 w-5", item.color)} aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold text-foreground">{item.title}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── SolutionCard ────────────────────────────────────────────────────────────
function SolutionCard({
  item,
  onPlay,
}: {
  item: SolutionItem
  onPlay: (item: SolutionItem) => void
}) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "glass-card group relative flex h-full flex-col rounded-2xl p-6 transition-shadow",
        item.borderHover,
        item.video && "cursor-pointer"
      )}
      onClick={() => item.video && onPlay(item)}
    >
      {item.badge && (
        <span className={cn(
          "absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-semibold",
          "bg-secondary/15 text-secondary"
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

      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
        <Zap className="h-3 w-3" aria-hidden="true" />
        Ver más detalles
      </div>
    </motion.div>
  )
}

export function SolutionsGrid() {
  const [activeVideo, setActiveVideo] = useState<SolutionItem | null>(null)
  const closeModal = useCallback(() => setActiveVideo(null), [])

  return (
    <>
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

          {/* Grid — presentación unificada */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr"
          >
            {solutions.map((item) => (
              <SolutionCard key={item.title} item={item} onPlay={setActiveVideo} />
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

      {/* Video modal — backdrop blur + video centrado */}
      <AnimatePresence>
        {activeVideo && activeVideo.video && (
          <VideoModal item={activeVideo} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  )
}
