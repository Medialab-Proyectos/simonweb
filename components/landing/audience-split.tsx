"use client"

import { motion } from "framer-motion"
import { Building2, CheckCircle2, ArrowRight, BarChart3, Shield, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useDemoModal } from "@/components/landing-v3/demo-modal-context"

const benefits = [
  {
    icon: BarChart3,
    title: "Visibilidad operativa total",
    description: "Dashboard centralizado con el estado de toda tu flota en tiempo real.",
  },
  {
    icon: TrendingUp,
    title: "Reducción de costos",
    description: "Optimiza combustible, mantenimiento y rutas con datos accionables.",
  },
  {
    icon: Shield,
    title: "Trazabilidad completa",
    description: "Reportes detallados de cada vehículo para auditoría y control.",
  },
  {
    icon: Zap,
    title: "Decisiones en tiempo real",
    description: "Alertas instantáneas y KPIs operativos para actuar al momento.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function AudienceSplit() {
  const { open: openDemoModal } = useDemoModal()

  return (
    <section
      id="empresas-section"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="b2b-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] bg-secondary/6 blur-[120px] rounded-full" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[350px] w-[350px] bg-primary/5 blur-[100px] rounded-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: image + floating badge ───────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            {/* Image */}
            <div className="relative h-[380px] lg:h-[480px] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/audience-empresas-new.png"
                alt="Administrador de flota monitoreando vehículos desde la plataforma Simon"
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

              {/* Floating stats badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-6 left-6 glass-card rounded-xl px-4 py-3 flex items-center gap-3"
                aria-hidden="true"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">+19K vehículos</p>
                  <p className="text-[11px] text-muted-foreground">en flotas activas</p>
                </div>
              </motion.div>
            </div>

            {/* Decorative shimmer border */}
            <div className="absolute -bottom-px left-8 right-8 h-px shimmer-border" />
          </motion.div>

          {/* ── Right: B2B content ─────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/20 px-4 py-1.5 text-sm text-secondary"
            >
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              Simon para Empresas
            </motion.span>

            <motion.h2
              id="b2b-heading"
              variants={fadeInUp}
              className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight text-balance"
            >
              Rentabilidad y control{" "}
              <span className="gradient-text">para tu flota</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-lg"
            >
              Desde flotas de 1 vehículo hasta operaciones de cientos de unidades. Sin complicaciones, con datos reales.
            </motion.p>

            {/* Benefits grid */}
            <motion.div
              variants={stagger}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-white/[0.02] p-4 hover:border-primary/30 transition-colors cursor-default group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <benefit.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{benefit.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="mt-10">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary group"
                onClick={openDemoModal}
              >
                Agendar demo gratuita
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
