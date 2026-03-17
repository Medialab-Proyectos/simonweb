"use client"

import { motion } from "framer-motion"
import { GooglePlayButton, AppStoreButton } from "@/components/landing/store-buttons"
import { ContactForm } from "@/components/landing/contact-form"
import Image from "next/image"
import { CheckCircle2, Shield, Clock, Headphones, ArrowRight, Download, Building2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fadeInUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

const trustBadges = [
  { icon: Shield, text: "Sin compromiso" },
  { icon: Clock, text: "Respuesta ≤ 1h" },
  { icon: Headphones, text: "Soporte 24/7" },
]

export function FinalCTAV2() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-background py-24 lg:py-32"
      aria-labelledby="final-cta-v2-heading"
    >
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
            id="final-cta-v2-heading"
            variants={fadeInUp}
            className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            El siguiente paso{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00E5D1 0%, #19B5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              tarda 2 minutos.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground"
          >
            Sin formularios interminables. Sin esperas. Solo dinos cómo ayudarte y te contactamos de inmediato.
          </motion.p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">

          {/* ── Left: App Download (B2C) ── */}
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

            <p className="text-muted-foreground leading-relaxed mb-6">
              Descarga Simon y toma el control de tu vehículo. Monitorea, protege y gestiona desde tu celular.
              Disponible para Android e iOS.
            </p>

            <div className="flex flex-row flex-wrap gap-3 items-center mb-5">
              <GooglePlayButton />
              <AppStoreButton />
            </div>

            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
              Descarga inmediata. Sin configuraciones complejas.
            </p>

            {/* Social proof for B2C */}
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+44.000 vehículos</span>{" "}
                ya están activos en Colombia.
              </p>
            </div>

            <div className="mt-6 relative h-48 rounded-xl overflow-hidden border border-border">
              <Image
                src="/images/audience-personas-new.png"
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

          {/* ── Right: Enterprise Form (B2B) ── */}
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

            {/* WhatsApp link — alternative CTA */}
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>¿Prefieres hablar antes?</span>
              <Link
                href="https://wa.me/573105511862?text=Hola%2C+quiero+informaci%C3%B3n+sobre+Simon+para+mi+empresa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Escríbenos por WhatsApp
              </Link>
            </div>

            {/* Asesor strip — Simon brand icon (NOT photorealistic) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 flex items-center gap-4 rounded-2xl border border-primary/15 bg-card/80 p-4"
            >
              {/* Simon brand icon — no photorealistic avatar */}
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 border border-primary/30"
                aria-hidden="true"
              >
                <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
                  <rect x="8" y="14" width="16" height="13" rx="3" stroke="#00E5D1" strokeWidth="1.8" fill="none"/>
                  <path d="M11 14v-3a5 5 0 0 1 10 0v3" stroke="#00E5D1" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <circle cx="16" cy="21" r="2" fill="#00E5D1"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Asesor Simon — persona real</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  &ldquo;No soy un bot. Soy parte del equipo Simon y te ayudo a encontrar el plan ideal para tu flota.&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
