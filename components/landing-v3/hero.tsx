"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import { cn } from "@/lib/utils"
import Image from "next/image"

// ─── Segment content ──────────────────────────────────────────────────────────
const segmentContent = {
  personas: {
    headline: "Gestión vehicular",
    headlineAccent: "inteligente",
    sub: "Soluciones de vanguardia para tener el control total de tu flota o vehículo particular.",
    microcopy: "",
  },
  empresas: {
    headline: "Gestión vehicular",
    headlineAccent: "inteligente",
    sub: "Soluciones de vanguardia para tener el control total de tu flota o vehículo particular.",
    microcopy: "",
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
      className="relative flex min-h-screen items-center overflow-hidden py-28 lg:py-32"
      aria-labelledby="hero-heading"
    >
      {/* ── Background ────────────────────────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/fondo1.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay direccional: más oscuro a la izquierda (texto), controlado a la derecha */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              90deg,
              rgba(0,0,0,0.55) 0%,
              rgba(0,0,0,0.35) 35%,
              rgba(0,0,0,0.12) 60%,
              rgba(0,0,0,0) 85%
            )`,
          }}
        />
        {/* Luces de ciudad animadas — parpadeo sutil */}
        <div className="city-lights absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="city-light" style={{ left: "22%", top: "22%", animationDelay: "0.0s" }} />
          <span className="city-light" style={{ left: "29%", top: "29%", animationDelay: "1.3s" }} />
          <span className="city-light" style={{ left: "35%", top: "20%", animationDelay: "0.6s" }} />
          <span className="city-light" style={{ left: "41%", top: "32%", animationDelay: "2.1s" }} />
          <span className="city-light" style={{ left: "47%", top: "24%", animationDelay: "0.9s" }} />
          <span className="city-light" style={{ left: "53%", top: "36%", animationDelay: "1.7s" }} />
          <span className="city-light" style={{ left: "59%", top: "26%", animationDelay: "0.3s" }} />
          <span className="city-light" style={{ left: "65%", top: "38%", animationDelay: "2.4s" }} />
          <span className="city-light" style={{ left: "71%", top: "28%", animationDelay: "1.1s" }} />
          <span className="city-light" style={{ left: "77%", top: "40%", animationDelay: "0.5s" }} />
          <span className="city-light" style={{ left: "83%", top: "23%", animationDelay: "1.9s" }} />
          <span className="city-light" style={{ left: "89%", top: "34%", animationDelay: "0.7s" }} />
          <span className="city-light" style={{ left: "95%", top: "25%", animationDelay: "2.2s" }} />
          <span className="city-light" style={{ left: "98%", top: "38%", animationDelay: "1.4s" }} />
          <span className="city-light" style={{ left: "56%", top: "44%", animationDelay: "0.2s" }} />
          <span className="city-light" style={{ left: "68%", top: "46%", animationDelay: "1.0s" }} />
          <span className="city-light" style={{ left: "80%", top: "48%", animationDelay: "1.6s" }} />
          <span className="city-light" style={{ left: "92%", top: "46%", animationDelay: "0.4s" }} />
          <span className="city-light" style={{ left: "38%", top: "42%", animationDelay: "2.0s" }} />
          <span className="city-light" style={{ left: "74%", top: "21%", animationDelay: "0.8s" }} />
        </div>
        {/* Vignette vertical inferior para transición suave a la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:gap-16 lg:[grid-template-columns:1fr_1fr]">

            {/* ── Left: copy ──────────────────────────────────────────── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col items-center text-center lg:items-start lg:text-left lg:mx-0"
              style={{ maxWidth: 520 }}
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 text-xs font-medium tracking-wide text-primary mb-6"
              >
                <PulseRing />
                Simon Movilidad
              </motion.div>

              {/* Headline */}
              <motion.h1
                id="hero-heading"
                variants={fadeInUp}
                className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] text-balance"
                style={{ lineHeight: 1.08, letterSpacing: "-0.02em" }}
              >
                {content.headline}{" "}
                <span className="gradient-text">{content.headlineAccent}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-base text-muted-foreground sm:text-lg"
                style={{ maxWidth: 480, lineHeight: 1.65 }}
              >
                {content.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-col gap-4 w-full"
              >
                <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
                  <GooglePlayButton />
                  <AppStoreButton />
                </div>

                {content.microcopy && (
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5 lg:justify-start">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                    {content.microcopy}
                  </p>
                )}
              </motion.div>
            </motion.div>

            {/* ── Right: phone image ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center lg:justify-end lg:translate-x-6 xl:translate-x-10"
            >
              {/* Wrapper: celular protagonista, composición limpia */}
              <div className="relative w-[180px] sm:w-[210px] lg:w-[300px]">
                <Image
                  src="/images/smart.png"
                  alt="App Simon Movilidad en smartphone"
                  width={560}
                  height={746}
                  className="relative z-10 w-full h-auto"
                  style={{
                    filter:
                      "drop-shadow(0 30px 40px rgba(0,0,0,0.55)) drop-shadow(0 10px 20px rgba(0,0,0,0.35))",
                  }}
                  priority
                />
                {/* Sombra proyectada en el piso — sutil y elegante */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-2 z-0 h-8 w-[78%]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, transparent 75%)",
                    filter: "blur(14px)",
                  }}
                />
              </div>
            </motion.div>

        </div>
      </div>
    </section>
  )
}
