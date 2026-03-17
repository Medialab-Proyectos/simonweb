"use client"

import { motion } from "framer-motion"
import { Building2, BarChart3, TrendingUp, Shield, ArrowRight, Zap } from "lucide-react"
import { ContactForm } from "@/components/landing/contact-form"
import Link from "next/link"

const promises = [
  { icon: BarChart3, text: "Dashboard en tiempo real — ve el estado de cada vehículo sin llamar a nadie" },
  { icon: TrendingUp, text: "−15% costos operativos — optimiza combustible, rutas y mantenimiento con datos" },
  { icon: Shield, text: "Trazabilidad completa — reportes de auditoría para cada vehículo de la flota" },
]

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function EnterpriseCC() {
  return (
    <section
      id="cc-enterprise"
      className="relative bg-background py-20 lg:py-28 overflow-hidden"
      aria-labelledby="cc-enterprise-heading"
    >
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[400px] w-[400px] bg-secondary/5 blur-[120px] rounded-full" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">

          {/* Left: value prop */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
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
              id="cc-enterprise-heading"
              variants={fadeInUp}
              className="mt-5 text-3xl font-bold text-foreground sm:text-4xl leading-tight text-balance"
            >
              Flotas que no monitorean gastan más de lo que creen
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-md"
            >
              Simon centraliza toda la operación en un dashboard. Menos suposiciones, menos costos, más control desde el día uno.
            </motion.p>

            {/* Data-backed promises */}
            <motion.ul variants={stagger} className="mt-8 space-y-4" aria-label="Beneficios para empresas">
              {promises.map((p) => (
                <motion.li
                  key={p.text}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                    <p.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{p.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Social proof */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center gap-3 rounded-xl border border-secondary/15 bg-secondary/5 px-4 py-3"
            >
              <Building2 className="h-5 w-5 text-secondary shrink-0" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+19K vehículos</span> en flotas activas confían en Simon.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: form + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-7 border-secondary/20">
              <h3 className="text-lg font-bold text-foreground mb-2">Agendar demo gratuita</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Un asesor real te contacta en menos de 1 hora en días hábiles.
              </p>

              <ContactForm />

              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <span>¿Prefieres hablar ahora?</span>
                <Link
                  href="https://wa.me/573105511862?text=Hola%2C+quiero+una+demo+para+mi+flota"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["Sin compromiso", "Respuesta ≤ 1h", "Soporte 24/7"].map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1 text-xs text-muted-foreground"
                  >
                    <Zap className="h-3 w-3 text-primary" aria-hidden="true" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
