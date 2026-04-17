"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, animate } from "framer-motion"
import { Cpu, Car, TrendingUp } from "lucide-react"
import Image from "next/image"

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ from = 0, to, suffix = "", duration = 2.2 }: {
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
const stats = [
  {
    icon: Cpu,
    prefix: "+",
    target: 50000,
    label: "Dispositivos instalados",
    image: "/images/companero-viaje.jpg",
    imageAlt: "Persona usando Simon Movilidad",
    color: "text-primary",
    iconBg: "bg-primary/20",
    glowColor: "rgba(0,255,194,0.15)",
  },
  {
    icon: Car,
    prefix: "+",
    target: 44000,
    label: "Vehículos activos",
    image: "/images/audience-empresas-new.png",
    imageAlt: "Flota de vehículos con Simon",
    color: "text-secondary",
    iconBg: "bg-secondary/20",
    glowColor: "rgba(25,181,255,0.15)",
  },
  {
    icon: TrendingUp,
    prefix: "+",
    target: 19000,
    label: "Vehículos productivos",
    image: "/images/testimonials-new.png",
    imageAlt: "Clientes satisfechos con Simon",
    color: "text-success",
    iconBg: "bg-success/20",
    glowColor: "rgba(42,214,122,0.15)",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.15 } } }

export function TrustBar() {
  return (
    <section
      className="relative bg-[#080808] pt-8 pb-20 lg:pt-12 lg:pb-24 overflow-hidden"
      aria-label="Impacto Simon — métricas de confianza"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[700px] bg-primary/4 blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Impacto Simon
          </span>
          <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
            Números que hablan por nosotros. Confianza construida dispositivo a dispositivo.
          </p>
        </motion.div>

        {/* Metric cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card relative overflow-hidden rounded-2xl cursor-default group hover:border-primary/30 transition-all"
            >
              {/* ── Imagen humana ────────────────────────────────────── */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={stat.image}
                  alt={stat.imageAlt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Gradient: foto → fondo de la tarjeta */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/40 to-transparent" />

                {/* Badge de ícono flotante sobre la foto */}
                <div className="absolute top-3 left-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg} backdrop-blur-sm`}
                    style={{ boxShadow: `0 0 16px ${stat.glowColor}` }}
                  >
                    <stat.icon className={`h-4.5 w-4.5 ${stat.color}`} aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* ── Stats ────────────────────────────────────────────── */}
              <div className="px-6 pb-6 pt-4">
                <p className={`text-4xl font-bold tracking-tight sm:text-[2.75rem] ${stat.color}`}>
                  {stat.prefix}
                  <Counter to={stat.target} />
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>

              {/* Shimmer bottom */}
              <div className="absolute bottom-0 left-4 right-4 h-px shimmer-border opacity-40" />

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-primary/4 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
