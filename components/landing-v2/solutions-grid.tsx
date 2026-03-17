"use client"

import { motion } from "framer-motion"
import { Shield, Headphones, MapPin, FileText, BarChart3, Wallet, ArrowRight, Zap, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSegment } from "@/components/landing/segment-context"

const solutions = [
  {
    icon: MapPin,
    title: "Monitoreo 24/7",
    description:
      "Localización en tiempo real de tu vehículo. Sabe exactamente dónde está y por dónde ha pasado, las 24 horas del día.",
    painTag: "ubicación",
    painHref: "#dolores",
    color: "text-primary",
    bgIcon: "bg-primary/15",
    borderHover: "hover:border-primary/40 hover:shadow-primary/10",
    highlight: true,
  },
  {
    icon: Headphones,
    title: "Asistencias de movilidad*",
    description:
      "Soporte ante averías con grúa, carro taller y servicios de movilidad con un solo toque desde la app Simon.",
    color: "text-chart-5",
    bgIcon: "bg-chart-5/15",
    borderHover: "hover:border-chart-5/40 hover:shadow-chart-5/10",
  },
  {
    icon: Shield,
    title: "Geocercas inteligentes",
    description:
      "Define zonas seguras en el mapa y recibe alertas instantáneas cuando tu vehículo entre o salga.",
    painTag: "ubicación",
    painHref: "#dolores",
    color: "text-secondary",
    bgIcon: "bg-secondary/15",
    borderHover: "hover:border-secondary/40 hover:shadow-secondary/10",
  },
  {
    icon: FileText,
    title: "Documentos del vehículo",
    description:
      "SOAT, RTM y todos tus documentos centralizados. Alertas automáticas antes de los vencimientos, nunca una multa por descuido.",
    painTag: "documentos",
    painHref: "#dolores",
    color: "text-success",
    bgIcon: "bg-success/15",
    borderHover: "hover:border-success/40 hover:shadow-success/10",
  },
  {
    icon: BarChart3,
    title: "Reportes inteligentes",
    description:
      "Detalle completo de desplazamientos, velocidad, paradas y consumos. Exporta reportes y toma decisiones informadas.",
    painTag: "costos de flota",
    painHref: "#dolores",
    color: "text-warning",
    bgIcon: "bg-warning/15",
    borderHover: "hover:border-warning/40 hover:shadow-warning/10",
  },
  {
    icon: Wallet,
    title: "SimonPay",
    description:
      "Próximamente: paga peajes, seguros y servicios vehiculares directamente desde Simon. Déjanos tu correo para acceso anticipado.",
    badge: "Próximamente",
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

export function SolutionsGridV2() {
  const { segment } = useSegment()

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
      aria-labelledby="solutions-v2-heading"
    >
      <div className="pointer-events-none absolute right-0 top-20 h-[400px] w-[400px] bg-primary/4 blur-[120px] rounded-full" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            id="solutions-v2-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Seis herramientas. Un solo lugar.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
          >
            Cada herramienta está diseñada para resolver un problema real que enfrentas hoy.
          </motion.p>
        </motion.div>

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
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              {item.badge && (
                <div className="absolute top-4 right-4 rounded-full bg-secondary/20 border border-secondary/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary">
                  {item.badge}
                </div>
              )}

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

              {/* Pain micro-tag — connects card to problem section */}
              {item.painTag && (
                <a
                  href={item.painHref}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                >
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Resuelve: {item.painTag}
                </a>
              )}

              {!item.badge && !item.painTag && (
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Incluido en tu plan
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-xs text-muted-foreground italic"
        >
          * Sujeto a disponibilidad del prestador de servicio.
        </motion.p>

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
