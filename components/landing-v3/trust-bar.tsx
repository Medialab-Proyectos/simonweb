"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Cpu, Car, TrendingUp } from "lucide-react"

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ from = 0, to, suffix = "", duration = 1.8 }: {
  from?: number; to: number; suffix?: string; duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString("es-CO") + suffix },
    })
    return controls.stop
  }, [inView, from, to, suffix, duration])

  return <span ref={ref} aria-label={`${to}${suffix}`}>{from}{suffix}</span>
}

// ─── Stats ────────────────────────────────────────────────────────────────────
type Stat =
  | { kind: "counter"; prefix?: string; target: number; suffix: string; label: string; icon: React.ElementType }
  | { kind: "static"; value: string; label: string; icon: React.ElementType }

const stats: Stat[] = [
  { kind: "counter", prefix: "+", target: 50000, suffix: "", label: "Dispositivos instalados", icon: Cpu },
  { kind: "counter", prefix: "+", target: 44000, suffix: "", label: "Vehículos activos",        icon: Car },
  { kind: "counter", prefix: "+", target: 19000, suffix: "", label: "Vehículos productivos",    icon: TrendingUp },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function TrustBar() {
  return (
    <section
      className="relative border-y border-border bg-surface py-14"
      aria-label="Impacto Simon — métricas de confianza"
    >
      {/* Glow accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-primary/4 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-primary"
        >
          Impacto Simon
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex flex-col items-center gap-1 text-center"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary">
                <stat.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {stat.kind === "counter" ? (
                  <>
                    {stat.prefix}
                    <Counter to={stat.target} suffix={stat.suffix} />
                  </>
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
