"use client"

import { motion } from "framer-motion"

const steps = [
  {
    n: "01",
    heading: "Instala el dispositivo en 30 minutos",
    body: "Nuestro equipo va donde estés. Sin modificar ninguna pieza. Compatible con cualquier vehículo.",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/8",
  },
  {
    n: "02",
    heading: "Activa la app y registra tu vehículo",
    body: "Descarga Simon, vincula el dispositivo y tu vehículo aparece en el mapa. Tarda menos de 5 minutos.",
    color: "text-secondary",
    border: "border-secondary/30",
    bg: "bg-secondary/8",
  },
  {
    n: "03",
    heading: "Monitorea, protege y gestiona desde hoy",
    body: "Alertas en tiempo real, documentos centralizados y reportes listos para usar desde el primer día.",
    color: "text-success",
    border: "border-success/30",
    bg: "bg-success/8",
  },
]

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { visible: { transition: { staggerChildren: 0.14 } } }

export function HowItWorksCA() {
  return (
    <section
      id="ca-steps"
      className="bg-[#080808] py-20 lg:py-28"
      aria-labelledby="ca-steps-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeInUp} className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
            Cómo funciona
          </motion.span>
          <motion.h2
            id="ca-steps-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            Empezar tarda menos de lo que crees
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="relative"
        >
          {/* Desktop connector */}
          <div
            className="absolute top-7 left-[calc(16.5%+28px)] right-[calc(16.5%+28px)] hidden h-px lg:block overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary/50 via-secondary/50 to-success/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center cursor-default"
              >
                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-14 left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 to-transparent lg:hidden"
                    aria-hidden="true"
                  />
                )}

                {/* Step number */}
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${s.border} ${s.bg}`}
                >
                  <span className={`text-xl font-bold tabular-nums ${s.color}`}>{s.n}</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground leading-snug text-balance">{s.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-xs">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
