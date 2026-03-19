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
    question: "¿Cuántos vehículos necesita mi empresa para contratar Simon?",
    answer:
      "Simon para empresas está disponible desde una sola unidad. Tenemos planes adaptados para flotas pequeñas, medianas y grandes. Escríbenos para recibir una propuesta personalizada según tu operación.",
  },
  {
    question: "¿El GPS funciona si el vehículo pierde señal de red?",
    answer:
      "Sí. El dispositivo almacena la ruta en memoria local cuando no hay cobertura. En cuanto el vehículo vuelve a zona con red, la trayectoria se sincroniza automáticamente en la app sin perder ningún punto del recorrido.",
  },
  {
    question: "¿Puedo compartir el acceso con mi familia o equipo?",
    answer:
      "Por supuesto. Puedes crear perfiles adicionales con distintos niveles de acceso. Los planes familiares permiten que varios miembros vean el vehículo desde sus propias cuentas; en planes empresariales puedes asignar roles por conductor, supervisor o administrador.",
  },
  {
    question: "¿Simon incluye asistencia en carretera?",
    answer:
      "Algunos planes incluyen cobertura de asistencia en carretera. Consulta los detalles de tu plan o escríbenos para conocer la cobertura disponible en tu zona.",
  },
  {
    question: "¿Cómo cancelo mi plan?",
    answer:
      "Puedes cancelar en cualquier momento desde la app o contactando a soporte. No hay cláusulas de permanencia en los planes mensuales. Para planes anuales, aplica la política de reembolso proporcional al tiempo restante.",
  },
  {
    question: "¿Cómo es el soporte de Simon?",
    answer:
      "Soporte real, disponible 24/7. Puedes contactarnos por WhatsApp al +57 310 5511862, llamar al 01 8000 189 890 (línea gratuita), marcar #230 o #280 desde tu celular, o usar el chat de la app. El tiempo promedio de respuesta es menor a 1 hora en horario hábil.",
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
    <section id="faq" className="bg-[#080808] py-20 lg:py-28" aria-labelledby="faq-heading">
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
            FAQ
          </motion.span>
          <motion.h2
            id="faq-heading"
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance"
          >
            Todo lo que necesitas saber antes de empezar
          </motion.h2>
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
