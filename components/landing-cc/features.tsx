"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Headphones, Shield, FileText, BarChart3, Wallet, Zap } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Ordered by user-priority (primacy effect: most needed feature first)
const features = [
  {
    icon: MapPin,
    title: "Monitoreo 24/7",
    brief: "Localización en tiempo real, las 24 horas del día.",
    detail:
      "Sabe exactamente dónde está tu vehículo y por dónde ha pasado. Actualización segundo a segundo, historial de los últimos 90 días. Accesible desde la app o desde cualquier navegador.",
    color: "text-primary",
    bg: "bg-primary/15",
    borderHover: "hover:border-primary/40",
    highlight: true,
  },
  {
    icon: FileText,
    title: "Documentos del vehículo",
    brief: "SOAT, RTM y seguros — con alertas de vencimiento.",
    detail:
      "Todos tus documentos vehiculares centralizados en un solo lugar, accesibles desde tu celular. Simon te notifica 30 días antes de cada vencimiento. Nunca más una multa por descuido.",
    color: "text-success",
    bg: "bg-success/15",
    borderHover: "hover:border-success/40",
  },
  {
    icon: Shield,
    title: "Geocercas inteligentes",
    brief: "Alertas instantáneas cuando el vehículo entra o sale de una zona.",
    detail:
      "Define zonas seguras en el mapa. Si tu vehículo cruza esos límites, recibes una notificación inmediata. Ideal para controlar rutas, detectar uso no autorizado o saber cuándo llegan a casa.",
    color: "text-secondary",
    bg: "bg-secondary/15",
    borderHover: "hover:border-secondary/40",
  },
  {
    icon: Headphones,
    title: "Asistencias de movilidad*",
    brief: "Grúa, carro taller y servicios de movilidad con un toque.",
    detail:
      "En caso de avería, solicita asistencia directamente desde la app. Grúa, carro taller y servicios de movilidad disponibles. *Sujeto a disponibilidad del prestador de servicio.",
    color: "text-chart-5",
    bg: "bg-chart-5/15",
    borderHover: "hover:border-chart-5/40",
  },
  {
    icon: BarChart3,
    title: "Reportes inteligentes",
    brief: "Velocidad, paradas, consumo y rutas — exportables.",
    detail:
      "Detalle completo de cada recorrido. Velocidad promedio, paradas, consumo estimado. Exporta reportes en PDF o Excel para tomar decisiones informadas o para auditoría.",
    color: "text-warning",
    bg: "bg-warning/15",
    borderHover: "hover:border-warning/40",
  },
  {
    icon: Wallet,
    title: "SimonPay",
    brief: "Próximamente: peajes, seguros y servicios desde Simon.",
    detail:
      "Paga peajes, seguros y servicios vehiculares directamente desde la app Simon. Actualmente en desarrollo — deja tu correo para acceso anticipado.",
    badge: "Próximamente",
    color: "text-secondary",
    bg: "bg-secondary/15",
    borderHover: "hover:border-secondary/40",
  },
]

export function FeaturesCC() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section
      id="cc-features"
      className="bg-[#080808] py-20 lg:py-28"
      aria-labelledby="cc-features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary mb-4">
            Nuestros servicios
          </span>
          <h2 id="cc-features-heading" className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Todo lo que Simon hace por tu vehículo
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Seis herramientas. Una sola plataforma. Ordenadas por lo que más importa a los conductores colombianos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={cn(
                "glass-card relative rounded-2xl p-5 cursor-pointer transition-all",
                f.borderHover,
                f.highlight && "border-primary/20 shadow-sm shadow-primary/8",
                openIdx === i && "border-primary/30"
              )}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              {f.badge && (
                <div className="absolute top-4 right-4 rounded-full bg-secondary/20 border border-secondary/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
                  {f.badge}
                </div>
              )}

              <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-xl", f.bg)}>
                <f.icon className={cn("h-5 w-5", f.color)} aria-hidden="true" />
              </div>

              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.brief}</p>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground border-t border-border/40 pt-3">
                      {f.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={cn("mt-2 flex items-center gap-1 text-[10px] font-medium transition-colors", f.color)}>
                <Zap className="h-3 w-3" aria-hidden="true" />
                {openIdx === i ? "Cerrar" : "Ver en detalle"}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-xs text-muted-foreground italic">
          * Asistencias de movilidad sujetas a disponibilidad del prestador de servicio.
        </p>
      </div>
    </section>
  )
}
