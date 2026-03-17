"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Shield, ArrowRight, CheckCircle2, Activity, Building2, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSegment } from "./segment-context"
import { SegmentSwitcher } from "./segment-switcher"
import { SimonPhoneSim } from "./simon-phone-sim"

// Seeded pseudo-random — same value on server and client for the same seed
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// ─── Particle field — ambient floating particles ─────────────────────────────
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: sr(i * 7 + 1) * 3 + 1,
            height: sr(i * 7 + 2) * 3 + 1,
            left: `${sr(i * 7 + 3) * 100}%`,
            top: `${sr(i * 7 + 4) * 100}%`,
            background: i % 3 === 0 ? "#00FFC2" : i % 3 === 1 ? "#19B5FF" : "rgba(255,255,255,0.3)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: sr(i * 7 + 5) * 4 + 3,
            repeat: Infinity,
            delay: sr(i * 7 + 6) * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ─── Cinematic background ─────────────────────────────────────────────────────
function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* Radial gradient spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,255,194,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 30% 60%, rgba(25,181,255,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 30%, rgba(0,255,194,0.03) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle grid perspective */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60%] opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,194,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,194,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 60px",
          transform: "perspective(500px) rotateX(45deg)",
          transformOrigin: "center bottom",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 80%)",
        }}
      />

      {/* Animated light streaks */}
      {[
        { top: "30%", w: 250, dur: 4.5, delay: 0, color: "#00FFC2", h: 1, blur: 4, dir: "l" },
        { top: "35%", w: 400, dur: 6, delay: 1, color: "rgba(255,255,255,0.5)", h: 1.5, blur: 6, dir: "l" },
        { top: "38%", w: 180, dur: 3.5, delay: 2, color: "#19B5FF", h: 1, blur: 3, dir: "l" },
        { top: "42%", w: 320, dur: 5.5, delay: 0.5, color: "#00FFC2", h: 2, blur: 5, dir: "l" },
        { top: "33%", w: 200, dur: 4.8, delay: 1.5, color: "rgba(255,122,92,0.6)", h: 1, blur: 3, dir: "r" },
        { top: "40%", w: 280, dur: 5.8, delay: 2.5, color: "rgba(255,153,102,0.5)", h: 1.5, blur: 4, dir: "r" },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute left-0"
          style={{
            top: s.top,
            width: `${s.w}px`,
            height: `${s.h}px`,
            background: `linear-gradient(90deg, transparent 0%, ${s.color} 50%, transparent 100%)`,
            filter: `blur(${s.blur}px)`,
            animation: `highway-${s.dir} ${s.dur}s linear ${s.delay}s infinite`,
          }}
        />
      ))}

      <ParticleField />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(8,8,8,0.8) 100%)",
        }}
      />
    </div>
  )
}

// ─── Pulse ring ───────────────────────────────────────────────────────────────
function PulseRing({ color = "bg-success" }: { color?: string }) {
  return (
    <div className="relative shrink-0">
      <div className={cn("h-2 w-2 rounded-full", color)} />
      <div className={cn("absolute inset-0 h-2 w-2 rounded-full animate-ping opacity-30", color)} />
    </div>
  )
}

// ─── Floating notification ────────────────────────────────────────────────────
function FloatingNotification({
  delay,
  className,
  children,
}: {
  delay: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 22 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={cn(
        "glass-card rounded-xl px-3 py-2 shadow-lg cursor-default transition-shadow hover:shadow-primary/20",
        className
      )}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}

// ─── PHONE MOCKUP with real app screenshot ───────────────────────────────────
function HeroAppMockup() {
  return (
    <div className="relative h-[480px] lg:h-[560px] w-full flex items-center justify-center" aria-hidden="true">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-80 rounded-full bg-primary/12 blur-[80px]" />
        <div className="absolute h-48 w-48 translate-x-20 rounded-full bg-secondary/8 blur-[60px]" />
      </div>

      {/* ── Live simulation — native React component ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 90, damping: 20 }}
        className="relative z-10"
        style={{
          transform: "perspective(1100px) rotateY(-18deg) rotateX(4deg) rotate(-4deg)",
          filter: "drop-shadow(-16px 24px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(0,255,194,0.10))",
        }}
      >
        {/* 20% smaller overall + 10% narrower in X → scaleX(0.72) scaleY(0.8) */}
        <div style={{ transform: "translateY(110px) scaleX(0.61) scaleY(0.68)", transformOrigin: "top center" }}>
          <SimonPhoneSim />
        </div>
      </motion.div>

      {/* ── Floating notification chips ──────────────────────────────────── */}
      <FloatingNotification
        delay={0.65}
        className="absolute left-0 top-14 flex items-center gap-2 sm:left-[-10px] lg:left-[-20px]"
      >
        <PulseRing />
        <div>
          <p className="text-xs font-semibold text-foreground">GPS activo</p>
          <p className="text-[10px] text-muted-foreground leading-tight">DEF 123 · En ruta</p>
        </div>
      </FloatingNotification>

      <FloatingNotification
        delay={0.85}
        className="absolute right-0 top-20 flex items-center gap-2 sm:right-[-10px] lg:right-[-20px]"
      >
        <Shield className="h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="text-xs font-semibold text-foreground">Protegido</p>
          <p className="text-[10px] text-muted-foreground leading-tight">Geocerca activa</p>
        </div>
      </FloatingNotification>

      <FloatingNotification
        delay={1.05}
        className="absolute bottom-24 left-0 flex items-center gap-2 sm:left-[-10px] lg:left-[-16px]"
      >
        <Activity className="h-4 w-4 shrink-0 text-success" />
        <div>
          <p className="text-xs font-semibold text-foreground">+50K dispositivos</p>
          <p className="text-[10px] text-muted-foreground leading-tight">En toda Colombia</p>
        </div>
      </FloatingNotification>
    </div>
  )
}

// ─── FLEET DASHBOARD MOCKUP (Empresas segment) ────────────────────────────────
const fleetRows = [
  { plate: "BRT-501", driver: "Carlos M.", status: "En ruta",  statusColor: "text-success",  dot: "bg-success",  km: "142 km" },
  { plate: "MKL-234", driver: "Andrea R.", status: "Detenido", statusColor: "text-warning",  dot: "bg-warning",  km: "89 km"  },
  { plate: "YPS-789", driver: "Juan C.",   status: "En base",  statusColor: "text-secondary", dot: "bg-secondary", km: "201 km" },
  { plate: "FTZ-012", driver: "Sofía V.",  status: "En ruta",  statusColor: "text-success",  dot: "bg-success",  km: "67 km"  },
]

function FleetHeroMockup() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(p => (p + 1) % fleetRows.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative h-[480px] lg:h-[560px] w-full flex items-center justify-center" aria-hidden="true">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-80 rounded-full bg-secondary/10 blur-[80px]" />
        <div className="absolute h-48 w-48 translate-x-20 rounded-full bg-primary/8 blur-[60px]" />
      </div>

      {/* Dashboard frame */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 110, damping: 18 }}
        className="relative z-10 w-[360px]"
        style={{ boxShadow: "0 0 0 1px rgba(25,181,255,0.10), 0 40px 80px rgba(0,0,0,0.7)" }}
      >
        {/* Browser chrome */}
        <div className="rounded-t-2xl bg-[#0d1a2a] border border-white/8 border-b-0 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
          </div>
          <div className="flex-1 mx-3 rounded bg-white/6 px-2 py-0.5 text-[9px] text-muted-foreground font-mono truncate">
            app.simonmovilidad.com/fleet
          </div>
        </div>

        {/* Dashboard body */}
        <div className="rounded-b-2xl bg-[#080f1a] border border-white/8 border-t-0 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-secondary" />
              <span className="text-xs font-bold text-foreground">Flota Activa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PulseRing />
              <span className="text-[10px] text-success">En línea</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
            <div className="py-3 text-center">
              <p className="text-base font-bold text-secondary">47</p>
              <p className="text-[9px] text-muted-foreground">Vehículos</p>
            </div>
            <div className="py-3 text-center">
              <p className="text-base font-bold text-success">38</p>
              <p className="text-[9px] text-muted-foreground">Activos</p>
            </div>
            <div className="py-3 text-center">
              <p className="text-base font-bold text-warning">3</p>
              <p className="text-[9px] text-muted-foreground">Alertas</p>
            </div>
          </div>

          {/* Vehicle list */}
          <div className="divide-y divide-white/[0.04]">
            {fleetRows.map((v, i) => (
              <motion.div
                key={v.plate}
                animate={{ backgroundColor: i === activeIdx ? "rgba(25,181,255,0.05)" : "transparent" }}
                className="flex items-center gap-3 px-4 py-2.5"
              >
                <div className={cn("h-1.5 w-1.5 rounded-full shrink-0", v.dot)} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-foreground">{v.plate}</span>
                    <span className={cn("text-[10px]", v.statusColor)}>{v.status}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-muted-foreground truncate">{v.driver}</span>
                    <span className="text-[10px] text-muted-foreground">{v.km}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
            <span className="text-[10px] text-muted-foreground">Actualizado hace 2s</span>
            <span className="text-[10px] text-primary font-medium">Ver todos →</span>
          </div>
        </div>
      </motion.div>

      {/* Floating chips */}
      <FloatingNotification delay={0.65} className="absolute left-0 top-14 flex items-center gap-2 sm:left-[-10px] lg:left-[-20px]">
        <PulseRing />
        <div>
          <p className="text-xs font-semibold text-foreground">Flota sincronizada</p>
          <p className="text-[10px] text-muted-foreground leading-tight">Tiempo real</p>
        </div>
      </FloatingNotification>

      <FloatingNotification delay={0.85} className="absolute right-0 top-20 flex items-center gap-2 sm:right-[-10px] lg:right-[-20px]">
        <BarChart3 className="h-4 w-4 shrink-0 text-secondary" />
        <div>
          <p className="text-xs font-semibold text-foreground">-22% costos</p>
          <p className="text-[10px] text-muted-foreground leading-tight">En combustible</p>
        </div>
      </FloatingNotification>

      <FloatingNotification delay={1.05} className="absolute bottom-24 left-0 flex items-center gap-2 sm:left-[-10px] lg:left-[-16px]">
        <Activity className="h-4 w-4 shrink-0 text-success" />
        <div>
          <p className="text-xs font-semibold text-foreground">+19K vehículos</p>
          <p className="text-[10px] text-muted-foreground leading-tight">En flotas activas</p>
        </div>
      </FloatingNotification>
    </div>
  )
}

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeInUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

// ─── Hero content by segment ──────────────────────────────────────────────────
const heroContent = {
  personas: {
    badge: "Tu vehículo protegido 24/7 en Colombia",
    headline: (
      <>
        Tu vehículo, bajo tu{" "}
        <span className="gradient-text">control total</span>
      </>
    ),
    // R7: mention multi-vehicle
    subtitle:
      "Sabe dónde están tus vehículos en todo momento. Gestiona documentos, activa geocercas y pide asistencia — todo desde la app.",
    microcopy: "Gratuita. Sin tarjeta de crédito.",
  },
  empresas: {
    badge: "Plataforma de gestión de flotas para Colombia",
    headline: (
      <>
        Tu flota, bajo{" "}
        <span className="gradient-text">control total</span>
      </>
    ),
    subtitle:
      "Gestiona toda tu flota desde una sola plataforma. Menos costos, trazabilidad total y reportes en tiempo real.",
    microcopy: "Sin compromiso. Demo gratuita en 24 horas.",
  },
  // R11: Finanzauto segment
  finanzauto: {
    badge: "Simon para compradores Finanzauto",
    headline: (
      <>
        Tu inversión, bajo{" "}
        <span className="gradient-text">control total</span>
      </>
    ),
    subtitle:
      "Monitorea tu vehículo financiado desde el primer día. GPS en tiempo real, alertas y documentos — todo en la app.",
    microcopy: "Ya tienes cuenta. Solo accede.",
  },
}

// ─── Hero Component ───────────────────────────────────────────────────────────
export function Hero() {
  const { segment } = useSegment()
  const content = heroContent[segment]

  const handleDemoScroll = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-24 pb-0 lg:pt-32 lg:pb-0"
      aria-labelledby="hero-heading"
    >
      <CinematicBackground />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: copy ───────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Segment switcher — first interactive element */}
            <motion.div variants={fadeInUp} className="mb-6">
              <SegmentSwitcher />
            </motion.div>

            {/* Eyebrow badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
            >
              <PulseRing />
              {content.badge}
            </motion.span>

            {/* Main headline */}
            <motion.h1
              id="hero-heading"
              variants={fadeInUp}
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] text-balance"
            >
              {content.headline}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              {content.subtitle}
            </motion.p>

            {/* CTA Buttons — conditional by segment */}
            <motion.div variants={fadeInUp} className="mt-9 flex flex-col gap-4 w-full max-w-sm lg:max-w-none">
              {segment === "personas" && (
                <>
                  <div className="flex flex-row flex-wrap items-center gap-3 justify-center lg:justify-start">
                    <GooglePlayButton />
                    <AppStoreButton />
                  </div>
                  <motion.p
                    variants={fadeInUp}
                    className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 lg:justify-start"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    {content.microcopy}
                  </motion.p>
                  {/* R2: Existing users quick access */}
                  <p className="text-xs text-muted-foreground/60 text-center lg:text-left">
                    ¿Ya eres cliente?{" "}
                    <Link
                      href="https://app.simonmovilidad.com/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Acceder a mi cuenta
                    </Link>
                  </p>
                </>
              )}

              {segment === "empresas" && (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary group w-full sm:w-auto"
                      onClick={handleDemoScroll}
                    >
                      Agendar demo gratuita
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary w-full sm:w-auto"
                      asChild
                    >
                      <Link
                        href="https://wa.me/573105511862?text=Hola%2C+quiero+informaci%C3%B3n+sobre+Simon+para+Empresas"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Hablar con un asesor
                      </Link>
                    </Button>
                  </div>
                  <motion.p
                    variants={fadeInUp}
                    className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 lg:justify-start"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    {content.microcopy}
                  </motion.p>
                </>
              )}

              {/* R11: Finanzauto CTA */}
              {segment === "finanzauto" && (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary group w-full sm:w-auto"
                      asChild
                    >
                      <Link
                        href="https://app.simonmovilidad.com/login"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Acceder a mi cuenta
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-row flex-wrap items-center gap-3 justify-center lg:justify-start">
                    <GooglePlayButton />
                    <AppStoreButton />
                  </div>
                  <motion.p
                    variants={fadeInUp}
                    className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 lg:justify-start"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    {content.microcopy}
                  </motion.p>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* ── Right: mockup — phone for personas/finanzauto, dashboard for empresas ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            {segment === "empresas" ? <FleetHeroMockup /> : <HeroAppMockup />}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
