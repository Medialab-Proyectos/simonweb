"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "+44k", label: "Vehículos activos" },
  { value: "24/7", label: "Monitoreo continuo" },
  { value: "100%", label: "Cobertura nacional" },
  { value: "< 1h", label: "Tiempo de respuesta" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function TrustBar() {
  return (
    <section
      className="relative border-y border-border bg-surface py-12"
      aria-label="Métricas de confianza"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex flex-col items-center gap-1 text-center"
            >
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Tecnología aplicada a seguridad, operación y control diario.
        </motion.p>
      </div>
    </section>
  )
}
