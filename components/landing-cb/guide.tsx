"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { animate, useInView } from "framer-motion"

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const controls = animate(0, to, {
      duration: 1.8, ease: "easeOut",
      onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString("es-CO") + suffix },
    })
    return controls.stop
  }, [inView, to, suffix])
  return <span ref={ref} aria-label={`${to}${suffix}`}>0{suffix}</span>
}

const metrics = [
  { prefix: "+", to: 50000, label: "Dispositivos instalados", color: "text-primary" },
  { prefix: "+", to: 44000, label: "Vehículos activos", color: "text-secondary" },
  { prefix: "+", to: 4, suffix: " años", label: "Acompañando a conductores colombianos", color: "text-success" },
]

export function GuideCB() {
  return (
    <section
      id="cb-guide"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="cb-guide-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Chapter label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-muted-foreground tracking-widest uppercase mb-8"
        >
          El guía
        </motion.span>

        {/* Simon brand lock icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25"
          aria-hidden="true"
        >
          <svg viewBox="0 0 40 40" className="h-11 w-11" fill="none">
            <rect x="10" y="18" width="20" height="16" rx="3.5" stroke="#00E5D1" strokeWidth="2" fill="none" />
            <path d="M14 18v-4a6 6 0 0 1 12 0v4" stroke="#00E5D1" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="26" r="2.5" fill="#00E5D1" />
          </svg>
        </motion.div>

        {/* Guide headline */}
        <motion.h2
          id="cb-guide-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
        >
          Simon lleva más de 4 años devolviendo el control a propietarios colombianos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          No somos un gadget de tecnología. Somos el sistema que más conductores colombianos
          usan para dormir tranquilos sabiendo dónde está su vehículo.
        </motion.p>

        {/* Proof metrics — secondary, supporting the guide's credibility */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1.5">
              <p className={`text-3xl font-bold tabular-nums ${m.color}`}>
                {m.prefix}<Counter to={m.to} suffix={m.suffix ?? ""} />
              </p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Bridge — invitation to see the transformation */}
        <motion.a
          href="#cb-transformation"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Ver cómo cambia todo con Simon
          <span aria-hidden="true">↓</span>
        </motion.a>
      </div>
    </section>
  )
}
