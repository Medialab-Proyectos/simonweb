"use client"

import { motion } from "framer-motion"
import { Star, CheckCircle2 } from "lucide-react"

const testimonials = [
  {
    quote:
      "Desde que instalé Simon, mi esposa puede ver dónde estoy cuando viajo por trabajo. La tranquilidad que eso nos da no tiene precio.",
    author: "Carlos Rodríguez",
    role: "Usuario particular, Bogotá",
    initials: "CR",
    result: "Tranquilidad 24/7",
    resultColor: "text-primary bg-primary/10",
  },
  {
    quote:
      "Pasamos de no saber dónde estaban nuestros 20 vehículos a tener control total. Redujimos costos de combustible un 15% en el primer trimestre.",
    author: "María González",
    role: "Gerente de Operaciones, Transportes del Valle",
    initials: "MG",
    result: "−15% combustible",
    resultColor: "text-success bg-success/10",
  },
  {
    quote:
      "Me llegó la alerta del SOAT a punto de vencer y lo renové a tiempo. Pequeño detalle, gran impacto — me ahorré una multa de $500.000.",
    author: "Andrés Mejía",
    role: "Empresario independiente",
    initials: "AM",
    result: "$500K ahorrados",
    resultColor: "text-warning bg-warning/10",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function TestimonialsSectionV2() {
  return (
    <section
      id="testimonios"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="testimonials-v2-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
          >
            Casos reales
          </motion.span>
          <motion.h2
            id="testimonials-v2-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Quienes ya usan Simon.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-md text-muted-foreground"
          >
            Resultados reales, personas reales. Sin guiones.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 cursor-default hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-shadow"
            >
              {/* Verified badge — top of card */}
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs text-success">
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  Cliente verificado
                </span>
                {/* Stars */}
                <div className="flex gap-0.5" aria-label="5 estrellas">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden="true" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="flex-grow text-foreground leading-relaxed text-sm">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Result pill */}
              <div className="mt-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${t.resultColor}`}>
                  {t.result}
                </span>
              </div>

              {/* Author — initials avatar */}
              <figcaption className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 border border-primary/25 text-sm font-bold text-primary shrink-0"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
