"use client"

import { motion } from "framer-motion"
import { Car, Building2, ArrowRight } from "lucide-react"
import { useSegment } from "@/components/landing/segment-context"
import { cn } from "@/lib/utils"

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function HeroCA() {
  const { setSegment } = useSegment()

  const handleSelect = (seg: "personas" | "empresas") => {
    setSegment(seg)
    setTimeout(() => {
      document.getElementById("ca-feature")?.scrollIntoView({ behavior: "smooth" })
    }, 80)
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#080808] px-4 pt-20 pb-16"
      aria-labelledby="ca-hero-heading"
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,255,194,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        {/* Overline */}
        <motion.span
          variants={fadeInUp}
          className="inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-6"
        >
          Colombia · 24/7 · +50.000 dispositivos activos
        </motion.span>

        {/* H1 */}
        <motion.h1
          id="ca-hero-heading"
          variants={fadeInUp}
          className="text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl text-balance"
        >
          Tu vehículo,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00E5D1 0%, #19B5FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            bajo control.
          </span>{" "}
          Siempre.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-md"
        >
          Simon monitorea, protege y gestiona todo lo de tu vehículo. En una sola app.
        </motion.p>

        {/* Segment selection cards */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl"
          role="group"
          aria-label="Selecciona tu perfil para continuar"
        >
          <button
            onClick={() => handleSelect("personas")}
            className={cn(
              "group relative flex flex-col items-start rounded-2xl border border-border bg-card p-6 text-left",
              "transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:shadow-xl hover:shadow-primary/10",
              "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            )}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 mb-4 group-hover:bg-primary/25 transition-colors">
              <Car className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <p className="text-base font-semibold text-foreground">Tengo un vehículo particular</p>
            <p className="mt-1 text-sm text-muted-foreground">Monitoreo personal, documentos y alertas</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Continuar
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
          </button>

          <button
            onClick={() => handleSelect("empresas")}
            className={cn(
              "group relative flex flex-col items-start rounded-2xl border border-border bg-card p-6 text-left",
              "transition-all duration-200 hover:border-secondary/50 hover:bg-secondary/5 hover:shadow-xl hover:shadow-secondary/10",
              "focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            )}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 mb-4 group-hover:bg-secondary/25 transition-colors">
              <Building2 className="h-5 w-5 text-secondary" aria-hidden="true" />
            </div>
            <p className="text-base font-semibold text-foreground">Administro una flota</p>
            <p className="mt-1 text-sm text-muted-foreground">Visibilidad operativa, KPIs y reportes</p>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
              Continuar
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </div>
          </button>
        </motion.div>

        <motion.p variants={fadeInUp} className="mt-6 text-xs text-muted-foreground/60">
          Elige tu perfil para ver la solución exacta que necesitas.
        </motion.p>
      </motion.div>
    </section>
  )
}
