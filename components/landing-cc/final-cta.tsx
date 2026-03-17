"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "@/components/landing/store-buttons"

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function FinalCTACC() {
  const handleDemoScroll = () => {
    document.getElementById("cc-enterprise")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative bg-[#080808] py-24 lg:py-32 overflow-hidden"
      aria-labelledby="cc-final-heading"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/8 to-primary/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-primary/14 blur-[90px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {/* Loss frame — present tense, honest */}
          <motion.span variants={fadeInUp} className="inline-block rounded-full border border-destructive/25 bg-destructive/8 px-4 py-1 text-sm text-destructive mb-6">
            Mientras lees esto, tu vehículo no tiene control activo
          </motion.span>

          <motion.h2
            id="cc-final-heading"
            variants={fadeInUp}
            className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance"
          >
            Tu vehículo está{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00E5D1 0%, #19B5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              desprotegido ahora mismo.
            </span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="mt-5 text-lg text-muted-foreground max-w-lg mx-auto">
            Más de 50.000 colombianos ya tomaron el control. La instalación tarda 30 minutos. La tranquilidad dura para siempre.
          </motion.p>

          {/* CTAs — same as hero, no new copy to learn */}
          <motion.div variants={fadeInUp} className="mt-9 flex flex-col items-center gap-5">
            <div className="flex flex-row flex-wrap gap-3 justify-center">
              <GooglePlayButton />
              <AppStoreButton />
            </div>

            <button
              onClick={handleDemoScroll}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-secondary transition-colors"
            >
              Soy empresa — quiero una demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>

          <motion.p variants={fadeInUp} className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
            Desde $29.900/mes · Sin permanencia · Soporte 24/7
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
