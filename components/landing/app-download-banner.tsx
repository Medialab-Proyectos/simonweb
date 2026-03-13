"use client"

import { motion } from "framer-motion"
import { Smartphone, MapPin, Bell, FileText, CheckCircle2, Shield, Zap } from "lucide-react"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import Image from "next/image"

// ─── Phone screen features ────────────────────────────────────────────────────
const features = [
  { icon: MapPin,   label: "Rastreo en tiempo real", color: "text-primary" },
  { icon: Bell,     label: "Alertas inteligentes", color: "text-warning" },
  { icon: FileText, label: "Guantera digital", color: "text-secondary" },
  { icon: Shield,   label: "Seguridad 24/7", color: "text-success" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function AppDownloadBanner() {
  return (
    <section
      id="app"
      className="py-20 lg:py-28"
      aria-labelledby="app-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/6 via-card to-secondary/6 p-8 sm:p-12 lg:p-16">

          {/* Background glows */}
          <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-primary/15 blur-[90px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-secondary/12 blur-[90px]" aria-hidden="true" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">

            {/* Left: copy + buttons */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
              >
                Descarga la app
              </motion.span>

              <motion.h2
                id="app-heading"
                variants={fadeInUp}
                className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
              >
                Simon en tu bolsillo,{" "}
                <span className="gradient-text">siempre disponible</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="mt-4 text-lg text-muted-foreground"
              >
                Descarga Simon Movilidad y tendrás control total de tu vehículo o flota desde cualquier lugar, en cualquier momento.
              </motion.p>

              {/* Feature list with hover micro-interactions */}
              <motion.ul variants={stagger} className="mt-6 space-y-2.5" aria-label="Funciones principales">
                {features.map((f) => (
                  <motion.li
                    key={f.label}
                    variants={fadeInUp}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground cursor-default group"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <f.icon className={`h-4 w-4 ${f.color}`} aria-hidden="true" />
                    </div>
                    <span className="group-hover:text-foreground transition-colors">{f.label}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Store buttons */}
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-row flex-wrap gap-3 items-center"
              >
                <GooglePlayButton />
                <AppStoreButton />
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Descarga gratuita · Disponible para Android e iOS
              </motion.p>
            </motion.div>

            {/* Right: Simon character with phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex justify-center"
              aria-hidden="true"
            >
              <div className="relative w-72 h-[460px]">
                {/* Simon character as background */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src="/images/simon-character.png"
                    alt="Simón — Asistente de movilidad Simon"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                </div>

                {/* Floating badge — top right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="absolute -right-4 top-8 glass-card rounded-xl p-2.5 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <div className="absolute inset-0 h-2 w-2 rounded-full bg-success animate-ping opacity-30" />
                    </div>
                    <span className="text-xs text-foreground font-medium">En vivo</span>
                  </div>
                </motion.div>

                {/* Floating feature card — left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="absolute -left-8 top-1/3 glass-card rounded-xl p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">Alerta</p>
                      <p className="text-[10px] text-muted-foreground">SOAT vence en 5 días</p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom info card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 left-4 right-4 glass-card rounded-xl p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Simon App</p>
                      <p className="text-xs text-muted-foreground">Tu vehículo en tu bolsillo</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
