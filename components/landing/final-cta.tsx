"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import { useSegment } from "./segment-context"
import Image from "next/image"
import Link from "next/link"
import { useDemoModal } from "./demo-modal-context"

const segmentContent = {
  personas: {
    headline: "Descarga Simon y toma el control de tu vehículo",
    body: "Monitorea, protege y gestiona tu vehículo desde tu celular. Disponible para Android e iOS.",
    microcopy: "Descarga inmediata. Sin configuraciones complejas.",
  },
  empresas: {
    headline: "Agenda una demo y descubre cómo Simon optimiza tu flota",
    body: "Centraliza alertas, trazabilidad y operación en una sola plataforma diseñada para crecer con tu empresa.",
    microcopy: "Sin compromiso. Respuesta en menos de 1 hora hábil.",
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

export function FinalCTA() {
  const { segment } = useSegment()
  const content = segmentContent[segment]
  const { open: openDemo } = useDemoModal()

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
              {segment === "personas" ? "Disponible ahora" : "Empieza hoy"}
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

            {/* Dynamic CTAs */}
            <div className="mt-10 min-h-[5rem]">
              <AnimatePresence mode="wait">
                {segment === "personas" ? (
                  <motion.div
                    key="personas-final-ctas"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <GooglePlayButton size="lg" variant="filled" className="px-8 text-base" />
                    <AppStoreButton size="lg" variant="outline" className="px-8 text-base" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empresas-final-ctas"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 sm:flex-row"
                  >
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary px-10 text-base"
                      onClick={openDemo}
                    >
                      Agendar una demo
                      <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Microcopy */}
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
          </motion.div>

          {/* ── Right: contextual image ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <figure
              className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-72 w-full sm:h-96 lg:h-[480px]"
              role="img"
              aria-label="Control de movilidad desde la aplicación Simon"
            >
              <Image
                src="/images/final-cta.jpg"
                alt="Control de movilidad desde la aplicación Simon"
                fill
                className="object-cover"
              />
            </figure>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
