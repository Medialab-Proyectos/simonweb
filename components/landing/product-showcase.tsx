"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Bell,
  FileText,
  BarChart3,
  Car,
  CheckCircle2,
  ChevronRight,
  User,
  Eye,
  TrendingUp,
  Zap,
} from "lucide-react"
import Image from "next/image"
import { useSegment } from "./segment-context"

const personasFeatures = [
  { icon: MapPin, label: "Ubicación en tiempo real desde la app" },
  { icon: Bell, label: "Alertas accionables en el momento justo" },
  { icon: FileText, label: "Documentos accesibles con un toque" },
  { icon: BarChart3, label: "Estado de tu vehículo de un vistazo" },
]

const empresasFeatures = [
  { icon: Eye, label: "Visibilidad total de la flota en tiempo real" },
  { icon: Bell, label: "Alertas y notificaciones centralizadas" },
  { icon: TrendingUp, label: "KPIs operativos para reducir costos" },
  { icon: Zap, label: "Reportes para tomar decisiones rápidas" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Personas phone mockup ────────────────────────────────────────────────

function PersonasMockup() {
  return (
    <div className="relative mx-auto w-64">
      <div className="rounded-[2.5rem] border-[3px] border-card bg-card p-1.5 shadow-2xl shadow-black/50">
        <div className="overflow-hidden rounded-[2rem] bg-background">
          <div className="flex items-center justify-between bg-surface px-5 py-2.5">
            <span className="text-xs text-muted-foreground">9:41</span>
            <div className="h-2 w-10 rounded-sm bg-muted" />
          </div>
          <div className="p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Hola, Carlos</p>
                <p className="text-sm font-semibold text-foreground">Mi vehículo</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="mb-3 rounded-xl border border-border bg-surface p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/15">
                    <Car className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">ABC-123</p>
                    <p className="text-[10px] text-success">En movimiento</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">65 km/h</span>
              </div>
            </div>
            <div className="relative mb-3 h-28 overflow-hidden rounded-xl bg-surface">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
              <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
                <polyline points="20,80 55,55 95,65 130,38 160,48" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4,2" />
              </svg>
              <div className="absolute top-[45%] left-[58%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-md" />
            </div>
            <div className="space-y-2">
              {[
                { label: "SOAT", status: "Vigente · 45 días", color: "text-success", icon: FileText },
                { label: "Tecnomecánica", status: "Vence en 90 días", color: "text-muted-foreground", icon: FileText },
              ].map((doc) => (
                <div key={doc.label} className="flex items-center justify-between rounded-lg bg-surface px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <doc.icon className="h-3.5 w-3.5 text-primary" />
                    <p className="text-xs font-medium text-foreground">{doc.label}</p>
                  </div>
                  <p className={`text-[10px] ${doc.color}`}>{doc.status}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-around border-t border-border bg-surface px-4 py-2.5">
            <MapPin className="h-5 w-5 text-primary" />
            <Car className="h-5 w-5 text-muted-foreground" />
            <Bell className="h-5 w-5 text-muted-foreground" />
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="absolute -left-20 top-1/4 w-44 rounded-xl border border-warning/30 bg-card p-3 shadow-xl"
      >
        <div className="mb-1 flex items-center gap-1.5">
          <Bell className="h-3.5 w-3.5 text-warning" />
          <span className="text-xs font-medium text-warning">Alerta</span>
        </div>
        <p className="text-xs text-foreground">Salida de geocerca · Zona norte</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55 }}
        className="absolute -right-20 bottom-1/3 w-44 rounded-xl border border-border bg-card p-3 shadow-xl"
      >
        <div className="mb-1 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">SOAT</span>
        </div>
        <p className="text-xs font-semibold text-foreground">Vigente</p>
        <p className="text-[10px] text-success flex items-center gap-1 mt-0.5">
          <CheckCircle2 className="h-3 w-3" />
          Vence en 45 días
        </p>
      </motion.div>
    </div>
  )
}

// ─── Empresas dashboard mockup ────────────────────────────────────────────

function EmpresasMockup() {
  const vehicles = [
    { plate: "ABC-123", driver: "J. García", status: "En ruta", km: "48 km", dot: "bg-success" },
    { plate: "XYZ-789", driver: "M. López", status: "Detenido", km: "12 km", dot: "bg-warning" },
    { plate: "DEF-456", driver: "A. Torres", status: "En base", km: "0 km", dot: "bg-muted-foreground" },
  ]

  return (
    <div className="relative w-full max-w-md">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-black/40">
        <div className="mb-3 flex items-center justify-between rounded-xl bg-surface px-3 py-2">
          <span className="text-sm font-semibold text-foreground">Panel de flota</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">En vivo</span>
          </div>
        </div>
        <div className="mb-3 grid grid-cols-4 gap-2">
          {[
            { value: "24", label: "Total", color: "text-foreground" },
            { value: "18", label: "Activos", color: "text-primary" },
            { value: "3", label: "Alertas", color: "text-warning" },
            { value: "94%", label: "Efic.", color: "text-success" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-lg bg-surface px-2 py-2 text-center">
              <p className={`text-base font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
            </div>
          ))}
        </div>
        <div className="relative mb-3 h-32 overflow-hidden rounded-xl bg-surface">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
          <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
            <polyline points="40,100 80,70 130,85 180,50 240,65 290,40" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4,2" />
            <polyline points="60,110 110,90 160,105 200,75" fill="none" stroke="var(--secondary)" strokeWidth="1.5" strokeDasharray="4,2" />
          </svg>
          {[
            { x: "28%", y: "38%", color: "bg-primary" },
            { x: "58%", y: "55%", color: "bg-secondary" },
            { x: "72%", y: "28%", color: "bg-success" },
          ].map((v, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full ${v.color} flex items-center justify-center shadow-md`}
              style={{ left: v.x, top: v.y }}
            >
              <Car className="h-2.5 w-2.5 text-white" />
            </motion.div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-4 bg-surface px-3 py-2">
            {["Placa", "Conductor", "Estado", "Km"].map((h) => (
              <span key={h} className="text-[10px] font-semibold text-muted-foreground">{h}</span>
            ))}
          </div>
          {vehicles.map((v, i) => (
            <div
              key={v.plate}
              className={`grid grid-cols-4 items-center px-3 py-2.5 ${i !== vehicles.length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="text-xs font-semibold text-foreground">{v.plate}</span>
              <span className="truncate text-[10px] text-muted-foreground">{v.driver}</span>
              <div className="flex items-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${v.dot}`} />
                <span className="text-[10px] text-muted-foreground">{v.status}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{v.km}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="absolute -right-4 -top-5 rounded-xl border border-border bg-card p-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-success" />
          <div>
            <p className="text-xs font-semibold text-foreground">Ahorro este mes</p>
            <p className="text-[10px] text-success">−15% combustible</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────

export function ProductShowcase() {
  const { segment } = useSegment()

  const features = segment === "personas" ? personasFeatures : empresasFeatures
  const title = segment === "personas"
    ? "Desde tu celular, siempre en control"
    : "Tu flota, centralizada y bajo control"
  const subtitle = segment === "personas"
    ? "Una app pensada para el uso diario, sin curvas de aprendizaje."
    : "Un panel operacional que convierte datos en decisiones inteligentes."

  return (
    <section className="py-20 lg:py-28" aria-labelledby="showcase-heading">
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
            El producto
          </motion.span>
          <motion.h2
            id="showcase-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Así se ve Simon en tu día a día
          </motion.h2>
        </motion.div>

        {/* ── Top: full-width contextual image ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={segment + "-banner"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <figure
                className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-64 w-full sm:h-80"
                role="img"
                aria-label={
                  segment === "personas"
                    ? "Uso de la aplicación Simon para monitoreo vehicular"
                    : "Administrador de flota monitoreando vehículos desde la plataforma Simon"
                }
              >
                <Image
                  src="/images/product-showcase-new.png"
                  alt={
                    segment === "personas"
                      ? "Uso de la aplicación Simon para monitoreo vehicular"
                      : "Administrador de flota monitoreando vehículos desde la plataforma Simon"
                  }
                  fill
                  className="object-cover"
                />
              </figure>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom: features + mockup ─────────────────────────── */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: feature list + copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={segment}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-muted-foreground">{subtitle}</p>

                <ul className="mt-7 space-y-4" aria-label="Características del producto">
                  {features.map((feat) => (
                    <li key={feat.label} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <feat.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <span className="text-foreground">{feat.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: product mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="flex justify-center"
            aria-hidden="true"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={segment + "-mockup"}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              >
                {segment === "personas" ? <PersonasMockup /> : <EmpresasMockup />}
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
