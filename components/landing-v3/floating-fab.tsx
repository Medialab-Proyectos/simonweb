"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Phone, MessageCircle, ChevronDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// ─── Constants ────────────────────────────────────────────────────────────────
const WA_NUMBER = "573105511862"
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=Hola%2C+me+interesa+Simon+Movilidad`
const CALL_URL  = "tel:018000189890"

// ─── Simon avatar ─────────────────────────────────────────────────────────────
function SimonAvatar({ size = 36 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative shrink-0 overflow-hidden rounded-full"
    >
      <Image
        src="/images/simon-character.png"
        alt="Simón — Asesor de Simon Movilidad"
        fill
        className="object-cover object-top"
        sizes={`${size}px`}
      />
    </div>
  )
}

// ─── Pulse dot ────────────────────────────────────────────────────────────────
function PulseDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
    </span>
  )
}

// ─── Chat types ───────────────────────────────────────────────────────────────
interface Message {
  id: string
  from: "bot" | "user"
  text: string
  time: string
}

const suggestions = [
  "Agendar demo flota",
  "Soporte GPS",
  "¿Cómo funciona Simon?",
  "Ver Simon Pay",
]

function getResponse(input: string): string {
  const q = input.toLowerCase()
  if (q.includes("agendar") || q.includes("demo"))
    return `¡Con mucho gusto! Completa el formulario en la sección "Empieza hoy" o escríbenos al WhatsApp ${WA_NUMBER}. Un asesor te contactará en menos de 1 hora hábil. 🚛`
  if (q.includes("soporte") || q.includes("gps"))
    return "Para soporte técnico GPS: verifica que el dispositivo no esté bloqueado, actualiza la app y ciérrala/ábrela. Si persiste, llama al #230 o escríbenos al WA. 🔧"
  if (q.includes("simon pay") || q.includes("billetera") || q.includes("pago"))
    return "¡Simon Pay llega muy pronto! 🎉 Será una billetera integrada para pagar peajes, seguros y servicios de movilidad. ¿Quieres que te avisemos? Escríbenos."
  if (q.includes("cómo funciona") || q.includes("como funciona"))
    return "¡Muy sencillo! Instalamos el dispositivo GPS, descargas la app Simon y listo: ubicación en tiempo real, alertas y documentos desde tu celular. 🚗"
  if (q.includes("precio") || q.includes("costo") || q.includes("cuánto"))
    return "Tenemos planes flexibles para personas y empresas. ¿Deseas que un asesor te contacte con los detalles? 😊"
  if (q.includes("empresa") || q.includes("flota"))
    return "Para empresas: visibilidad total, reportes de KPIs, alertas centralizadas y soporte prioritario. ¡Reducción de costos de combustible hasta 15%! ¿Agendamos una demo?"
  if (q.includes("soat") || q.includes("documento"))
    return "La sección de Documentos del vehículo te avisa automáticamente cuando tu SOAT o tecnomecánica están próximos a vencer. 📄✅"
  if (q.includes("hola") || q.includes("buenas") || q.includes("hi"))
    return "¡Hola! 👋 Soy Simón, tu asesor en la vía. ¿En qué te puedo ayudar hoy?"
  if (q.includes("gracias"))
    return "¡Con gusto! 😊 ¡Que tengas un excelente día en la vía!"
  return `Gracias por tu mensaje. Para atención personalizada escríbenos al WhatsApp +57 310 5511862 o llama al #230. ¡Te respondemos rápido! 🙌`
}

function nowTime() {
  return new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
}

// ─── Speed dial actions ────────────────────────────────────────────────────────
const dialActions = [
  {
    id: "chat",
    label: "Chat con Simón",
    icon: null, // uses SimonAvatar
    bg: "bg-card border border-primary/30",
    iconColor: "",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: WA_URL,
    icon: MessageCircle,
    bg: "bg-[#25D366]",
    iconColor: "text-white",
  },
  {
    id: "llamar",
    label: "Llamar #230",
    href: CALL_URL,
    icon: Phone,
    bg: "bg-secondary",
    iconColor: "text-white",
  },
]

// ─── Main component ────────────────────────────────────────────────────────────
export function FloatingFab() {
  const [isDialOpen,    setIsDialOpen]    = useState(false)
  const [isChatOpen,    setIsChatOpen]    = useState(false)
  const [hasUnread,     setHasUnread]     = useState(false)
  const [showTooltip,   setShowTooltip]   = useState(false)

  // Muestra el tooltip una sola vez, 3s después de cargar, durante 6s
  useEffect(() => {
    const show = setTimeout(() => setShowTooltip(true), 3000)
    const hide = setTimeout(() => setShowTooltip(false), 9000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])
  const [messages,   setMessages]     = useState<Message[]>([
    {
      id: "welcome",
      from: "bot",
      text: "¡Hola! Soy el asistente virtual de Simon Movilidad. Para hablar con un asesor real, usa el botón de WhatsApp 👆 ¿En qué te puedo orientar?",
      time: nowTime(),
    },
  ])
  const [input,     setInput]     = useState("")
  const [isTyping,  setIsTyping]  = useState(false)
  const endRef   = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    if (isChatOpen) {
      setHasUnread(false)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isChatOpen])

  const openChat = () => {
    setIsChatOpen(true)
    setIsDialOpen(false)
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now().toString(), from: "user", text, time: nowTime() }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), from: "bot", text: getResponse(text), time: nowTime() },
      ])
    }, 900 + Math.random() * 600)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ── Chat panel ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50"
            role="dialog"
            aria-label="Chat con Simón"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-primary/15 to-secondary/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative overflow-hidden rounded-full ring-2 ring-primary/30">
                  <SimonAvatar size={40} />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Asistente Simon</p>
                  <div className="flex items-center gap-1.5">
                    <PulseDot />
                    <p className="text-xs text-muted-foreground">Virtual · Asesor humano vía WhatsApp</p>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setIsChatOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 overflow-y-auto p-4 h-64 bg-background">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, delay: index === messages.length - 1 ? 0.05 : 0 }}
                  className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.from === "bot" && (
                    <div className="shrink-0 overflow-hidden rounded-full ring-1 ring-primary/20">
                      <SimonAvatar size={28} />
                    </div>
                  )}
                  <div>
                    <div
                      className={cn(
                        "max-w-[220px] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        msg.from === "bot"
                          ? "rounded-bl-sm bg-card text-foreground"
                          : "rounded-br-sm bg-primary text-primary-foreground"
                      )}
                    >
                      {msg.text}
                    </div>
                    <p className={`mt-1 text-[10px] text-muted-foreground ${msg.from === "user" ? "text-right" : ""}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2">
                  <div className="shrink-0 overflow-hidden rounded-full ring-1 ring-primary/20">
                    <SimonAvatar size={28} />
                  </div>
                  <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-background border-t border-border scrollbar-none">
              {suggestions.map((s) => (
                <motion.button
                  key={s}
                  onClick={() => sendMessage(s)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {s}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                aria-label="Escribe tu mensaje"
              />
              <motion.button
                type="submit"
                disabled={!input.trim()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Speed dial actions ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isDialOpen && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3"
          >
            {dialActions.map((action, i) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 16, scale: 0.85 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.85 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 22 }}
                className="flex items-center gap-3"
              >
                {/* Label */}
                <motion.span
                  className="rounded-lg bg-card border border-border px-3 py-1.5 text-xs font-medium text-foreground shadow-lg shadow-black/20"
                  whileHover={{ scale: 1.05 }}
                >
                  {action.label}
                </motion.span>

                {/* Button */}
                {action.id === "chat" ? (
                  <motion.button
                    onClick={openChat}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full shadow-lg",
                      action.bg
                    )}
                    aria-label="Abrir chat con Simón"
                  >
                    <SimonAvatar size={34} />
                  </motion.button>
                ) : (
                  <motion.a
                    href={action.href}
                    target={action.id === "whatsapp" ? "_blank" : undefined}
                    rel={action.id === "whatsapp" ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full shadow-lg",
                      action.bg
                    )}
                    aria-label={action.label}
                  >
                    {action.icon && <action.icon className={cn("h-5 w-5", action.iconColor)} aria-hidden="true" />}
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main FAB toggle ──────────────────────────────────────────────── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          if (isChatOpen) {
            setIsChatOpen(false)
          } else {
            setIsDialOpen((v) => !v)
          }
        }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-card border-2 border-border shadow-xl shadow-black/30 hover:border-primary/50 transition-colors"
        aria-label={isChatOpen ? "Cerrar chat" : isDialOpen ? "Cerrar contacto" : "Contactar a Simon"}
        aria-expanded={isDialOpen || isChatOpen}
      >
        <AnimatePresence mode="wait">
          {isChatOpen || isDialOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-5 w-5 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden rounded-full"
            >
              <SimonAvatar size={46} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isDialOpen && !isChatOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-lg ring-2 ring-card"
            aria-hidden="true"
          >
            !
          </motion.span>
        )}
      </motion.button>

      {/* Tooltip de bienvenida — aparece una sola vez durante 6s */}
      <AnimatePresence>
        {!isDialOpen && !isChatOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-[86px] right-[84px] z-50 rounded-xl bg-card border border-border px-3 py-2 shadow-lg max-w-[190px]"
            aria-hidden="true"
          >
            <p className="text-xs text-foreground">
              💬 ¿Preguntas? <strong className="text-primary">Escríbenos</strong> o usa el chat.
            </p>
            <div className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-card border-r border-t border-border" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
