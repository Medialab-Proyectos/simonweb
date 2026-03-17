"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const fadeInUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export function HeroCB() {
  const handleScroll = () => {
    document.getElementById("cb-crisis")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="cb-hero-heading"
    >
      {/* Full-viewport background: vehicle long-exposure */}
      <div className="absolute inset-0 bg-[#080808]" aria-hidden="true">
        {/* Layered gradient — cinematic cian on dark */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 60% at 50% 55%, rgba(0,255,194,0.05) 0%, transparent 65%),
              linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,0.5) 60%, rgba(8,8,8,1) 100%)
            `,
          }}
        />
        {/* Light streak — highway feel */}
        <div
          className="absolute top-[40%] left-0 right-0 h-px opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #00FFC2 20%, rgba(255,255,255,0.5) 50%, #19B5FF 80%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute top-[42%] left-0 right-0 h-[2px] opacity-10"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #00FFC2 30%, transparent 100%)",
            filter: "blur(4px)",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto pt-20"
      >
        {/* Chapter label */}
        <motion.span
          variants={fadeInUp}
          className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-muted-foreground tracking-widest uppercase mb-8"
        >
          Tu historia
        </motion.span>

        {/* H1 — opens with a question, drops the visitor into the scene */}
        <motion.h1
          id="cb-hero-heading"
          variants={fadeInUp}
          className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl text-balance"
        >
          ¿Sabes dónde está{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00E5D1 0%, #19B5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            tu vehículo
          </span>{" "}
          en este momento?
        </motion.h1>

        {/* Subtitle — seed of tension */}
        <motion.p
          variants={fadeInUp}
          className="mt-7 text-xl leading-relaxed text-muted-foreground max-w-xl"
        >
          Millones de colombianos manejan sin control real sobre su vehículo. Simon cambia eso.
        </motion.p>

        {/* Scroll invite — soft, not a hard CTA */}
        <motion.button
          variants={fadeInUp}
          onClick={handleScroll}
          className="mt-12 flex flex-col items-center gap-2 text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors group"
          aria-label="Continuar leyendo"
        >
          <span>¿Te suena familiar?</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5" aria-hidden="true" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  )
}
