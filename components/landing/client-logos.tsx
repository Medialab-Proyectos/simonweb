"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Client list ──────────────────────────────────────────────────────────────
const clients = [
  { name: "Finanzauto",      logo: "/logos/finanzauto.png" },
  { name: "Carfiao",         logo: "/logos/carfiao.png" },
  { name: "Banco Finandina", logo: "/logos/finandina.png" },
  { name: "Equirent",        logo: "/logos/equirent.png" },
  { name: "Dongfeng",        logo: "/logos/dongfeng.png" },
  { name: "Confirmeza",      logo: "/logos/confirmeza.png" },
]

// Double for seamless loop
const doubled = [...clients, ...clients]

export function ClientLogos() {
  return (
    <section
      id="clientes"
      className="bg-[#080808] py-12"
      aria-label="Clientes que confían en Simon"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground"
        >
          Confían en Simon
        </motion.p>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

          <div className="marquee-track flex w-max gap-6">
            {doubled.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-xl border border-border/50 px-6 py-3",
                  "grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:border-primary/30"
                )}
              >
                {/* Real client logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-8 w-auto max-w-[110px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-xs text-muted-foreground/60"
        >
          Empresas líderes del sector automotriz y financiero de Colombia.
        </motion.p>
      </div>
    </section>
  )
}
