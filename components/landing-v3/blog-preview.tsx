"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    category: "Seguridad",
    title: "5 consejos para proteger tu vehículo del robo en Colombia",
    description:
      "Aprende las mejores prácticas para mantener tu carro seguro y cómo la tecnología puede ser tu aliada.",
    date: "12 Mar 2026",
    slug: "consejos-proteger-vehiculo",
  },
  {
    category: "Flotas",
    title: "Cómo reducir costos operativos en tu flota de vehículos",
    description:
      "Estrategias comprobadas para optimizar combustible, mantenimiento y productividad en tu operación.",
    date: "8 Mar 2026",
    slug: "reducir-costos-flota",
  },
  {
    category: "Movilidad",
    title: "El futuro de la movilidad inteligente en Colombia",
    description:
      "Descubre las tendencias que están transformando el transporte y la gestión vehicular en el país.",
    date: "1 Mar 2026",
    slug: "futuro-movilidad-colombia",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function BlogPreview() {
  return (
    <section id="noticias" className="py-12 lg:py-16" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.span
              variants={fadeInUp}
              className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary"
            >
              Blog
            </motion.span>
            <motion.h2
              id="blog-heading"
              variants={fadeInUp}
              className="mt-3 text-2xl font-bold text-foreground sm:text-3xl"
            >
              Recursos y novedades
            </motion.h2>
          </div>
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground cursor-default">
              Más artículos próximamente
            </span>
          </motion.div>
        </motion.div>

        {/* Articles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          {articles.map((article) => (
            <motion.article key={article.slug} variants={fadeInUp}>
              <div
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 cursor-default"
                aria-label={article.title}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {article.date}
                  </span>
                </div>
                <h3 className="flex-grow text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
