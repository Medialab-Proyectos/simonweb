"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Shield, ArrowRight, Smartphone, Bell, CheckCircle2, Activity, Fuel, Lock, Building2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

// ─── Static particle data (avoids hydration mismatch) ────────────────────────
const PARTICLES = [
  { w: 2.1, h: 2.1, l: "8%",  t: "12%", color: "#00FFC2", dur: 5.2, delay: 0 },
  { w: 1.4, h: 1.4, l: "18%", t: "67%", color: "#19B5FF", dur: 4.1, delay: 1.3 },
  { w: 2.8, h: 2.8, l: "29%", t: "35%", color: "#00FFC2", dur: 6.0, delay: 0.7 },
  { w: 1.2, h: 1.2, l: "41%", t: "80%", color: "rgba(255,255,255,0.3)", dur: 3.8, delay: 2.1 },
  { w: 2.4, h: 2.4, l: "53%", t: "22%", color: "#19B5FF", dur: 5.5, delay: 0.4 },
  { w: 1.7, h: 1.7, l: "62%", t: "55%", color: "#00FFC2", dur: 4.7, delay: 1.8 },
  { w: 2.0, h: 2.0, l: "74%", t: "10%", color: "rgba(255,255,255,0.3)", dur: 6.3, delay: 0.9 },
  { w: 1.5, h: 1.5, l: "83%", t: "74%", color: "#19B5FF", dur: 4.4, delay: 2.5 },
  { w: 2.6, h: 2.6, l: "91%", t: "42%", color: "#00FFC2", dur: 5.8, delay: 1.1 },
  { w: 1.3, h: 1.3, l: "7%",  t: "88%", color: "#19B5FF", dur: 3.5, delay: 3.0 },
  { w: 2.2, h: 2.2, l: "35%", t: "5%",  color: "#00FFC2", dur: 5.0, delay: 0.2 },
  { w: 1.8, h: 1.8, l: "47%", t: "93%", color: "rgba(255,255,255,0.3)", dur: 4.9, delay: 1.6 },
]

// ─── Particle field ───────────────────────────────────────────────────────────
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: p.w, height: p.h, left: p.l, top: p.t, background: p.color }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
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
        { top: "30%", w: 250, dur: 4.5, delay: 0,   color: "#00FFC2",                   h: 1,   blur: 4, dir: "l" },
        { top: "35%", w: 400, dur: 6,   delay: 1,   color: "rgba(255,255,255,0.5)",     h: 1.5, blur: 6, dir: "l" },
        { top: "38%", w: 180, dur: 3.5, delay: 2,   color: "#19B5FF",                   h: 1,   blur: 3, dir: "l" },
        { top: "42%", w: 320, dur: 5.5, delay: 0.5, color: "#00FFC2",                   h: 2,   blur: 5, dir: "l" },
        { top: "33%", w: 200, dur: 4.8, delay: 1.5, color: "rgba(255,122,92,0.6)",      h: 1,   blur: 3, dir: "r" },
        { top: "40%", w: 280, dur: 5.8, delay: 2.5, color: "rgba(255,153,102,0.5)",     h: 1.5, blur: 4, dir: "r" },
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
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(8,8,8,0.8) 100%)" }}
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

// ─── Live app data ────────────────────────────────────────────────────────────
const vehiclePlates = ["ABC-123", "XYZ-789", "JKL-456", "MNO-321", "DEF-654"]
const vehicleStatuses = [
  { status: "En ruta",   color: "text-success",          bgColor: "bg-success/15" },
  { status: "Detenido",  color: "text-warning",           bgColor: "bg-warning/15" },
  { status: "En base",   color: "text-secondary",         bgColor: "bg-secondary/15" },
  { status: "En ruta",   color: "text-success",           bgColor: "bg-success/15" },
]
const alertMessages = [
  { text: "Geocerca activa",   color: "text-warning",           icon: "🔶" },
  { text: "Zona segura",       color: "text-success",           icon: "✅" },
  { text: "Motor apagado",     color: "text-muted-foreground",  icon: "🔴" },
  { text: "Exceso velocidad",  color: "text-destructive",       icon: "⚠️" },
]
const mapWaypoints = [
  { x: 30, y: 35 }, { x: 52, y: 28 }, { x: 68, y: 40 },
  { x: 60, y: 58 }, { x: 40, y: 65 }, { x: 25, y: 50 },
]

// ─── Animated phone mockup ────────────────────────────────────────────────────
function HeroAppMockup() {
  const [plateIdx, setPlateIdx] = useState(0)
  const [alertIdx, setAlertIdx] = useState(0)
  const [km, setKm] = useState(142)
  const [speed, setSpeed] = useState(57)
  const [fuelPct, setFuelPct] = useState(73)
  const [waypointIdx, setWaypointIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPlateIdx(p => (p + 1) % vehiclePlates.length), 3500)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setAlertIdx(p => (p + 1) % alertMessages.length), 4200)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setKm(p => p + Math.floor(Math.random() * 3) + 1), 3000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(
      () => setSpeed(p => Math.max(10, Math.min(120, p + Math.floor(Math.random() * 21) - 10))),
      2500
    )
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setFuelPct(p => Math.max(20, p - Math.floor(Math.random() * 2))), 8000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setWaypointIdx(p => (p + 1) % mapWaypoints.length), 2800)
    return () => clearInterval(t)
  }, [])

  const alert = alertMessages[alertIdx]
  const vStatus = vehicleStatuses[plateIdx % vehicleStatuses.length]
  const dot = mapWaypoints[waypointIdx]

  return (
    <div className="relative h-[480px] lg:h-[560px] w-full flex items-center justify-center" aria-hidden="true">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-80 rounded-full bg-primary/12 blur-[80px]" />
        <div className="absolute h-48 w-48 translate-x-20 rounded-full bg-secondary/8 blur-[60px]" />
      </div>

      {/* ── Phone frame ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 110, damping: 18 }}
        className="relative z-10"
      >
        {/* Outer shell */}
        <div
          className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-[#080808]"
          style={{
            width: 268,
            boxShadow:
              "0 0 0 1px rgba(0,255,194,0.08), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(0,255,194,0.06)",
          }}
        >
          {/* Dynamic-island notch */}
          <div className="absolute top-0 left-1/2 z-20 flex h-8 w-24 -translate-x-1/2 items-end justify-center rounded-b-2xl bg-[#080808] pb-1.5">
            <div className="h-1.5 w-10 rounded-full bg-white/10" />
          </div>

          {/* Screen */}
          <div className="flex flex-col" style={{ height: 462, paddingTop: 36 }}>

            {/* Top bar */}
            <div className="flex items-center justify-between px-4 pt-1 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                  <Lock className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-foreground tracking-wide">Simon</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PulseRing />
                <span className="text-[10px] text-success font-medium">En línea</span>
              </div>
            </div>

            {/* Map area */}
            <div className="relative mx-3 mb-3 flex-1 overflow-hidden rounded-2xl border border-white/6 bg-[#0b1522]">
              {/* Grid */}
              <div
                className="absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,255,194,0.55) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,194,0.35) 1px, transparent 1px)
                  `,
                  backgroundSize: "22px 22px",
                }}
              />
              {/* Faint road lines */}
              <div className="absolute inset-0 opacity-[0.06]">
                <div className="absolute top-1/3  left-0 right-0 h-px bg-white" />
                <div className="absolute top-2/3  left-0 right-0 h-px bg-white" />
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white" />
              </div>

              {/* Glow follows vehicle dot */}
              <motion.div
                animate={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-2xl pointer-events-none"
              />

              {/* Route trail */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ opacity: 0.35 }}>
                <motion.line
                  animate={{
                    x1: `${mapWaypoints[(waypointIdx - 1 + mapWaypoints.length) % mapWaypoints.length].x}%`,
                    y1: `${mapWaypoints[(waypointIdx - 1 + mapWaypoints.length) % mapWaypoints.length].y}%`,
                    x2: `${dot.x}%`,
                    y2: `${dot.y}%`,
                  }}
                  transition={{ duration: 2.4, ease: "easeInOut" }}
                  stroke="#00FFC2"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              </svg>

              {/* Vehicle dot */}
              <motion.div
                animate={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <div className="h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,255,194,0.9)]" />
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-35" />
                </div>
              </motion.div>

              {/* Speed chip */}
              <div className="absolute bottom-2 left-2 rounded-lg bg-black/65 px-2 py-1 backdrop-blur-sm">
                <motion.span
                  key={speed}
                  initial={{ opacity: 0.5, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("text-[11px] font-bold tabular-nums", speed > 80 ? "text-warning" : "text-primary")}
                >
                  {speed} <span className="text-[9px] font-normal opacity-70">km/h</span>
                </motion.span>
              </div>

              {/* Plate chip */}
              <div className="absolute top-2 right-2 rounded-lg bg-black/65 px-2 py-1 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={plateIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] font-mono font-semibold text-foreground"
                  >
                    {vehiclePlates[plateIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-1.5 px-3 mb-3">
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/4 px-1 py-2.5">
                <motion.p
                  key={km}
                  initial={{ opacity: 0.5, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-bold text-secondary tabular-nums"
                >
                  {km}
                </motion.p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">km hoy</p>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/4 px-1 py-2.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={alertIdx}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.28 }}
                    className="text-sm"
                  >
                    {alert.icon}
                  </motion.p>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`at-${alertIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn("mt-0.5 text-[9px] truncate max-w-full px-1", alert.color)}
                  >
                    {alert.text}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/4 px-1 py-2.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={plateIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn("text-sm font-bold leading-none", vStatus.color)}
                  >
                    {vStatus.status.split(" ")[0]}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-0.5 text-[9px] text-muted-foreground">Estado</p>
              </div>
            </div>

            {/* Fuel bar */}
            <div className="flex items-center gap-2 px-3 pb-4">
              <Fuel className="h-3 w-3 shrink-0 text-muted-foreground" />
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  animate={{ width: `${fuelPct}%` }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className={cn(
                    "h-full rounded-full",
                    fuelPct > 50
                      ? "bg-gradient-to-r from-success to-success/60"
                      : fuelPct > 25
                      ? "bg-warning"
                      : "bg-destructive"
                  )}
                />
              </div>
              <motion.span
                key={fuelPct}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="tabular-nums text-[10px] text-muted-foreground"
              >
                {fuelPct}%
              </motion.span>
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-3">
            <div className="h-1 w-24 rounded-full bg-white/15" />
          </div>
        </div>

        {/* Physical side buttons */}
        <div className="absolute -right-[3px] top-28 h-12 w-1 rounded-r-sm bg-white/10" />
        <div className="absolute -left-[3px] top-24 h-8 w-1 rounded-l-sm bg-white/10" />
        <div className="absolute -left-[3px] top-36 h-8 w-1 rounded-l-sm bg-white/10" />
      </motion.div>

      {/* ── Floating notification chips ────────────────────────────────── */}
      <FloatingNotification
        delay={0.65}
        className="absolute left-0 top-14 flex items-center gap-2 sm:left-[-10px] lg:left-[-20px]"
      >
        <PulseRing />
        <div>
          <p className="text-xs font-semibold text-foreground">GPS activo</p>
          <p className="text-[10px] text-muted-foreground leading-tight">Actualización en vivo</p>
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

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeInUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger  = { visible: { transition: { staggerChildren: 0.1 } } }

// ─── Hero Component ───────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden pt-24 pb-0 lg:pt-32 lg:pb-0"
      aria-labelledby="hero-heading"
    >
      <CinematicBackground />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: copy ─────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Eyebrow badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary"
            >
              <PulseRing />
              Plataforma de movilidad inteligente
            </motion.span>

            {/* Main headline */}
            <motion.h1
              id="hero-heading"
              variants={fadeInUp}
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] text-balance"
            >
              Tu vehículo, bajo tu{" "}
              <span className="gradient-text">control total</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              La tecnología de rastreo más intuitiva en tus manos. Localiza, protege y gestiona desde tu celular.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="mt-9 flex flex-col gap-4 w-full max-w-sm lg:max-w-none">
              {/* Primary: Download App */}
              <div className="flex flex-row flex-wrap items-center gap-3 justify-center lg:justify-start">
                <GooglePlayButton />
                <AppStoreButton />
              </div>

              {/* Secondary: B2B */}
              <div className="flex items-center justify-center lg:justify-start">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary group"
                  asChild
                >
                  <Link href="#empresas-section">
                    <Building2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    Simon para Empresas
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              {/* Microcopy */}
              <motion.p
                variants={fadeInUp}
                className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 lg:justify-start"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Descarga inmediata. Sin configuraciones complejas.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* ── Right: animated phone mockup ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <HeroAppMockup />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
