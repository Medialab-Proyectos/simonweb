"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Shield, ArrowRight, CheckCircle2, Activity, Fuel, Lock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GooglePlayButton, AppStoreButton } from "@/components/landing/store-buttons"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSegment } from "@/components/landing/segment-context"
import { SegmentSwitcher } from "@/components/landing/segment-switcher"

// ─── Pulse ring ───────────────────────────────────────────────────────────────
function PulseRing({ color = "bg-success" }: { color?: string }) {
  return (
    <div className="relative shrink-0">
      <div className={cn("h-2 w-2 rounded-full", color)} />
      <div className={cn("absolute inset-0 h-2 w-2 rounded-full animate-ping opacity-30", color)} />
    </div>
  )
}

// ─── Cinematic background ─────────────────────────────────────────────────────
function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#080808]" />
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
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(8,8,8,0.8) 100%)",
        }}
      />
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
    subtitle:
      "Sabe dónde está tu vehículo ahora mismo. Gestiona documentos, activa alertas y pide asistencia — todo desde la app.",
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
}

// ─── HeroV2 ───────────────────────────────────────────────────────────────────
export function HeroV2() {
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
        <div className="flex flex-col items-center text-center gap-12 lg:gap-16">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center"
          >
            {/* Segment switcher */}
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
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] text-balance max-w-3xl"
            >
              {content.headline}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              {content.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="mt-9 flex flex-col items-center gap-4">
              {segment === "personas" ? (
                <>
                  <div className="flex flex-row flex-wrap items-center gap-3 justify-center">
                    <GooglePlayButton />
                    <AppStoreButton />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    {content.microcopy}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary group"
                      onClick={handleDemoScroll}
                    >
                      Agendar demo gratuita
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary"
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
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    {content.microcopy}
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
