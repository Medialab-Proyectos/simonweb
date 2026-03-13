"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, animate } from "framer-motion"

// ─── Animated numeric counter ─────────────────────────────────────────────────
function Counter({
  from = 0,
  to,
  suffix = "",
  duration = 1.8,
}: {
  from?: number
  to: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = Math.round(v).toString() + suffix
      },
    })
    return controls.stop
  }, [inView, from, to, suffix, duration])

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      {from}
      {suffix}
    </span>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
type Stat =
  | { kind: "counter"; target: number; suffix: string; label: string }
  | { kind: "static"; value: string; label: string }

const stats: Stat[] = [
  { kind: "counter", target: 50, suffix: "k+", label: "Dispositivos conectados" },
  { kind: "counter", target: 44, suffix: "k+", label: "Vehículos activos" },
  { kind: "static", value: "24/7", label: "Monitoreo continuo" },
  { kind: "static", value: "100%", label: "Cobertura nacional" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function TrustBar() {
  return (
    <section
      className="relative border-y border-border bg-surface py-12"
      aria-label="Métricas de confianza"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex flex-col items-center gap-1 text-center"
            >
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {stat.kind === "counter" ? (
                  <Counter to={stat.target} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Tecnología aplicada a seguridad, operación y control diario.
        </motion.p>
      </div>
    </section>
  )
}
