"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, animate } from "framer-motion"

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString("es-CO") + suffix },
    })
    return controls.stop
  }, [inView, to, suffix])

  return <span ref={ref} aria-label={`${to}${suffix}`}>0{suffix}</span>
}

const stats = [
  { prefix: "+", to: 50000, label: "Dispositivos instalados", color: "text-primary" },
  { prefix: "+", to: 44000, label: "Vehículos activos", color: "text-secondary" },
  { prefix: "+", to: 4, suffix: " años", label: "Respaldando conductores colombianos", color: "text-success" },
]

export function TrustStripCA() {
  return (
    <section
      className="bg-[#080808] border-y border-border/40"
      aria-label="Métricas de confianza Simon"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <p className={`text-4xl font-bold tabular-nums tracking-tight ${s.color}`}>
                {s.prefix}<Counter to={s.to} suffix={s.suffix ?? ""} />
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
