"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Headphones, MapPin, FileText, BarChart3, Wallet, ArrowRight, Zap, Eye, Download, CheckCircle2, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSegment } from "./segment-context"

// ─── 6 service cards ───────────────────────────────────────────────────────────
const solutions = [
  {
    icon: Eye,
    title: "Monitoreo 24/7",
    description:
      "Localización en tiempo real de tu vehículo. Sabe exactamente dónde está y por dónde ha pasado, las 24 horas del día, los 7 días de la semana.",
    color: "text-primary",
    bgIcon: "bg-primary/15",
    borderHover: "hover:border-primary/40 hover:shadow-primary/10",
    highlight: true,
    video: "/videos/services/monitoreo.mp4",
  },
  {
    icon: Headphones,
    title: "Asistencias de movilidad*",
    description:
      "Grúa, carro taller y cerrajería con un toque desde la app. Rastreo activo 24/7. Las asistencias físicas están sujetas a disponibilidad del prestador.",
    color: "text-chart-5",
    bgIcon: "bg-chart-5/15",
    borderHover: "hover:border-chart-5/40 hover:shadow-chart-5/10",
    video: "/videos/services/asistencias.mp4",
    emergency: "#230 · #280",
  },
  {
    icon: MapPin,
    title: "Geocercas inteligentes",
    description:
      "Define zonas seguras en el mapa y recibe alertas instantáneas cuando tu vehículo entre o salga. Control total sin esfuerzo.",
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
    video: "/videos/services/geocercas.mp4",
  },
  {
    icon: FileText,
    title: "Documentos del vehículo",
    description:
      "SOAT, RTM y todos tus documentos vehiculares centralizados en un solo lugar. Alertas automáticas antes de los vencimientos.",
    color: "text-success",
    bgIcon: "bg-success/15",
    borderHover: "hover:border-success/40 hover:shadow-success/10",
    video: "/videos/services/guantera.mp4",
  },
  {
    icon: BarChart3,
    title: "Reportes inteligentes",
    description:
      "Detalle completo de desplazamientos, velocidad, paradas y consumos. Exporta reportes para tomar decisiones informadas.",
    color: "text-warning",
    bgIcon: "bg-warning/15",
    borderHover: "hover:border-warning/40 hover:shadow-warning/10",
    video: "/videos/services/reportes.mp4",
  },
  {
    icon: Wallet,
    title: "SimonPay",
    description:
      "Paga peajes (Colpass), seguros y servicios vehiculares directamente desde la app. Sin efectivo ni múltiples apps.",
    badge: "Próximamente",
    waitlist: true,
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

export function SolutionsGrid() {
  const { segment } = useSegment()
  // R5: Simon Pay waitlist state
  const [payEmail, setPayEmail] = useState("")
  const [paySubmitted, setPaySubmitted] = useState(false)

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (payEmail.trim()) setPaySubmitted(true)
  }

  const handleCTA = () => {
    if (segment === "empresas") {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
    } else {
      window.open("https://play.google.com/store/apps/details?id=com.simonmovilidad", "_blank", "noopener,noreferrer")
    }
  }

  return (
    <section
      id="soluciones-grid"
      className="relative bg-[#080808] py-20 lg:py-28 overflow-hidden"
      aria-labelledby="solutions-heading"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-20 h-[400px] w-[400px] bg-primary/4 blur-[120px] rounded-full" aria-hidden="true" />

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
            Seis herramientas. Un solo lugar.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
          >
            Una sola plataforma para ver, actuar y decidir. Descubre cada herramienta.
          </motion.p>
        </motion.div>

        {/* Grid — 6 cards */}
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
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "glass-card group relative flex flex-col rounded-2xl p-6 transition-all cursor-default",
                `${item.borderHover} hover:shadow-xl`,
                item.highlight && "border-primary/20 shadow-sm shadow-primary/8"
              )}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              {/* Badge (Próximamente) */}
              {item.badge && (
                <div className="absolute top-4 right-4 rounded-full bg-secondary/20 border border-secondary/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary">
                  {item.badge}
                </div>
              )}

              {/* Service demo video */}
              {item.video && (
                <div className="mb-4 overflow-hidden rounded-xl relative h-[110px] w-full bg-background/60">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/70 pointer-events-none" />
                </div>
              )}

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

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {/* R4: Emergency numbers for Asistencias */}
              {item.emergency && (
                <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-chart-5/20 bg-chart-5/8 px-3 py-2">
                  <Hash className="h-3.5 w-3.5 shrink-0 text-chart-5" aria-hidden="true" />
                  <span className="text-xs font-semibold text-chart-5 font-mono">{item.emergency}</span>
                  <span className="text-xs text-muted-foreground">— emergencias 24/7</span>
                </div>
              )}

              {/* R5: Simon Pay waitlist */}
              {item.waitlist && (
                <div className="mt-3">
                  {!paySubmitted ? (
                    <form onSubmit={handlePaySubmit} className="flex gap-2" aria-label="Notificarme sobre Simon Pay">
                      <input
                        type="email"
                        value={payEmail}
                        onChange={(e) => setPayEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-secondary/50 transition-colors"
                        aria-label="Correo electrónico para Simon Pay"
                      />
                      <button
                        type="submit"
                        disabled={!payEmail.trim()}
                        className="shrink-0 rounded-lg border border-secondary/30 bg-secondary/15 px-3 py-2 text-xs font-semibold text-secondary hover:bg-secondary/25 disabled:opacity-40 transition-colors"
                      >
                        Avísame
                      </button>
                    </form>
                  ) : (
                    <p className="flex items-center gap-1.5 text-xs text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ¡Listo! Te avisamos cuando esté disponible.
                    </p>
                  )}
                </div>
              )}

              {/* Spacer to push "Incluido" to bottom */}
              <div className="flex-grow" />

              {/* Hover reveal: "Incluido" link */}
              {!item.badge && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 0 }}
                  className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Incluido en tu plan
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Section disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-xs text-muted-foreground italic"
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
            onClick={handleCTA}
          >
            {segment === "empresas" ? (
              <>
                Solicitar demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Descargar Simon gratis
              </>
            )}
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
