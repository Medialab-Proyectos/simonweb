"use client"

import { motion } from "framer-motion"
import { Car, Eye, Zap, CheckCircle2, TrendingDown } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Car,
    title: "En menos de 30 minutos, tu vehículo está conectado",
    description:
      "Nuestro equipo instala el dispositivo sin modificar ninguna pieza. Sin curvas de aprendizaje. Sin configuraciones complejas.",
    color: "text-primary",
    bgColor: "bg-primary/8",
    borderColor: "border-primary/30",
    glowColor: "shadow-primary/10",
    chip: "Instalación fácil",
  },
  {
    step: "02",
    icon: Eye,
    title: "Visualiza en tiempo real desde la app o la web",
    description:
      "Ubicación exacta, alertas accionables, documentos y reportes. Toda la información que necesitas, en un solo lugar.",
    color: "text-secondary",
    bgColor: "bg-secondary/8",
    borderColor: "border-secondary/30",
    glowColor: "shadow-secondary/10",
    chip: "Datos en tiempo real",
  },
  {
    step: "03",
    icon: Zap,
    title: "Actúa antes de que el problema llegue a ti",
    description:
      "Alertas anticipadas, vencimientos notificados y KPIs operativos para que siempre vayas un paso adelante.",
    color: "text-success",
    bgColor: "bg-success/8",
    borderColor: "border-success/30",
    glowColor: "shadow-success/10",
    chip: "Control total",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export function HowItWorksV2() {
  return (
    <section
      id="como-funciona"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="how-it-works-v2-heading"
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
            Cómo funciona
          </motion.span>
          <motion.h2
            id="how-it-works-v2-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            De cero a control total en tres pasos
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-md text-muted-foreground"
          >
            El proceso más simple del mercado. Sin fricciones, sin excusas.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative mt-16"
        >
          {/* Desktop connector — amplified */}
          <div
            className="absolute top-12 left-[16.5%] right-[16.5%] hidden h-px lg:block overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary/60 via-secondary/70 to-success/60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex flex-col items-center text-center cursor-default"
              >
                <div className="relative z-10 mb-5">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border ${step.borderColor} ${step.bgColor} shadow-lg ${step.glowColor}`}
                  >
                    <step.icon className={`h-8 w-8 ${step.color}`} aria-hidden="true" />
                  </motion.div>
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg"
                  >
                    {step.step}
                  </motion.span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className="absolute top-16 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 to-transparent lg:hidden"
                    aria-hidden="true"
                  />
                )}

                <h3 className="text-xl font-semibold text-foreground leading-snug text-balance">{step.title}</h3>
                <p className="mt-2 max-w-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.2, type: "spring", stiffness: 400, damping: 15 }}
                  className="mt-4"
                >
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ${step.bgColor} ${step.color}`}>
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    {step.chip}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Result card — bottom proof element */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-4 rounded-2xl border border-success/20 bg-success/5 px-6 py-5 text-center max-w-2xl mx-auto"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/15">
            <TrendingDown className="h-5 w-5 text-success" aria-hidden="true" />
          </div>
          <p className="text-sm text-muted-foreground text-left">
            Empresas que usan Simon reportan una reducción promedio del{" "}
            <span className="font-semibold text-foreground">15% en costos de combustible</span>{" "}
            durante el primer trimestre de uso.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
