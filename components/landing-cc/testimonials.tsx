"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const testimonials = [
  {
    quote: "Reduje el gasto de combustible de mi flota en el primer mes de uso.",
    name: "Hernando V.",
    context: "Gerente de operaciones · Cali",
    initials: "HV",
    pill: "Flota de 8 vehículos",
    pillColor: "bg-secondary/10 text-secondary",
  },
  {
    quote: "Con Simon sé exactamente dónde está mi carro en todo momento. La tranquilidad no tiene precio.",
    name: "Juliana P.",
    context: "Usuaria particular · Medellín",
    initials: "JP",
    pill: "Usuario desde 2022",
    pillColor: "bg-primary/10 text-primary",
  },
  {
    quote: "El SOAT me venció una vez antes de Simon. Nunca más. La alerta llegó 30 días antes.",
    name: "Ricardo M.",
    context: "Conductor independiente · Bogotá",
    initials: "RM",
    pill: "Ahorro en multas",
    pillColor: "bg-success/10 text-success",
  },
]

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function TestimonialsCC() {
  return (
    <section
      id="cc-testimonials"
      className="bg-[#080808] py-20 lg:py-28"
      aria-labelledby="cc-testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary mb-4">
            Resultados reales
          </span>
          <h2 id="cc-testimonials-heading" className="text-3xl font-bold text-foreground sm:text-4xl">
            Resultados reales de usuarios Simon
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 cursor-default hover:border-primary/30 transition-colors"
            >
              {/* Verified */}
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                <span className="text-xs text-success font-medium">Cliente verificado</span>
              </div>

              <blockquote className="flex-grow text-foreground text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Result pill */}
              <div className="mt-4">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${t.pillColor}`}>
                  {t.pill}
                </span>
              </div>

              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 border border-primary/25 text-xs font-bold text-primary" aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.context}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
