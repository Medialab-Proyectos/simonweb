"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cómo funciona el monitoreo vehicular en tiempo real?",
    answer:
      "Instalamos un dispositivo GPS discreto en tu vehículo que transmite su ubicación cada segundo. Puedes ver la posición exacta, velocidad y recorrido desde nuestra app o web, disponible 24/7.",
  },
  {
    question: "¿Qué documentos puedo guardar en Simon?",
    answer:
      "Almacenas SOAT, tecnomecánica, seguro y más en un solo lugar accesible desde tu celular. Recibes alertas automáticas antes de los vencimientos para que nunca te sorprenda una multa.",
  },
  {
    question: "¿Cuánto cuesta Simon?",
    answer:
      "Tenemos planes desde $29.900 COP/mes para personas con un vehículo. Para empresas el precio depende del tamaño de la flota. Escríbenos por WhatsApp al +57 310 5511862 o completa el formulario para recibir una propuesta personalizada.",
  },
  {
    question: "¿Cómo se instala el dispositivo GPS?",
    answer:
      "Nuestro equipo instala el dispositivo en tu vehículo en menos de 30 minutos, sin modificar ninguna pieza. Para flotas empresariales coordinamos la instalación en campo con nuestro equipo técnico. Una vez instalado, la app queda lista para usar.",
  },
  {
    question: "¿Simon funciona para vehículo particular y para empresas?",
    answer:
      "Sí. Tenemos soluciones para personas con un solo vehículo y para empresas con flotas de cualquier tamaño. La plataforma se adapta a cada caso con funcionalidades específicas.",
  },
  {
    question: "¿Cómo funcionan las geocercas?",
    answer:
      "Las geocercas son zonas virtuales que defines en el mapa. Cuando tu vehículo entra o sale, recibes una alerta instantánea. Son ideales para controlar rutas, detectar uso no autorizado o saber cuándo tu familia llega a casa.",
  },
  {
    question: "¿Qué pasa si me roban el vehículo?",
    answer:
      "Con Simon activo puedes compartir la ubicación en tiempo real con las autoridades. Además, recibes alertas inmediatas si el vehículo entra o sale de tus geocercas o si se detecta movimiento fuera de horario. La información registrada por Simon puede ser usada como evidencia en la denuncia.",
  },
  {
    question: "¿Puedo usar Simon si tengo vehículo de Finanzauto?",
    answer:
      "Sí. Simon es compatible con cualquier tipo de vehículo financiado o propio. El dispositivo se instala sin modificar ninguna pieza y sin invalidar garantías. Si tienes dudas sobre tu caso específico, escríbenos al +57 310 5511862.",
  },
  {
    question: "¿Qué pasa si necesito soporte?",
    answer:
      "Nuestro equipo está disponible 24/7 por WhatsApp, teléfono y chat. El tiempo promedio de respuesta es menor a 1 hora en horario hábil.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const stagger = { visible: { transition: { staggerChildren: 0.08 } } }

export function FAQSectionV2() {
  return (
    <section id="faq" className="bg-[#080808] py-20 lg:py-28" aria-labelledby="faq-v2-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
            FAQ
          </motion.span>
          <motion.h2
            id="faq-v2-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Preguntas frecuentes
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-md text-muted-foreground"
          >
            Todo lo que necesitas saber antes de empezar.
          </motion.p>
        </motion.div>

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
      </div>
    </section>
  )
}
