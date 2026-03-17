"use client"

import { motion } from "framer-motion"
import { X, Check } from "lucide-react"

const rows = [
  {
    before: "Vas al trabajo sin saber si tu carro está donde lo dejaste",
    after: "Recibes una alerta si alguien lo mueve sin autorización",
  },
  {
    before: "Buscas el SOAT el día que te para la policía",
    after: "Tus documentos están en tu celular, siempre vigentes con alertas de vencimiento",
  },
  {
    before: "Tu flota trabaja y no sabes si está siendo rentable",
    after: "Ves el costo real por vehículo y por kilómetro, en tiempo real",
  },
  {
    before: "Tardas horas rastreando un vehículo de la flota por teléfono",
    after: "Lo ves en el mapa con un toque, 24/7, desde cualquier dispositivo",
  },
  {
    before: "Una multa llega porque el SOAT venció y nadie te avisó",
    after: "Simon te notifica 30 días antes de cada vencimiento",
  },
]

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { visible: { transition: { staggerChildren: 0.09 } } }

export function TransformationCB() {
  return (
    <section
      id="cb-transformation"
      className="bg-[#080808] py-20 lg:py-28"
      aria-labelledby="cb-transformation-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-muted-foreground tracking-widest uppercase mb-4">
            La transformación
          </span>
          <h2
            id="cb-transformation-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Así cambia todo con Simon
          </h2>
        </motion.div>

        {/* Column headers */}
        <div className="hidden sm:grid grid-cols-2 gap-4 mb-4 px-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground/60">
            <X className="h-4 w-4 text-destructive/60" aria-hidden="true" />
            Sin Simon
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Check className="h-4 w-4" aria-hidden="true" />
            Con Simon
          </div>
        </div>

        {/* Transformation rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="space-y-3"
        >
          {rows.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-2xl border border-border"
            >
              {/* Before */}
              <div className="flex items-start gap-3 bg-white/[0.015] px-5 py-4 sm:border-r border-border border-b sm:border-b-0">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/50" aria-hidden="true" />
                <p className="text-sm text-muted-foreground/70 leading-relaxed">{row.before}</p>
              </div>
              {/* After */}
              <div className="flex items-start gap-3 bg-primary/[0.03] px-5 py-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm text-foreground leading-relaxed">{row.after}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
