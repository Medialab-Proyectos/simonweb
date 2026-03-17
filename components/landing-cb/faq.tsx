"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

const faqs = [
  {
    q: "¿Simon es para mí si tengo un solo vehículo?",
    a: "Sí, absolutamente. Simon nació pensado para el conductor colombiano con un vehículo. Desde $29.900/mes tienes monitoreo 24/7, documentos centralizados y alertas de seguridad. No necesitas tener una flota para beneficiarte.",
  },
  {
    q: "¿Y si tengo dudas después de instalar?",
    a: "Nuestro equipo está disponible 24/7 por WhatsApp (+57 310 5511862), por teléfono y por chat. El tiempo promedio de respuesta es menor a 1 hora en horario hábil. No te dejamos solo después de la instalación.",
  },
  {
    q: "¿Qué pasa si me roban el vehículo?",
    a: "Con Simon activo recibes una alerta inmediata si el vehículo se mueve fuera de horario o abandona una geocerca. Puedes compartir la ubicación en tiempo real con las autoridades. La información registrada puede usarse como evidencia en la denuncia.",
  },
]

export function FAQCb() {
  return (
    <section className="bg-background py-16 lg:py-20" aria-labelledby="cb-faq-heading">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-muted-foreground tracking-widest uppercase mb-4">
            Las dudas
          </span>
          <h2 id="cb-faq-heading" className="text-2xl font-bold text-foreground">
            Resolvemos las últimas dudas
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-xl border border-border bg-card/50 p-4 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Un agente real responde en menos de 1 hora en horario hábil.{" "}
            <Link
              href="https://wa.me/573105511862?text=Hola%2C+tengo+una+pregunta+sobre+Simon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              WhatsApp +57 310 5511862
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
