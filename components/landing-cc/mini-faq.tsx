"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

// 3 objection handlers — focused on price/commitment stage doubts
const faqs = [
  {
    q: "¿Cuánto cuesta instalar el dispositivo?",
    a: "El dispositivo tiene un cargo de instalación adicional al plan mensual. Nuestro equipo te da el valor exacto al solicitar la demo o al contactarnos por WhatsApp, ya que puede variar por ciudad y tipo de vehículo. El plan mensual desde $29.900 cubre el monitoreo y todos los servicios de la plataforma.",
  },
  {
    q: "¿Funciona en cualquier tipo de vehículo?",
    a: "Sí. Simon es compatible con automóviles, camionetas, motos, vehículos de carga y flota empresarial de cualquier marca y modelo. No importa el año ni si el vehículo está financiado — la instalación no modifica ninguna pieza y no invalida garantías.",
  },
  {
    q: "¿Qué pasa si quiero cancelar?",
    a: "No hay permanencia. Puedes cancelar cuando quieras sin penalizaciones. El dispositivo permanece en el vehículo desactivado, o puedes solicitar su retiro con un costo de visita técnica. Sin letras pequeñas ni compromisos ocultos.",
  },
]

export function MiniFAQCC() {
  return (
    <section className="bg-background py-16" aria-labelledby="cc-faq-heading">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 id="cc-faq-heading" className="text-xl font-semibold text-foreground">
            Últimas dudas resueltas
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`cc-faq-${i}`}
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

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿Otra duda?{" "}
          <Link
            href="https://wa.me/573105511862"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            +57 310 5511862
          </Link>
          {" "}· Lunes a viernes 8am–6pm
        </p>
      </div>
    </section>
  )
}
