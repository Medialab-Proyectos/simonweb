"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const stories = [
  {
    initials: "CR",
    name: "Carlos Rodríguez",
    context: "Usuario particular · Bogotá",
    arc: {
      before: "Vivía con el miedo de parquear en la calle cuando viajaba por trabajo.",
      turning: "Una noche, Simon detectó movimiento alrededor del carro a las 2am.",
      after: "Lo pude mover a tiempo. Ese miedo ya no existe.",
    },
    result: "Tranquilidad 24/7",
    resultColor: "bg-primary/10 text-primary",
  },
  {
    initials: "MG",
    name: "María González",
    context: "Gerente de Operaciones · Transportes del Valle",
    arc: {
      before: "Teníamos 20 vehículos y dependíamos de llamadas para saber dónde estaban.",
      turning: "El primer mes con Simon tuvimos datos reales de consumo por vehículo.",
      after: "Redujimos costos de combustible un 15% en el primer trimestre.",
    },
    result: "−15% combustible",
    resultColor: "bg-success/10 text-success",
  },
  {
    initials: "AM",
    name: "Andrés Mejía",
    context: "Empresario independiente",
    arc: {
      before: "Siempre me enteraba de los documentos vencidos cuando ya era tarde.",
      turning: "Simon me avisó del SOAT 30 días antes de que venciera.",
      after: "Ahorré $500.000 en multas. Nunca más me pasa.",
    },
    result: "$500K ahorrados",
    resultColor: "bg-warning/10 text-warning",
  },
]

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export function TestimonialsCB() {
  return (
    <section
      id="cb-testimonials"
      className="bg-[#080808] py-20 lg:py-28"
      aria-labelledby="cb-testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-muted-foreground tracking-widest uppercase mb-4">
            La recompensa
          </span>
          <h2 id="cb-testimonials-heading" className="text-3xl font-bold text-foreground sm:text-4xl">
            Ellos ya dieron el paso
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Historias reales. Sin guiones.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {stories.map((s) => (
            <motion.figure
              key={s.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 cursor-default hover:border-primary/30 transition-colors"
            >
              {/* Verified */}
              <div className="mb-5 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                <span className="text-xs text-success font-medium">Cliente verificado</span>
              </div>

              {/* Narrative arc */}
              <div className="flex-grow space-y-3">
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  <span className="font-medium text-muted-foreground">Antes: </span>
                  {s.arc.before}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">El momento: </span>
                  {s.arc.turning}
                </p>
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {s.arc.after}
                </p>
              </div>

              {/* Result pill */}
              <div className="mt-5">
                <span className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${s.resultColor}`}>
                  {s.result}
                </span>
              </div>

              {/* Author */}
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 border border-primary/25 text-sm font-bold text-primary" aria-hidden="true">
                  {s.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.context}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
