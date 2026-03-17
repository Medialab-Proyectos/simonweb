"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Download } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "@/components/landing/store-buttons"

const included = [
  "Monitoreo GPS 24/7 en tiempo real",
  "Documentos del vehículo con alertas de vencimiento",
  "Geocercas y alertas de movimiento",
  "Historial de recorridos (90 días)",
  "Asistencias de movilidad*",
  "Soporte 24/7",
]

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function PricingCC() {
  return (
    <section
      id="cc-pricing"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="cc-pricing-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary mb-4">
            Precio y descarga
          </span>
          <h2 id="cc-pricing-heading" className="text-3xl font-bold text-foreground sm:text-4xl">
            Simple. Sin sorpresas.
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">

          {/* Left: Price block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="glass-card rounded-2xl p-8 border-primary/20"
          >
            {/* Price anchor — large type */}
            <motion.div variants={fadeInUp} className="mb-6">
              <p className="text-muted-foreground text-sm mb-1">Para personas · Un vehículo</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-primary tabular-nums">$29.900</span>
                <span className="text-muted-foreground mb-1">/mes</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Más el costo de instalación del dispositivo. Garantía de 12 meses incluida.
              </p>
            </motion.div>

            {/* What's included */}
            <motion.ul variants={stagger} className="space-y-2.5 mb-6" aria-label="Incluido en el plan">
              {included.map((item) => (
                <motion.li key={item} variants={fadeInUp} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" aria-hidden="true" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p variants={fadeInUp} className="text-xs text-muted-foreground border-t border-border pt-4">
              Sin permanencia. Cancela cuando quieras. *Asistencias sujetas a disponibilidad del prestador.
            </motion.p>
          </motion.div>

          {/* Right: Download CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-start gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Descarga Simon ahora</h3>
              <p className="text-muted-foreground leading-relaxed">
                Disponible para Android e iOS. Descarga inmediata, sin configuraciones complejas.
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-3">
              <GooglePlayButton />
              <AppStoreButton />
            </div>

            {/* QR hint for desktop visitors */}
            <div className="hidden lg:flex items-center gap-3 rounded-xl border border-border bg-card/50 px-4 py-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Download className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm text-muted-foreground">
                En tu celular: busca <span className="font-semibold text-foreground">"Simon Movilidad"</span> en Google Play o App Store.
              </p>
            </div>

            {/* Social proof at price stage */}
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+44.000 vehículos</span> activos en Colombia.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
