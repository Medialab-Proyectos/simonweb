"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

const faqs = [
  {
    q: "¿Cuánto cuesta Simon?",
    a: "Desde $29.900 COP/mes para personas con un vehículo. Para flotas, el precio depende del número de vehículos. Escríbenos y te enviamos una propuesta en menos de 1 hora.",
  },
  {
    q: "¿Cómo se instala el dispositivo GPS?",
    a: "Nuestro equipo instala el dispositivo en tu vehículo en menos de 30 minutos, sin modificar ninguna pieza. Una vez instalado, la app queda lista para usar.",
  },
  {
    q: "¿Funciona en cualquier vehículo?",
    a: "Sí. Simon es compatible con cualquier tipo de automóvil, camioneta, moto o vehículo de carga. No importa el modelo ni el año.",
  },
]

export function MiniFAQCA() {
  return (
    <section className="bg-[#080808] py-16 lg:py-20" aria-labelledby="ca-faq-heading">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 id="ca-faq-heading" className="text-xl font-semibold text-foreground">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-5 border-b-0"
              >
                <AccordionTrigger className="py-4 text-left font-medium text-foreground hover:text-primary hover:no-underline text-sm">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          ¿Tienes otra pregunta?{" "}
          <Link
            href="https://wa.me/573105511862?text=Hola%2C+tengo+una+pregunta+sobre+Simon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Escríbenos por WhatsApp
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
