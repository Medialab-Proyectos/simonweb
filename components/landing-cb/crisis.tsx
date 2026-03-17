"use client"

import { motion } from "framer-motion"

const pains = [
  {
    thought: `"¿Todavía estará donde lo parqueé?"`,
    noun: "Robo sin rastro",
    subtext: "Sin rastreo activo, si tu carro se mueve nadie te avisa. Lo sabes cuando ya es tarde.",
    color: "border-destructive/25 bg-destructive/4",
    thoughtColor: "text-destructive",
    nounBg: "bg-destructive/10 text-destructive",
  },
  {
    thought: `"Creo que el SOAT vence... ¿este mes o el otro?"`,
    noun: "Multa inesperada",
    subtext: "SOAT, RTM, seguro — documentos que viven en correos viejos y recordatorios que siempre fallan.",
    color: "border-warning/25 bg-warning/4",
    thoughtColor: "text-warning",
    nounBg: "bg-warning/10 text-warning",
  },
  {
    thought: `"Tengo 12 vehículos y no sé cuál está trabajando ahora mismo."`,
    noun: "Flota invisible",
    subtext: "Sin datos en tiempo real, gestionar una flota es adivinar. Y adivinar cuesta dinero.",
    color: "border-secondary/25 bg-secondary/4",
    thoughtColor: "text-secondary",
    nounBg: "bg-secondary/10 text-secondary",
  },
]

const fadeInUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export function CrisisCB() {
  return (
    <section
      id="cb-crisis"
      className="relative bg-[#080808] py-20 lg:py-28 overflow-hidden"
      aria-labelledby="cb-crisis-heading"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-destructive/3 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-muted-foreground tracking-widest uppercase"
          >
            El conflicto
          </motion.span>
          <motion.h2
            id="cb-crisis-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            ¿Te ha pasado alguna de estas?
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-muted-foreground max-w-md mx-auto">
            Si te suena familiar, no estás solo. Son los mismos tres problemas que enfrentan
            cientos de miles de conductores colombianos cada día.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-6 md:grid-cols-3"
        >
          {pains.map((p) => (
            <motion.div
              key={p.noun}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`relative rounded-2xl border p-7 cursor-default ${p.color}`}
            >
              {/* Internal monologue — first person voice */}
              <p className={`text-lg font-medium italic leading-snug mb-5 ${p.thoughtColor}`}>
                {p.thought}
              </p>

              {/* Outcome noun */}
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 ${p.nounBg}`}>
                {p.noun}
              </span>

              <p className="text-sm leading-relaxed text-muted-foreground">{p.subtext}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
