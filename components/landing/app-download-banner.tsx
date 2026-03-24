"use client"

import { motion } from "framer-motion"
import { MapPin, Bell, FileText, CheckCircle2, Shield } from "lucide-react"
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
      className="bg-background py-20 lg:py-28"
      aria-labelledby="app-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/6 via-card to-secondary/6 px-8 pt-4 pb-0 sm:px-12 sm:pt-6 lg:px-16 lg:pt-8">

          {/* Background glows */}
          <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-primary/15 blur-[90px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-secondary/12 blur-[90px]" aria-hidden="true" />

          <div className="relative grid items-end gap-12 lg:grid-cols-2">

            {/* Left: Simon avatar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex items-end justify-start"
              aria-hidden="true"
            >
              <div className="relative h-[560px] w-full">
                <Image
                  src="/images/simon-avatar-corregido.jpg"
                  alt="Simón — Asistente de movilidad Simon"
                  fill
                  className="object-contain object-bottom"
                  style={{ mixBlendMode: "screen" }}
                  sizes="(max-width: 1024px) 50vw, 600px"
                />
              </div>
            </motion.div>

            {/* Right: copy + buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
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
                className="mt-4 mb-8 flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                Descarga gratuita · Disponible para Android e iOS
              </motion.p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
