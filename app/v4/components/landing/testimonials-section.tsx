"use client"

import { motion } from "framer-motion"
import { Star, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Desde que instalé Simon, mi esposa puede ver dónde estoy cuando viajo por trabajo. La tranquilidad que eso nos da no tiene precio.",
    author: "Carlos Rodríguez",
    role: "Usuario particular, Bogotá",
    initials: "CR",
    color: "bg-primary/20 text-primary",
  },
  {
    quote:
      "Pasamos de no saber dónde estaban nuestros 20 vehículos a tener control total. Redujimos costos de combustible un 15% en el primer trimestre.",
    author: "María González",
    role: "Gerente de Operaciones, Transportes del Valle",
    initials: "MG",
    color: "bg-secondary/20 text-secondary",
  },
  {
    quote:
      "La guantera digital me salvó de una multa. Me llegó la alerta del SOAT a punto de vencer y lo renové a tiempo. Pequeño detalle, gran impacto.",
    author: "Andrés Mejía",
    role: "Empresario independiente",
    initials: "AM",
    color: "bg-success/20 text-success",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonios"
      className="bg-background py-12 lg:py-16"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Contextual image — full width banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <figure
            className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-64 w-full sm:h-80"
            role="img"
            aria-label="Usuario verificando seguridad del vehículo desde la app"
          >
            <Image
              src="/v4/images/testimonials-new.png"
              alt="Usuario verificando seguridad del vehículo desde la app"
              fill
              className="object-cover"
            />
          </figure>
        </motion.div>

        {/* Heading */}
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
            id="testimonials-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Lo que dicen quienes ya viajan con Simon
          </motion.h2>
        </motion.div>

        {/* Cards */}
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
              {/* Stars */}
              <div className="mb-4 flex gap-1" aria-label="5 estrellas">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-grow text-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="mt-6 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shrink-0 ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>

              {/* Verified badge */}
              <div className="mt-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs text-success">
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  Cliente verificado
                </span>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
