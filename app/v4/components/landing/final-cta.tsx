"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import { ContactForm } from "./contact-form"
import Image from "next/image"
import { CheckCircle2, Shield, Clock, Headphones, ArrowRight, Download, Building2, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const trustBadges = [
  { icon: Shield, text: "Sin compromiso" },
  { icon: Clock, text: "Respuesta ≤ 1h" },
  { icon: Headphones, text: "Soporte 24/7" },
]

export function FinalCTA() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-background py-24 lg:py-32"
      aria-labelledby="final-cta-heading"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/6 to-primary/12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-20 left-1/3 h-[32rem] w-[32rem] rounded-full bg-primary/15 blur-[80px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-1/4 h-[28rem] w-[28rem] rounded-full bg-secondary/12 blur-[80px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary"
          >
            Empieza hoy
          </motion.span>
          <motion.h2
            id="final-cta-heading"
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            Empieza hoy.{" "}
            <span className="gradient-text">Sin complicaciones.</span>
          </motion.h2>
        </motion.div>

        {/* Two columns: App Download + Enterprise Form */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">

          {/* ── Left: App Download ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 border-primary/20"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Para personas</h3>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Descarga Simon y toma el control de tu vehículo. Monitorea, protege y gestiona desde tu celular.
            </p>

            <div className="mb-4 space-y-1.5">
              {[
                "GPS activo en segundos",
                "Alertas al instante",
                "Documentos siempre a mano",
              ].map((item) => (
                <p key={item} className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start mb-4">
              <GooglePlayButton />
              <AppStoreButton className="opacity-80 scale-95" />
            </div>

            <p className="text-xs font-medium text-primary">
              +50.000 conductores en Colombia ya usan Simon
            </p>

            {/* Image */}
            <div className="mt-6 relative h-48 rounded-xl overflow-hidden border border-border">
              <Image
                src="/v4/images/companero-viaje.jpg"
                alt="Persona usando la app Simon en su vehículo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-3 left-3 glass-card rounded-lg px-3 py-1.5 flex items-center gap-2"
                aria-hidden="true"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <span className="text-xs font-medium text-foreground">Descarga gratuita</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: Enterprise Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15">
                <Building2 className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Para empresas</h3>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-5">
              Centraliza alertas, trazabilidad y operación en una sola plataforma diseñada para crecer con tu empresa.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {trustBadges.map((badge) => (
                <motion.div
                  key={badge.text}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 cursor-default"
                >
                  <badge.icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  <span className="text-xs font-medium text-foreground">{badge.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact form */}
            <ContactForm />

            <p className="mt-3 text-xs text-muted-foreground">
              ¿Prefieres llamarnos?{" "}
              <a href="tel:018000189890" className="text-primary font-medium hover:underline">
                01 8000 189 890
              </a>{" "}
              — línea gratuita
            </p>

            {/* R12: Demo video toggle */}
            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={() => setShowDemo((v) => !v)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                aria-expanded={showDemo}
              >
                {showDemo
                  ? <><X className="h-4 w-4" /> Cerrar video</>
                  : <><Play className="h-4 w-4" /> Ver demo en video</>
                }
              </button>
              <AnimatePresence>
                {showDemo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden rounded-xl border border-border"
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="w-full rounded-xl"
                      aria-label="Demo de monitoreo de flota Simon"
                    >
                      <source src="/v4/videos/services/monitoreo.mp4" type="video/mp4" />
                    </video>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simon character */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 flex items-center gap-4 rounded-2xl border border-primary/15 bg-card/80 p-4"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/v4/images/simon-avatar.jpg"
                  alt="Simón — Asesor de movilidad"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Simón, tu asesor</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  &ldquo;Te ayudo a encontrar la solución ideal para tu flota. ¡Completa el formulario y te contacto!&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
