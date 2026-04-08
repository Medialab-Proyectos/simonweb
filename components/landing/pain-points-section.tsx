"use client"

import { motion } from "framer-motion"
import { AlertTriangle, ArrowDown } from "lucide-react"
import { useSegment } from "./segment-context"

const painPointsPersonas = [
  "Tu vehículo sale y no sabes si llegó bien",
  "El SOAT vence y te das cuenta cuando ya es tarde",
  "Si algo pasa en la vía, no tienes cómo pedir ayuda rápido",
  "Los documentos del carro siempre están en el lugar equivocado",
  "¿Alguien usó tu carro sin avisarte? Nunca lo sabrías",
]

const painPointsEmpresas = [
  "No sabes cuántos vehículos están en ruta ahora mismo",
  "El combustible se gasta pero la trazabilidad no cuadra",
  "Un conductor se desvía y nadie recibe alerta",
  "Los reportes llegan tarde y con errores",
  "La operación depende de llamadas, no de datos",
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

export function PainPointsSection() {
  const { segment } = useSegment()
  const points = segment === "empresas" ? painPointsEmpresas : painPointsPersonas

  return (
    <section
      id="dolores"
      className="relative bg-background py-12 lg:py-16 overflow-hidden"
      aria-labelledby="pain-heading"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-destructive/4 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block rounded-full bg-destructive/10 border border-destructive/20 px-4 py-1.5 text-sm text-destructive"
          >
            ¿Te suena familiar?
          </motion.span>

          <motion.h2
            id="pain-heading"
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Cada día sin control es un riesgo{" "}
            <span className="text-destructive/80">que no deberías asumir</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            {segment === "empresas"
              ? "Operar sin visibilidad en tiempo real cuesta más de lo que crees."
              : "La mayoría de problemas con vehículos se pueden prevenir. El problema es no saber a tiempo."}
          </motion.p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 space-y-3"
          aria-label="Problemas comunes sin Simon"
        >
          {points.map((point) => (
            <motion.li
              key={point}
              variants={fadeInUp}
              className="flex items-start gap-3 rounded-xl border border-border/60 bg-white/[0.02] px-5 py-4 hover:border-destructive/20 transition-colors"
            >
              <AlertTriangle
                className="h-4 w-4 shrink-0 mt-0.5 text-destructive/70"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-muted-foreground">{point}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Transition prompt */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-2 text-center"
        >
          <p className="text-sm font-medium text-primary">Así Simon resuelve esto</p>
          <ArrowDown className="h-4 w-4 text-primary animate-bounce" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  )
}
