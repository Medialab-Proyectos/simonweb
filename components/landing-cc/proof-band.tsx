"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, animate } from "framer-motion"
import { ClientLogos } from "@/components/landing/client-logos"

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const ctrl = animate(0, to, {
      duration: 1.6, ease: "easeOut",
      onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString("es-CO") + suffix },
    })
    return ctrl.stop
  }, [inView, to, suffix])
  return <span ref={ref} aria-label={`${to}${suffix}`}>0{suffix}</span>
}

const stats = [
  { prefix: "+", to: 50000, label: "Dispositivos instalados", color: "text-primary" },
  { prefix: "+", to: 44000, label: "Vehículos activos", color: "text-secondary" },
  { prefix: "+", to: 19000, label: "Vehículos en flotas activas", color: "text-success" },
]

export function ProofBandCC() {
  return (
    <>
      {/* Counter strip */}
      <section
        className="bg-[#080808] border-y border-border/40 py-10"
        aria-label="Métricas de impacto Simon"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <p className={`text-3xl sm:text-4xl font-bold tabular-nums ${s.color}`}>
                  {s.prefix}<Counter to={s.to} />
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client logos */}
      <ClientLogos />
    </>
  )
}
