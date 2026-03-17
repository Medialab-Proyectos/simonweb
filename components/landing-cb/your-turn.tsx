"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Download, ArrowRight } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "@/components/landing/store-buttons"
import { ContactForm } from "@/components/landing/contact-form"
import Link from "next/link"

const fadeInUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export function YourTurnCB() {
  return (
    <section
      id="demo"
      className="relative bg-background py-24 lg:py-32 overflow-hidden"
      aria-labelledby="cb-yourturn-heading"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-primary/12 blur-[90px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeInUp} className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-muted-foreground tracking-widest uppercase mb-4">
            Tu turno
          </motion.span>
          <motion.h2
            id="cb-yourturn-heading"
            variants={fadeInUp}
            className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            ¿Cuál es tu historia?
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-5 text-lg text-muted-foreground max-w-lg mx-auto">
            Miles de conductores colombianos ya tomaron el control. Hoy puede ser tu primer día sin incertidumbre.
          </motion.p>
        </motion.div>

        {/* Two narrative paths */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">

          {/* Path 1: Personas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 border-primary/20 flex flex-col gap-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Camino A</p>
              <h3 className="text-xl font-bold text-foreground">
                "Quiero proteger mi vehículo"
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                Descarga Simon ahora. Tu vehículo queda monitoreado desde el momento en que instalamos el dispositivo.
              </p>
            </div>

            <div className="flex flex-row flex-wrap gap-3">
              <GooglePlayButton />
              <AppStoreButton />
            </div>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" aria-hidden="true" />
              Desde $29.900/mes · Sin tarjeta de crédito para descargar
            </p>
          </motion.div>

          {/* Path 2: Empresas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Camino B</p>
              <h3 className="text-xl font-bold text-foreground">
                "Quiero optimizar mi flota"
              </h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                Cuéntanos cuántos vehículos tienes y te preparamos una demo personalizada. Sin compromiso.
              </p>
            </div>

            <ContactForm />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>¿Prefieres hablar antes?</span>
              <Link
                href="https://wa.me/573105511862?text=Hola%2C+quiero+optimizar+mi+flota+con+Simon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                Hablar por WhatsApp
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
