"use client"

import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export function ProductShowcase() {
  return (
    <section className="py-12 lg:py-16" aria-labelledby="showcase-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
          >
            El producto
          </motion.span>
          <motion.h2
            id="showcase-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Así se ve Simon en tu día a día
          </motion.h2>
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <figure className="relative overflow-hidden rounded-2xl border border-border shadow-sm h-64 w-full sm:h-80">
            <video
              src="/videos/hero-bg.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              aria-label="Simon Movilidad en acción"
            />
          </figure>
        </motion.div>
      </div>
    </section>
  )
}
