"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cómo puedo comunicarme con Simon Movilidad?",
    answer:
      "Contamos con diferentes canales de contacto: Telefónico — Línea nacional: 01 8000 189 890, Bogotá: 601 390 6972, Móvil: #230 (Movistar, Claro y Tigo). Whatsapp: 310 5511862. Correo electrónico: servicioalcliente@simonmovilidad.com.",
  },
  {
    question: "¿Dónde puedo descargar la App para mis dispositivos móviles?",
    answer:
      "La App de Simon Movilidad la puedes encontrar en dispositivos Android y iOS, disponible en Google Play y App Store.",
  },
  {
    question: "¿Cómo puedo ingresar al portal web de Simon movilidad?",
    answer:
      "Podrás acceder a la plataforma a través del siguiente link: https://www.simonmovilidad.com/app/login",
  },
  {
    question: "¿Cómo puedo ingresar a la App y qué puedo encontrar en la misma?",
    answer:
      "Debes descargar la aplicación Simon Movilidad en tu celular e ingresar con tus credenciales de acceso. Desde la App podrás conocer la ubicación del vehículo, guantera digital, geocercas, reportes de recorrido e información clave de tu vehículo.",
  },
  {
    question: "¿Cada cuánto se actualiza la ubicación de mi vehículo?",
    answer:
      "Cuando el vehículo se encuentra en movimiento reporta cada minuto y cuando el vehículo se encuentra apagado genera reporte cada dos horas.",
  },
  {
    question: "¿Se puede abrir la aplicación Simon Movilidad desde varios dispositivos?",
    answer:
      "Sí, nuestra aplicación permite el ingreso e interacción desde diferentes dispositivos al mismo tiempo.",
  },
  {
    question: "¿Cómo consulto el historial y recorrido de mi vehículo?",
    answer:
      "Debes ingresar con tus credenciales de acceso a nuestra página web y al ingresar encontrarás la sección de 'Reportes' para realizar la consulta.",
  },
  {
    question: "¿Qué es una Geocerca y cómo funciona?",
    answer:
      "Con el servicio de geo-cerca podrás definir un perímetro en el mapa para que se genere una notificación vía mensaje de texto una vez el vehículo ingrese o salga de la zona previamente definida.",
  },
  {
    question: "¿Para qué funciona la guantera digital en Simon Movilidad?",
    answer:
      "La guantera digital de Simon Movilidad te permite almacenar y consultar documentos como el SOAT, la revisión técnico-mecánica y la licencia de conducción, de forma segura desde la app o el portal web.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

export function FAQSection() {
  return (
    <section id="faq" className="bg-background py-12 lg:py-16" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
            Preguntas frecuentes
          </motion.span>
          <motion.h2
            id="faq-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Centro de ayuda Simon{" "}
            <span className="gradient-text">Movilidad</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-base text-muted-foreground"
          >
            Resolvemos tus dudas para que te muevas con tranquilidad. Encuentra aquí preguntas y respuestas sobre el uso de la app y tu servicio.
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card px-5 border-b-0"
              >
                <AccordionTrigger className="py-4 text-left font-medium text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          ¿Tienes otra pregunta?{" "}
          <Link
            href="https://wa.me/573105511862?text=Hola%2C+tengo+una+pregunta+sobre+Simon+Movilidad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Escríbenos por WhatsApp →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
