"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, Download } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "@/components/landing/store-buttons"
import Link from "next/link"

const fadeInUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function HeroCC() {
  const handleDemoScroll = () => {
    document.getElementById("cc-enterprise")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative min-h-screen flex items-center bg-[#080808] pt-20 pb-16 overflow-hidden"
      aria-labelledby="cc-hero-heading"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 40%, rgba(0,255,194,0.06) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 20% 70%, rgba(25,181,255,0.04) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={stagger}>

            {/* Inline social proof — before the headline */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 flex items-center gap-2"
            >
              <div className="flex -space-x-1.5" aria-hidden="true">
                {["CR", "MG", "AM", "JV", "LP"].map((init) => (
                  <div
                    key={init}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#080808] bg-primary/20 text-[9px] font-bold text-primary"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+50.000</span> dispositivos activos en Colombia
              </span>
            </motion.div>

            {/* H1 — anchoring with the number first */}
            <motion.h1
              id="cc-hero-heading"
              variants={fadeInUp}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance"
            >
              +50.000 vehículos en Colombia ya tienen{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00E5D1 0%, #19B5FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                control activo.
              </span>{" "}
              ¿El tuyo no?
            </motion.h1>

            {/* Subtitle — with price anchor */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-xl"
            >
              Simon monitorea en tiempo real, avisa antes de que algo pase y mantiene tus documentos siempre vigentes.
              Desde{" "}
              <span className="font-semibold text-foreground">$29.900/mes.</span>
            </motion.p>

            {/* CTAs — dual track */}
            <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-4">
              {/* B2C primary */}
              <div className="flex flex-row flex-wrap items-center gap-3">
                <GooglePlayButton />
                <AppStoreButton />
              </div>

              {/* B2B secondary */}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={handleDemoScroll}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:border-secondary/40 hover:text-secondary transition-all"
                >
                  Soy empresa — quiero una demo
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>

            {/* Trust microcopy */}
            <motion.div variants={fadeInUp} className="mt-5 flex flex-wrap gap-4">
              {[
                "Sin permanencia",
                "Instalación en 30 min",
                "Soporte 24/7",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
