"use client"

import { motion } from "framer-motion"
import { Car, Eye, Zap } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Car,
    title: "Conecta tu vehículo o flota",
    description:
      "Instalamos el dispositivo en minutos, sin modificar tu vehículo. Compatible con cualquier tipo de automóvil.",
    visual: (
      /* Device illustration */
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/8">
        <Car className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>
    ),
  },
  {
    step: "02",
    icon: Eye,
    title: "Visualiza información clave",
    description:
      "Accede desde la app o web para ver ubicación, alertas, documentos y reportes en tiempo real.",
    visual: (
      /* App illustration */
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/8">
        <Eye className="h-8 w-8 text-secondary" aria-hidden="true" />
      </div>
    ),
  },
  {
    step: "03",
    icon: Zap,
    title: "Actúa con alertas y reportes",
    description:
      "Toma decisiones informadas con alertas, documentos y reportes centralizados para máximo control.",
    visual: (
      /* Action illustration */
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-success/30 bg-success/8">
        <Zap className="h-8 w-8 text-success" aria-hidden="true" />
      </div>
    ),
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-20 lg:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            Cómo funciona
          </motion.span>
          <motion.h2
            id="how-it-works-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Tres pasos para tener el control
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-md text-muted-foreground"
          >
            Sin configuraciones complejas. Sin curvas de aprendizaje.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative mt-16"
        >
          {/* Desktop connector */}
          <div
            className="absolute top-8 left-[16.5%] right-[16.5%] hidden h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number badge */}
                <div className="relative z-10 mb-5">
                  {step.visual}
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.step}
                  </span>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-16 left-1/2 h-10 w-px -translate-x-1/2 bg-primary/20 lg:hidden"
                    aria-hidden="true"
                  />
                )}

                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 max-w-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
