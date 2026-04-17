"use client"

import { motion } from "framer-motion"
import { Car, Eye, Zap, CheckCircle2, ArrowRight, Download, CalendarCheck, Wrench, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSegment } from "./segment-context"

const stepsPersonas = [
  {
    step: "01",
    icon: Car,
    title: "Instalación en tu vehículo",
    description:
      "Un técnico certificado instala el dispositivo GPS sin modificar tu carro. Compatible con cualquier marca y modelo. Agendamos a tu conveniencia.",
    color: "text-primary",
    bgColor: "bg-primary/8",
    borderColor: "border-primary/30",
    glowColor: "shadow-primary/10",
    chip: "Instalación profesional",
  },
  {
    step: "02",
    icon: Eye,
    title: "Descarga Simon y activa",
    description:
      "Descarga la app, ingresa con tu cuenta y en segundos ves la ubicación exacta, alertas, documentos y el estado de tu vehículo.",
    color: "text-secondary",
    bgColor: "bg-secondary/8",
    borderColor: "border-secondary/30",
    glowColor: "shadow-secondary/10",
    chip: "Datos en tiempo real",
  },
  {
    step: "03",
    icon: Zap,
    title: "Control total desde el día uno",
    description:
      "Alertas instantáneas, documentos al día, asistencia en vía al #280 y reportes — todo desde tu celular, 24/7.",
    color: "text-success",
    bgColor: "bg-success/8",
    borderColor: "border-success/30",
    glowColor: "shadow-success/10",
    chip: "Control total",
  },
]

const stepsEmpresas = [
  {
    step: "01",
    icon: CalendarCheck,
    title: "Demo personalizada",
    description:
      "Agendamos una sesión de 30 minutos para entender tu operación, el tamaño de tu flota y los KPIs que más importan a tu negocio.",
    color: "text-primary",
    bgColor: "bg-primary/8",
    borderColor: "border-primary/30",
    glowColor: "shadow-primary/10",
    chip: "Sin compromiso",
  },
  {
    step: "02",
    icon: Wrench,
    title: "Instalación por fases",
    description:
      "Técnicos certificados instalan los dispositivos sin interrumpir tus operaciones. Flotas de hasta 50 vehículos listas en 1–3 días hábiles.",
    color: "text-secondary",
    bgColor: "bg-secondary/8",
    borderColor: "border-secondary/30",
    glowColor: "shadow-secondary/10",
    chip: "Sin detener la operación",
  },
  {
    step: "03",
    icon: LayoutDashboard,
    title: "Panel activo + soporte continuo",
    description:
      "Accede al dashboard web con toda tu flota en tiempo real. Onboarding guiado, integración con tus sistemas y soporte prioritario 24/7.",
    color: "text-success",
    bgColor: "bg-success/8",
    borderColor: "border-success/30",
    glowColor: "shadow-success/10",
    chip: "Soporte incluido",
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
  const { segment, setSegment } = useSegment()
  const steps = segment === "empresas" ? stepsEmpresas : stepsPersonas

  const handleCTA = () => {
    if (segment === "personas") {
      window.open("https://play.google.com/store/apps/details?id=com.simonmovilidad", "_blank")
    } else {
      setSegment("empresas")
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="como-funciona"
      className="py-12 lg:py-16"
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
            {segment === "empresas" ? "Implementación acompañada" : "Tres pasos para empezar"}
          </motion.span>
          <motion.h2
            id="how-it-works-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl"
          >
            {segment === "empresas"
              ? "De la demo al panel activo, sin interrumpir tu operación."
              : "Simple de instalar. Poderoso desde el día uno."}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-md text-muted-foreground"
          >
            {segment === "empresas"
              ? "Acompañamiento técnico en cada fase. Tu flota operando con Simon en 1 a 3 días hábiles."
              : "Sin configuraciones complejas. Sin curvas de aprendizaje."}
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
          {/* Desktop connector — animated gradient */}
          <div
            className="absolute top-12 left-[16.5%] right-[16.5%] hidden h-px lg:block overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary/40 via-secondary/50 to-success/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
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
                {/* Step number badge + icon */}
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

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-16 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 to-transparent lg:hidden"
                    aria-hidden="true"
                  />
                )}

                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 max-w-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Completion check — micro-interaction */}
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

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary group"
            onClick={handleCTA}
          >
            {segment === "personas" ? (
              <>
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Descargar Simon
              </>
            ) : (
              <>
                Agendar demo gratuita
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
