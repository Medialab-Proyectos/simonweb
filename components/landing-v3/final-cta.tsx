"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import { useSegment } from "./segment-context"
import { ContactForm } from "./contact-form"
import Image from "next/image"
import { CheckCircle2, Shield, Clock, Headphones } from "lucide-react"

const segmentContent = {
  personas: {
    eyebrow: "Disponible ahora",
    headline: "Descarga Simon y toma el control de tu vehículo",
    body: "Monitorea, protege y gestiona tu vehículo desde tu celular. Disponible para Android e iOS.",
    microcopy: "Descarga inmediata. Sin configuraciones complejas.",
  },
  empresas: {
    eyebrow: "Empieza hoy",
    headline: "Optimiza tu flota con Simon",
    body: "Centraliza alertas, trazabilidad y operación en una sola plataforma diseñada para crecer con tu empresa.",
    microcopy: null,
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

// ─── Trust badges for the demo section ─────────────────────────────────────────
const trustBadges = [
  { icon: Shield, text: "Sin compromiso" },
  { icon: Clock, text: "Respuesta ≤ 1h" },
  { icon: Headphones, text: "Soporte 24/7" },
]

export function FinalCTA() {
  const { segment } = useSegment()
  const content = segmentContent[segment]

  return (
    <section
      id="demo"
      className="relative overflow-hidden py-24 lg:py-32"
      aria-labelledby="final-cta-heading"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/6 to-primary/12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-20 left-1/3 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-[80px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-1/4 h-[28rem] w-[28rem] rounded-full bg-secondary/12 blur-[80px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: copy + CTAs ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Eyebrow */}
            <motion.span
              variants={fadeInUp}
              className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary"
            >
              {content.eyebrow}
            </motion.span>

            {/* Headline — static visual anchor */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Menos incertidumbre. Más control.
            </motion.p>

            {/* Dynamic headline */}
            <div className="mt-3 min-h-[4rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  id="final-cta-heading"
                  key={segment}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
                >
                  {content.headline}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Dynamic body */}
            <div className="mt-4 min-h-[3rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={segment + "-body"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-xl text-lg leading-relaxed text-muted-foreground"
                >
                  {content.body}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Personas CTAs only */}
            <AnimatePresence mode="wait">
              {segment === "personas" && (
                <motion.div
                  key="personas-final-ctas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-10 flex flex-row flex-wrap gap-3 items-center justify-center lg:justify-start"
                >
                  <GooglePlayButton />
                  <AppStoreButton />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Microcopy (personas only) */}
            {content.microcopy && (
              <AnimatePresence mode="wait">
                <motion.p
                  key={segment + "-micro"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mt-5 text-sm text-muted-foreground"
                >
                  {content.microcopy}
                </motion.p>
              </AnimatePresence>
            )}

            {/* Trust badges — empresas */}
            {segment === "empresas" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                {trustBadges.map((badge) => (
                  <motion.div
                    key={badge.text}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 cursor-default"
                  >
                    <badge.icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span className="text-xs font-medium text-foreground">{badge.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Simon character — visible on empresas, as a visual companion */}
            {segment === "empresas" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/15 bg-card/80 p-4 w-full max-w-md"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src="/images/simon-character.png"
                    alt="Simón — Asesor de movilidad"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Simón, tu asesor</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    &ldquo;Te ayudo a encontrar la solución ideal para tu flota. ¡Completa el formulario y te contacto!&rdquo;
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── Right: ContactForm (empresas) / image (personas) ── */}
          <AnimatePresence mode="wait">
            {segment === "empresas" ? (
              <motion.div
                key="empresas-form"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.45 }}
              >
                <ContactForm />
              </motion.div>
            ) : (
              <motion.div
                key="personas-image"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.45, delay: 0.15 }}
              >
                <figure
                  className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-72 w-full sm:h-96 lg:h-[480px]"
                  role="img"
                  aria-label="Control de movilidad desde la aplicación Simon"
                >
                  <Image
                    src="/images/audience-personas-new.png"
                    alt="Persona usando la app Simon en su vehículo"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-4 left-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-xs font-medium text-foreground">Descarga gratuita</span>
                  </motion.div>
                </figure>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
