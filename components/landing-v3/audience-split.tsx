"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Car, Building2, CheckCircle2, ArrowRight, MessageCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import Image from "next/image"
import { useSegment } from "./segment-context"
import { useDemoModal } from "./demo-modal-context"
import Link from "next/link"
import { cn } from "@/lib/utils"

const segments = [
  {
    id: "personas" as const,
    icon: Car,
    title: "Para personas",
    tagline: "Descarga la app y protege tu vehículo desde el primer día.",
    benefits: [
      "Descarga inmediata — sin instalaciones complejas",
      "Tranquilidad: sabe siempre dónde está tu carro",
      "Documentos al día con alertas automáticas",
    ],
    image: {
      alt: "Persona usando la app Simon junto a su vehículo",
      src: "/images/audience-personas-new.png",
    },
    activeAccent: "border-primary/40 ring-2 ring-primary/20 shadow-lg shadow-primary/10",
    inactiveAccent: "border-border hover:border-primary/25 hover:shadow-md",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeBg: "bg-primary",
    badgeText: "text-primary-foreground",
    gradientFrom: "from-primary/8",
  },
  {
    id: "empresas" as const,
    icon: Building2,
    title: "Para empresas",
    tagline: "Agenda una demo y descubre cómo Simon optimiza tu operación.",
    benefits: [
      "Visibilidad operativa total de tu flota en tiempo real",
      "Reducción de costos de combustible y mantenimiento",
      "Trazabilidad, reportes y control en un solo panel",
    ],
    image: {
      alt: "Administrador de flota monitoreando vehículos desde la plataforma Simon",
      src: "/images/audience-empresas-new.png",
    },
    activeAccent: "border-secondary/40 ring-2 ring-secondary/20 shadow-lg shadow-secondary/10",
    inactiveAccent: "border-border hover:border-secondary/25 hover:shadow-md",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    badgeBg: "bg-secondary",
    badgeText: "text-white",
    gradientFrom: "from-secondary/8",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

export function AudienceSplit() {
  const { segment } = useSegment()
  const { open: openDemoModal } = useDemoModal()

  return (
    <section
      id="personas"
      className="bg-surface py-20 lg:py-28"
      aria-labelledby="audience-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2
            id="audience-heading"
            variants={fadeInUp}
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Soluciones diseñadas para ti
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto mt-4 max-w-md text-muted-foreground">
            Tanto si tienes un vehículo personal como si gestionas una flota empresarial.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 lg:grid-cols-2"
          id="empresas"
        >
          {segments.map((seg) => {
            const isActive = segment === seg.id
            return (
              <motion.div
                key={seg.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                  isActive ? seg.activeAccent : seg.inactiveAccent
                )}
              >
                {/* Active badge — pill style, visible and modern */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={cn(
                      "absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg",
                      seg.badgeBg, seg.badgeText
                    )}
                  >
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Tu perfil
                  </motion.div>
                )}

                {/* ── Contextual image with gradient overlay ── */}
                <div className="relative h-52 overflow-hidden rounded-t-2xl">
                  <figure
                    className="relative overflow-hidden h-full w-full rounded-none border-0 border-b border-border shadow-sm"
                    role="img"
                    aria-label={seg.image.alt}
                  >
                    <Image
                      src={seg.image.src}
                      alt={seg.image.alt}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient overlay at bottom for smooth transition to card */}
                    <div className={cn("absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent")} />
                  </figure>
                  {/* Icon badge over image */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={cn(
                      "absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg backdrop-blur-sm border border-white/10",
                      seg.iconBg
                    )}
                  >
                    <seg.icon className={cn("h-6 w-6", seg.iconColor)} aria-hidden="true" />
                  </motion.div>
                </div>

                {/* ── Card content ── */}
                <div className="flex flex-col p-7">
                  <h3 className="text-2xl font-bold text-foreground">{seg.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{seg.tagline}</p>

                  {/* Benefits */}
                  <ul className="mt-6 space-y-2.5" aria-label={`Beneficios ${seg.title}`}>
                    {seg.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="mt-8">
                    {seg.id === "personas" ? (
                      <div className="flex flex-row flex-wrap gap-3 items-center">
                        <GooglePlayButton />
                        <AppStoreButton />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2.5">
                        <Button
                          size="lg"
                          className="w-full justify-center bg-secondary text-white hover:opacity-90 group"
                          onClick={openDemoModal}
                        >
                          Agendar demo gratuita
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full justify-center border-border bg-transparent text-foreground hover:border-secondary/60 hover:bg-secondary/8"
                          asChild
                        >
                          <Link href="https://wa.me/573105511862" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                            WhatsApp
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
