"use client"

import { motion } from "framer-motion"
import {
  MapPin,
  Bell,
  FileText,
  BarChart3,
  Car,
  CheckCircle2,
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

// ─── Personas phone mockup — real app screenshot ─────────────────────────────

function PersonasMockup() {
  return (
    <div className="relative mx-auto w-64">
      {/* Phone shell */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-[#080808]"
          style={{
            width: 256,
            boxShadow: "0 0 0 1px rgba(0,255,194,0.08), 0 32px 64px rgba(0,0,0,0.65), 0 0 48px rgba(0,255,194,0.05)",
          }}
        >
          {/* Dynamic island */}
          <div className="absolute top-0 left-1/2 z-20 flex h-7 w-20 -translate-x-1/2 items-end justify-center rounded-b-2xl bg-[#080808] pb-1">
            <div className="h-1 w-8 rounded-full bg-white/10" />
          </div>

          {/* Real app screenshot */}
          <div className="relative" style={{ height: 512 }}>
            <Image
              src="/images/app3.png"
              alt="App Simon — monitoreo vehicular en tiempo real, Bogotá Colombia"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 top-0 h-9 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#080808]/80 to-transparent pointer-events-none" />
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2 bg-[#080808]">
            <div className="h-1 w-20 rounded-full bg-white/15" />
          </div>

          {/* Side buttons */}
          <div className="absolute -right-[3px] top-24 h-10 w-1 rounded-r-sm bg-white/10" />
          <div className="absolute -left-[3px] top-20 h-7 w-1 rounded-l-sm bg-white/10" />
          <div className="absolute -left-[3px] top-30 h-7 w-1 rounded-l-sm bg-white/10" />
        </div>
      </motion.div>

      {/* Floating alert card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="absolute -left-24 top-1/4 w-44 rounded-xl border border-warning/30 bg-card p-3 shadow-xl"
      >
        <div className="mb-1 flex items-center gap-1.5">
          <Bell className="h-3.5 w-3.5 text-warning" />
          <span className="text-xs font-medium text-warning">Alerta</span>
        </div>
        <p className="text-xs text-foreground">Salida de geocerca · Zona norte</p>
      </motion.div>

      {/* Floating SOAT card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55 }}
        className="absolute -right-24 bottom-1/3 w-44 rounded-xl border border-border bg-card p-3 shadow-xl"
      >
        <div className="mb-1 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">SOAT · DEF 123</span>
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

  const features = segment === "empresas" ? empresasFeatures : personasFeatures
  const title = segment === "empresas"
    ? "Tu flota, siempre bajo control"
    : "Desde tu celular, siempre en control"
  const subtitle = segment === "empresas"
    ? "Dashboard centralizado para gestionar cada vehículo en tiempo real."
    : "Una app pensada para el uso diario, sin curvas de aprendizaje."

  return (
    <section className="bg-background py-20 lg:py-28" aria-labelledby="showcase-heading">
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
          <figure
            className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-64 w-full sm:h-80"
            aria-label="Uso de la aplicación Simon para monitoreo vehicular"
          >
            <Image
              src="/images/product-showcase-new.png"
              alt="Uso de la aplicación Simon para monitoreo vehicular"
              fill
              className="object-cover"
            />
          </figure>
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
            <div>
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
            </div>
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
            {segment === "empresas" ? <EmpresasMockup /> : <PersonasMockup />}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
