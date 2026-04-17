"use client"

import { motion } from "framer-motion"
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

const personasFeatures = [
  { icon: MapPin, label: "Ubicación en tiempo real desde la app" },
  { icon: Bell, label: "Alertas accionables en el momento justo" },
  { icon: FileText, label: "Documentos accesibles con un toque" },
  { icon: BarChart3, label: "Estado de tu vehículo de un vistazo" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Personas phone mockup ────────────────────────────────────────────────────
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

// ─── Section ──────────────────────────────────────────────────────────────────
export function ProductShowcase() {
  const features = personasFeatures
  const title = "Desde tu celular, siempre en control"
  const subtitle = "Una app pensada para el uso diario, sin curvas de aprendizaje."

  return (
    <section className="bg-background py-12 lg:py-16" aria-labelledby="showcase-heading">
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

        {/* ── Top: full-width contextual image ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <figure
            className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-64 w-full sm:h-80"
            role="img"
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

        {/* ── Bottom: features + mockup ─────────────────────────────── */}
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
            <PersonasMockup />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
