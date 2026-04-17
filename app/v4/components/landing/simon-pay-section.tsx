"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wallet, Zap, Shield, CreditCard, CheckCircle2, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Zap,
    label: "Peajes Colpass",
    desc: "Paga tus peajes automáticamente sin efectivo ni filas en las vías de Colombia.",
  },
  {
    icon: Shield,
    label: "Seguros vehiculares",
    desc: "Gestiona y renueva tus seguros directamente desde la app. Sin intermediarios.",
  },
  {
    icon: CreditCard,
    label: "Servicios Simon",
    desc: "Paga tu suscripción, asistencias y más desde un solo lugar. Todo integrado.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function SimonPaySection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section
      id="simonpay"
      className="relative bg-background py-12 lg:py-16 overflow-hidden"
      aria-labelledby="simonpay-heading"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-secondary/8 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          {/* ── Left: content ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/20 px-4 py-1.5 text-sm text-secondary mb-6"
            >
              <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Simon Pay — Próximamente</span>
            </motion.div>

            <motion.h2
              id="simonpay-heading"
              variants={fadeInUp}
              className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
            >
              Todos tus pagos vehiculares{" "}
              <span className="gradient-text">en un solo lugar</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg leading-relaxed text-muted-foreground max-w-lg"
            >
              Paga peajes con Colpass, renueva seguros y gestiona todos tus servicios
              vehiculares sin efectivo ni múltiples apps.
            </motion.p>

            {/* Features */}
            <motion.div variants={stagger} className="mt-8 space-y-4">
              {features.map((f) => (
                <motion.div key={f.label} variants={fadeInUp} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/15">
                    <f.icon className="h-4 w-4 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{f.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: waitlist card ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-8 border-secondary/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 mb-5">
                <Wallet className="h-7 w-7 text-secondary" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-bold text-foreground">Únete a la lista de espera</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sé el primero en usar Simon Pay. Te avisamos antes que a nadie cuando esté disponible.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3" aria-label="Lista de espera Simon Pay">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-secondary/60 transition-colors"
                    aria-label="Correo electrónico para Simon Pay"
                  />
                  <button
                    type="submit"
                    disabled={!email.trim()}
                    className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-white hover:bg-secondary/90 disabled:opacity-40 transition-colors"
                  >
                    Notificarme cuando esté listo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-3 rounded-xl bg-success/10 border border-success/20 px-4 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">¡Listo!</span>{" "}
                    Te avisamos cuando Simon Pay esté disponible.
                  </p>
                </motion.div>
              )}

              <p className="mt-4 text-xs text-muted-foreground/60">
                Sin spam. Puedes darte de baja cuando quieras.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
