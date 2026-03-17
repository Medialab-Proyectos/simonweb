"use client"

import { motion } from "framer-motion"

const steps = [
  {
    n: "1",
    heading: "Instalamos Simon en tu vehículo",
    body: "Sin modificar nada, en 30 minutos. Nuestro equipo va donde estés — casa, empresa o parqueadero.",
    note: "Instalación fácil",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/8",
    noteColor: "text-primary bg-primary/10",
  },
  {
    n: "2",
    heading: "Activas la app y tu vehículo aparece en el mapa",
    body: "Un proceso de 5 minutos. Tu vehículo, sus documentos y las alertas quedan configuradas desde el primer momento.",
    note: "Listo en minutos",
    color: "text-secondary",
    border: "border-secondary/30",
    bg: "bg-secondary/8",
    noteColor: "text-secondary bg-secondary/10",
  },
  {
    n: "3",
    heading: "Duermes tranquilo. Porque ya tienes control.",
    body: "Desde hoy recibes alertas, ves ubicaciones y sabes que nada importante va a pasar sin que te enteres.",
    note: "Control total",
    color: "text-success",
    border: "border-success/30",
    bg: "bg-success/8",
    noteColor: "text-success bg-success/10",
  },
]

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { visible: { transition: { staggerChildren: 0.14 } } }

export function JourneyCB() {
  return (
    <section
      id="cb-journey"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="cb-journey-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-muted-foreground tracking-widest uppercase mb-4">
            El camino
          </span>
          <h2
            id="cb-journey-heading"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            De cero a control total en tres pasos
          </h2>
          <p className="mt-4 text-muted-foreground max-w-sm mx-auto">
            El proceso más simple del mercado. Lo hacemos fácil porque creemos que la seguridad no debería ser complicada.
          </p>
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
              className="h-full bg-gradient-to-r from-primary/50 via-secondary/40 to-success/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
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
                {i < steps.length - 1 && (
                  <div className="absolute top-14 left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 to-transparent lg:hidden" aria-hidden="true" />
                )}

                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border ${s.border} ${s.bg}`}>
                  <span className={`text-2xl font-bold ${s.color}`}>{s.n}</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground leading-snug text-balance">{s.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-xs">{s.body}</p>

                <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${s.noteColor}`}>
                  {s.note}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
