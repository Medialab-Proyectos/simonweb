"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Download, ArrowRight } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "@/components/landing/store-buttons"
import { ContactForm } from "@/components/landing/contact-form"
import { useSegment } from "@/components/landing/segment-context"
import Link from "next/link"

const fadeInUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function ConversionCTACA() {
  const { segment } = useSegment()

  return (
    <section
      id="demo"
      className="bg-background py-20 lg:py-28"
      aria-labelledby="ca-cta-heading"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {segment === "personas" ? (
          <motion.div
            key="personas-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col items-center text-center"
          >
            <motion.span variants={fadeInUp} className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary mb-4">
              Descarga Simon ahora
            </motion.span>
            <motion.h2
              id="ca-cta-heading"
              variants={fadeInUp}
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Tu vehículo protegido desde hoy
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-muted-foreground max-w-sm">
              Descarga gratuita. Instalación en 30 minutos. Sin permanencia.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-row flex-wrap gap-3 justify-center">
              <GooglePlayButton />
              <AppStoreButton />
            </motion.div>

            <motion.p variants={fadeInUp} className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              Desde $29.900/mes. Sin tarjeta de crédito para descargar.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 w-full flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 px-5 py-4"
            >
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              <p className="text-sm text-muted-foreground text-left">
                <span className="font-semibold text-foreground">+44.000 vehículos</span> activos en Colombia confían en Simon.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="empresas-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span variants={fadeInUp} className="inline-block rounded-full bg-secondary/10 px-4 py-1 text-sm text-secondary mb-4">
              Habla con el equipo de Simon
            </motion.span>
            <motion.h2
              id="ca-cta-heading"
              variants={fadeInUp}
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Una demo gratuita. Sin rodeos.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-muted-foreground">
              Completa el formulario y un asesor real te contacta en menos de 1 hora en días hábiles.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8">
              <ContactForm />
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-5 flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
              <span>¿Prefieres escribir?</span>
              <Link
                href="https://wa.me/573105511862?text=Hola%2C+quiero+una+demo+de+Simon+para+mi+flota"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                WhatsApp +57 310 5511862
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
