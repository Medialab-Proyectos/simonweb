"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowRight, MessageCircle } from "lucide-react"
import { useSegment } from "./segment-context"

const faqsPersonas = [
  {
    question: "¿Soy usuario de Finanzauto, cómo accedo a Simon?",
    answer:
      "Si tienes un vehículo financiado con Finanzauto, tu acceso a Simon ya está activado. Descarga la app, ingresa con el correo registrado y encontrarás la sección de Documentos del vehículo con tu SOAT, tecnomecánica y el estado de tu prenda. Si tienes dudas, escríbenos al WhatsApp +57 310 5511862.",
  },
  {
    question: "¿Cómo funciona el monitoreo vehicular en tiempo real?",
    answer:
      "Instalamos un dispositivo GPS discreto en tu vehículo que transmite su ubicación cada segundo. Puedes ver la posición exacta, velocidad y recorrido desde nuestra app o web, disponible 24/7.",
  },
  {
    question: "¿Qué incluye la sección de Documentos del vehículo?",
    answer:
      "Almacenas SOAT, tecnomecánica, seguro y más en un solo lugar accesible desde tu celular. Recibes alertas automáticas antes de los vencimientos para que nunca te sorprenda una multa. Puedes registrar varios vehículos de tu familia en la misma cuenta.",
  },
  {
    question: "¿Cómo solicito asistencia vial y cuánto tarda?",
    answer:
      "Desde la app presiona el botón de Asistencias y llama al #280 con un toque. También puedes marcar directamente #280 desde tu celular. Un agente humano te atiende de inmediato y coordina la asistencia — grúa, cerrajería o carro taller — según tu ubicación. La cobertura está sujeta a disponibilidad del prestador en tu zona.",
  },
  {
    question: "¿Cómo funcionan las geocercas?",
    answer:
      "Las geocercas son zonas virtuales que defines en el mapa. Cuando tu vehículo entra o sale, recibes una alerta instantánea. Son ideales para controlar rutas o saber cuándo tu familia llega a casa.",
  },
  {
    question: "¿Qué pasa si necesito soporte técnico?",
    answer:
      "Nuestro equipo está disponible 24/7 por WhatsApp, teléfono y chat. El tiempo promedio de respuesta es menor a 1 hora en horario hábil. Llama también al #230 o a la línea nacional 01 8000 189 890.",
  },
]

const faqsEmpresas = [
  {
    question: "¿Cuántos vehículos puedo gestionar desde Simon?",
    answer:
      "No hay límite. Simon escala desde 1 vehículo hasta cientos de unidades en múltiples ubicaciones. El panel de flota consolida todo en una sola vista con filtros por conductor, zona y estado.",
  },
  {
    question: "¿Qué reportes operativos incluye la plataforma?",
    answer:
      "Obtienes informes de recorridos, consumo de combustible, tiempo en ruta, paradas no autorizadas y KPIs de rendimiento. Todos exportables en PDF y Excel para integrar con tu contabilidad.",
  },
  {
    question: "¿Simon se integra con nuestros sistemas actuales?",
    answer:
      "Sí. Ofrecemos API REST y webhooks para conectar con ERP, TMS y plataformas de despacho. Nuestro equipo técnico acompaña la integración sin costo adicional en el plan empresarial.",
  },
  {
    question: "¿Cuánto tarda la implementación para una flota mediana?",
    answer:
      "Para flotas de hasta 50 vehículos, la instalación completa toma 1–3 días hábiles sin interrumpir tu operación. Para flotas mayores, diseñamos un cronograma por fases con acompañamiento técnico. Agenda una demo y te entregamos un plan detallado con tiempos exactos.",
  },
  {
    question: "¿Qué pasa si uno de mis vehículos necesita asistencia en vía?",
    answer:
      "El conductor llama directamente al #280 desde la app Simon con un solo toque. Un agente humano coordina la asistencia — grúa, cerrajería o carro taller — en la ubicación exacta del vehículo detectada por el GPS. La disponibilidad del prestador puede variar según la zona.",
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
  const { segment } = useSegment()
  const faqs = segment === "empresas" ? faqsEmpresas : faqsPersonas

  return (
    <section id="faq" className="bg-surface py-12 lg:py-16" aria-labelledby="faq-heading">
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
            {segment === "empresas"
              ? "Todo lo que necesitas saber para tu flota"
              : "Resolvemos tus dudas"}
          </motion.h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          key={segment}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-card px-5"
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

        {/* Escape CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-sm text-muted-foreground">¿No encontraste tu respuesta?</p>
          <a
            href="https://wa.me/573105511862?text=Tengo%20una%20pregunta%20sobre%20Simon%20Movilidad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Escríbenos por WhatsApp
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
