"use client"

import { motion } from "framer-motion"
import { Car, FileCheck, PiggyBank, LineChart, HeartHandshake } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "@/components/landing-v3/store-buttons"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const benefits = [
  {
    icon: FileCheck,
    title: "Todo en orden, sin esfuerzo.",
    description:
      "Centraliza, recibe alertas y mantén tu vehículo al día, sin perder tiempo ni preocuparte por vencimientos.",
  },
  {
    icon: PiggyBank,
    title: "Ahorro más en cada kilómetro.",
    description:
      "Con información en tiempo real, anticipas fallas, optimizas tu vehículo y tomas decisiones inteligentes que impactan directamente tu bolsillo.",
  },
  {
    icon: LineChart,
    title: "Decide con inteligencia.",
    description:
      "Datos en tiempo real para anticiparte, optimizar tu vehículo y tomar decisiones que realmente marcan la diferencia.",
  },
  {
    icon: HeartHandshake,
    title: "Conduce sin preocupaciones.",
    description:
      "Protección 24/7 y alertas en tiempo real para que siempre estés un paso adelante ante cualquier situación.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function PersonasSplit() {
  return (
    <section
      id="personas-section"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="personas-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] bg-primary/6 blur-[120px] rounded-full" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[350px] w-[350px] bg-secondary/5 blur-[100px] rounded-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: content ──────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="lg:order-1 order-2"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary"
            >
              <Car className="h-3.5 w-3.5" aria-hidden="true" />
              Para personas
            </motion.span>

            <motion.h2
              id="personas-heading"
              variants={fadeInUp}
              className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight text-balance"
            >
              Tu vehículo, bajo{" "}
              <span className="gradient-text">control total</span>.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-lg"
            >
              Información en tiempo real para monitorear, proteger y decidir mejor, siempre.
            </motion.p>

            {/* Benefits — desplegables */}
            <motion.div variants={fadeInUp} className="mt-8">
              <Accordion type="single" collapsible className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <AccordionItem
                    key={benefit.title}
                    value={`pillar-${idx}`}
                    className="rounded-xl border border-border/50 bg-white/[0.02] px-4 border-b-0 hover:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="py-3 text-left font-medium text-foreground hover:text-primary hover:no-underline">
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <benefit.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-semibold">{benefit.title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pl-12 text-xs leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* CTA — store buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-row flex-wrap gap-3 items-center"
            >
              <GooglePlayButton />
              <AppStoreButton />
            </motion.div>
          </motion.div>

          {/* ── Right: image ───────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative lg:order-2 order-1"
          >
            <div className="relative h-[380px] lg:h-[480px] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/audience-personas2.png"
                alt="Usuario controlando su vehículo desde la app Simon Movilidad"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>

            {/* Decorative shimmer border */}
            <div className="absolute -bottom-px left-8 right-8 h-px shimmer-border" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
