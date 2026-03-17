"use client"

import { motion } from "framer-motion"
import { Building2, ArrowRight, BarChart3, Shield, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const promises = [
  {
    icon: BarChart3,
    title: "Visibilidad total de la flota",
    description: "Dashboard centralizado — ve el estado de cada vehículo en tiempo real sin llamar a nadie.",
    metric: "−15% costos operativos",
  },
  {
    icon: TrendingUp,
    title: "Decisiones basadas en datos",
    description: "KPIs de combustible, rutas y mantenimiento para optimizar sin conjeturas.",
    metric: "+94% eficiencia reportada",
  },
  {
    icon: Shield,
    title: "Trazabilidad que protege",
    description: "Reportes detallados de cada vehículo para auditoría interna y cumplimiento regulatorio.",
    metric: "100% trazabilidad",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function AudienceSplitV2() {
  const handleScrollToContact = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="empresas-section"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-labelledby="b2b-v2-heading"
    >
      <div className="absolute inset-0 bg-[#080808]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] bg-secondary/6 blur-[120px] rounded-full" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[350px] w-[350px] bg-primary/5 blur-[100px] rounded-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: image + floating badge ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="relative h-[380px] lg:h-[480px] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/audience-empresas-new.png"
                alt="Administrador de flota monitoreando vehículos desde la plataforma Simon"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />

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
            <div className="absolute -bottom-px left-8 right-8 h-px shimmer-border" />
          </motion.div>

          {/* ── Right: B2B content ──────────────────────────────────── */}
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

            {/* Loss aversion opening — "cada día sin Simon..." */}
            <motion.h2
              id="b2b-v2-heading"
              variants={fadeInUp}
              className="mt-5 text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight text-balance"
            >
              Cada día sin datos es un día{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00E5D1 0%, #19B5FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                tomando decisiones a ciegas.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-lg"
            >
              Simon te da la información que necesitas para optimizar, reducir costos y escalar.
              Sin suposiciones. Sin llamadas. Sin sorpresas.
            </motion.p>

            {/* 3 data-backed promises */}
            <motion.div variants={stagger} className="mt-8 space-y-4">
              {promises.map((promise) => (
                <motion.div
                  key={promise.title}
                  variants={fadeInUp}
                  className="flex items-start gap-4 rounded-xl border border-border/50 bg-white/[0.02] p-4 hover:border-primary/30 transition-colors cursor-default group"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <promise.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-foreground">{promise.title}</h3>
                      <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-semibold text-success">
                        {promise.metric}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{promise.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Dual CTA */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-start gap-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary group"
                onClick={handleScrollToContact}
              >
                Agendar demo gratuita
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary"
                asChild
              >
                <Link
                  href="https://wa.me/573105511862?text=Hola%2C+quiero+informaci%C3%B3n+sobre+Simon+para+mi+flota"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablar con un asesor
                </Link>
              </Button>
            </motion.div>

            {/* Microcopy under CTA */}
            <motion.p variants={fadeInUp} className="mt-3 text-xs text-muted-foreground">
              <Zap className="inline h-3 w-3 mr-1 text-primary" aria-hidden="true" />
              Demo gratuita · Sin compromiso · Respuesta en menos de 1 hora
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
