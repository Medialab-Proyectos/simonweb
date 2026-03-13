"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Clock,
  Bell,
  FileText,
  Headphones,
  ArrowRight,
  MessageCircle,
  BarChart3,
  Shield,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SegmentSwitcher } from "./segment-switcher"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import Image from "next/image"
import { useSegment } from "./segment-context"
import Link from "next/link"

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const trustChips = [
  { icon: Clock, label: "Monitoreo 24/7" },
  { icon: Bell, label: "Alertas inteligentes" },
  { icon: FileText, label: "Guantera digital" },
  { icon: Headphones, label: "Soporte continuo" },
]

const segmentContent = {
  personas: {
    subheadline:
      "Monitorea, protege y gestiona tu vehículo desde una experiencia simple, confiable e inteligente.",
    microcopy: "Descarga inmediata desde tu tienda favorita.",
  },
  empresas: {
    subheadline:
      "Optimiza tu operación con visibilidad total de tu flota, alertas inteligentes y decisiones basadas en datos.",
    microcopy: "Respuesta comercial en menos de 1 hora hábil.",
  },
}

export function Hero() {
  const { segment } = useSegment()
  const content = segmentContent[segment]

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/4 right-0 h-[28rem] w-[28rem] rounded-full bg-primary/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-[28rem] w-[28rem] rounded-full bg-secondary/8 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: copy ─────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Segment switcher */}
            <motion.div variants={fadeInUp} className="mb-8">
              <SegmentSwitcher />
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              variants={fadeInUp}
              className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
            >
              Control total de tu movilidad,{" "}
              <span className="gradient-text">en tiempo real</span>
            </motion.h1>

            {/* Sub-headline — dynamic */}
            <div className="mt-5 h-[3.5rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={segment}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty"
                >
                  {content.subheadline}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Trust chips */}
            <motion.div
              variants={fadeInUp}
              className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
              aria-label="Características principales"
            >
              {trustChips.map((chip) => (
                <div
                  key={chip.label}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <chip.icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {chip.label}
                </div>
              ))}
            </motion.div>

            {/* CTAs — dynamic by segment */}
            <div className="mt-9 min-h-[7rem]">
              <AnimatePresence mode="wait">
                {segment === "personas" ? (
                  <motion.div
                    key="personas-ctas"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <GooglePlayButton size="lg" variant="filled" className="px-7 text-base" />
                      <AppStoreButton size="lg" variant="outline" className="px-7 text-base" />
                    </div>
                    <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start">
                      <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                      {content.microcopy}
                    </p>
                    <Link
                      href="https://wa.me/573001234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary lg:justify-start"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Hablar por WhatsApp
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empresas-ctas"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary px-8 text-base"
                        asChild
                      >
                        <Link href="#demo">
                          Agendar una demo
                          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-border bg-transparent text-foreground hover:border-primary hover:bg-primary/10 text-base"
                        asChild
                      >
                        <Link href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                          WhatsApp
                        </Link>
                      </Button>
                    </div>
                    <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground lg:justify-start">
                      <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                      {content.microcopy}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right: image + floating product card ─────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative"
          >
            {/* Primary: contextual image (40–50% of viewport width) */}
            <figure
              className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-[500px] w-full lg:h-[580px]"
              role="img"
              aria-label="Conductor usando la app Simon para monitorear su vehículo en tiempo real"
            >
              <Image
                src="/images/hero.jpg"
                alt="Conductor usando la app Simon para monitorear su vehículo en tiempo real"
                fill
                className="object-cover"
              />
            </figure>

            {/* Floating product card — bottom overlay */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-5 left-4 right-4"
              aria-hidden="true"
            >
              <div className="rounded-xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur-md">
                {/* Live header */}
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
                    <span className="text-xs font-medium text-foreground">Panel en vivo</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">Actualizado hace 2s</span>
                </div>

                {/* 4-column mini stats */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="rounded-lg bg-surface px-2 py-2 text-center">
                    <p className="text-xs font-semibold text-foreground">ABC-123</p>
                    <p className="text-[9px] text-success">En ruta</p>
                  </div>
                  <div className="rounded-lg border border-warning/30 bg-warning/8 px-2 py-2 text-center">
                    <Bell className="mx-auto mb-0.5 h-3 w-3 text-warning" aria-hidden="true" />
                    <p className="text-[9px] text-warning">Geocerca</p>
                  </div>
                  <div className="rounded-lg bg-surface px-2 py-2 text-center">
                    <FileText className="mx-auto mb-0.5 h-3 w-3 text-primary" aria-hidden="true" />
                    <p className="text-[9px] text-muted-foreground">SOAT ok</p>
                  </div>
                  <div className="rounded-lg bg-surface px-2 py-2 text-center">
                    <BarChart3 className="mx-auto mb-0.5 h-3 w-3 text-secondary" aria-hidden="true" />
                    <p className="text-[9px] text-muted-foreground">142 km</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust badges — floating corners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.65 }}
              className="absolute top-4 left-4 flex items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md"
              aria-hidden="true"
            >
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-foreground">Conectado</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-4 right-4 flex items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md"
              aria-hidden="true"
            >
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Protegido</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
