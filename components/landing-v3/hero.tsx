"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import { cn } from "@/lib/utils"
import Image from "next/image"

// ─── Segment content ──────────────────────────────────────────────────────────
const segmentContent = {
  personas: {
    headline: "La tecnología de rastreo",
    headlineAccent: "más intuitiva en tus manos.",
    sub: "Monitorea, protege y gestiona tu carro desde el celular. Seguridad 24/7, documentos al día, alertas en tiempo real y Simon Pay para peajes.",
    microcopy: "Descarga gratuita · Android e iOS · Sin tarjeta de crédito",
  },
  empresas: {
    headline: "Tu flota en un solo",
    headlineAccent: "panel de control.",
    sub: "Visibilidad total, trazabilidad en tiempo real y decisiones basadas en datos — para flotas de cualquier tamaño.",
    microcopy: "Sin compromiso · Demo personalizada · Respuesta < 1h",
  },
}

const fadeInUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger  = { visible: { transition: { staggerChildren: 0.1 } } }

// ─── Pulse ring ───────────────────────────────────────────────────────────────
function PulseRing({ color = "bg-success" }: { color?: string }) {
  return (
    <div className="relative shrink-0">
      <div className={cn("h-2 w-2 rounded-full", color)} />
      <div className={cn("absolute inset-0 h-2 w-2 rounded-full animate-ping opacity-30", color)} />
    </div>
  )
}

// ─── Hero Component ───────────────────────────────────────────────────────────
export function Hero() {
  const content = segmentContent.personas

  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "80px 0" }}
      aria-labelledby="hero-heading"
    >
      {/* ── Background ────────────────────────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/fondo.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay direccional: más oscuro a la izquierda (texto), más claro a la derecha */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to right,
              rgba(5,5,5,0.82) 0%,
              rgba(5,5,5,0.60) 40%,
              rgba(5,5,5,0.30) 70%,
              rgba(5,5,5,0.10) 100%
            )`,
          }}
        />
        {/* Vignette vertical inferior para transición suave a la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        className="relative mx-auto px-6"
        style={{ maxWidth: 1200 }}
      >
        <div className="grid items-center gap-12 lg:gap-0 lg:[grid-template-columns:1.1fr_0.9fr]">

            {/* ── Left: copy ──────────────────────────────────────────── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
              style={{ maxWidth: 480, margin: "0 auto" }}
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-5"
              >
                <PulseRing />
                Monitoreo vehicular en tiempo real
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="hero-heading"
                variants={fadeInUp}
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3rem] text-balance"
                style={{ lineHeight: 1.15 }}
              >
                {content.headline}{" "}
                <span className="gradient-text">{content.headlineAccent}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="mt-5 text-base leading-relaxed text-muted-foreground"
                style={{ maxWidth: 460, lineHeight: 1.6 }}
              >
                {content.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-col gap-4 w-full"
              >
                <div className="flex items-center gap-3 justify-center lg:justify-start flex-wrap">
                  <div className="glow-primary rounded-md">
                    <GooglePlayButton />
                  </div>
                  <AppStoreButton />
                </div>

                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 lg:justify-start">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                  {content.microcopy}
                </p>
              </motion.div>
            </motion.div>

            {/* ── Right: phone image ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center lg:justify-center"
            >
              {/* Wrapper: sin transform en mobile, scale(1.1) en desktop */}
              <div
                className="relative w-[280px] lg:w-auto lg:scale-110 lg:translate-y-10"
                style={{ transformOrigin: "center center" }}
              >
                {/* Ambient glow */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse at 50% 60%, rgba(0,255,194,0.22) 0%, transparent 68%)",
                    filter: "blur(40px)",
                    transform: "scale(1.35)",
                  }}
                  aria-hidden="true"
                />
                <Image
                  src="/images/smart.png"
                  alt="App Simon Movilidad en smartphone"
                  width={460}
                  height={614}
                  className="relative z-10 w-full h-auto lg:-rotate-[5deg]"
                  style={{
                    maxWidth: "100%",
                    filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.55))",
                  }}
                  priority
                />
              </div>
            </motion.div>

        </div>
      </div>
    </section>
  )
}
