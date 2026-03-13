"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, ChevronDown } from "lucide-react"

// ─── Simon avatar SVG ─────────────────────────────────────────────────────────
function SimonAvatar({ size = 36 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Background circle */}
            <circle cx="32" cy="32" r="32" fill="#0B1320" />

            {/* Shirt / body */}
            <path d="M10 64 Q14 52 22 49 L32 54 L42 49 Q50 52 54 64Z" fill="#00E5D1" />

            {/* Neck */}
            <rect x="27" y="42" width="10" height="8" rx="4" fill="#F5C8A0" />

            {/* Head */}
            <ellipse cx="32" cy="30" rx="15" ry="16" fill="#F5C8A0" />

            {/* Hair */}
            <path d="M17 26 Q18 12 32 12 Q46 12 47 26 Q44 18 32 18 Q20 18 17 26Z" fill="#2C1A0E" />
            {/* Side hair */}
            <rect x="16" y="25" width="4" height="10" rx="2" fill="#2C1A0E" />
            <rect x="44" y="25" width="4" height="10" rx="2" fill="#2C1A0E" />

            {/* Eyebrows */}
            <path d="M22 25 Q26 23 29 25" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M35 25 Q38 23 42 25" stroke="#2C1A0E" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            <ellipse cx="26" cy="29" rx="3" ry="3.5" fill="white" />
            <ellipse cx="38" cy="29" rx="3" ry="3.5" fill="white" />
            {/* Irises */}
            <circle cx="26.5" cy="30" r="2" fill="#00A896" />
            <circle cx="38.5" cy="30" r="2" fill="#00A896" />
            {/* Pupils */}
            <circle cx="26.8" cy="30.3" r="1" fill="#050505" />
            <circle cx="38.8" cy="30.3" r="1" fill="#050505" />
            {/* Eye shine */}
            <circle cx="27.4" cy="29.2" r="0.5" fill="white" />
            <circle cx="39.4" cy="29.2" r="0.5" fill="white" />

            {/* Nose */}
            <path d="M32 31 Q30 35 29 36 Q32 37.5 35 36 Q34 35 32 31Z" fill="#E8A87C" />

            {/* Smile */}
            <path d="M26 39.5 Q32 44 38 39.5" stroke="#C47A5A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Teeth hint */}
            <path d="M27.5 40 Q32 43 36.5 40" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" />

            {/* Headset mic dot — subtle Simon brand detail */}
            <circle cx="18" cy="32" r="2.5" fill="#00E5D1" opacity="0.9" />
            <rect x="18" y="27" width="1.5" height="5" rx="0.75" fill="#00E5D1" opacity="0.7" />
        </svg>
    )
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
    id: string
    from: "bot" | "user"
    text: string
    time: string
}

// ─── Suggested quick replies ──────────────────────────────────────────────────
const suggestions = [
    "Agendar demo flota",
    "Soporte GPS",
    "Ver beneficios Simon Pay",
    "¿Cómo funciona Simon?",
]

// ─── Auto-responses ───────────────────────────────────────────────────────────
function getResponse(input: string): string {
    const q = input.toLowerCase()

    if (q.includes("agendar demo") || q.includes("demo flota")) {
        return "¡Con mucho gusto! Para agendar tu demo de flota, completa el formulario en la sección 'Empieza hoy' o escríbenos directamente al +57 300 123 4567. Un asesor especializado en flotas te contactará en menos de 1 hora hábil. 🚛"
    }
    if (q.includes("soporte gps") || (q.includes("soporte") && q.includes("gps"))) {
        return "Para soporte técnico GPS estoy aquí. Los problemas más comunes son: señal débil (verifica que el dispositivo no esté bloqueado), actualización de app (actualiza a la última versión) o sincronización (cierra y abre la app). Si el problema persiste, escríbenos al +57 300 123 4567. ¿Cuál es tu situación? 🔧"
    }
    if (q.includes("simon pay") || q.includes("beneficios simon pay") || q.includes("pago") || q.includes("billetera")) {
        return "¡Simon Pay está llegando muy pronto! 🎉 Será una billetera integrada que te permitirá pagar peajes, seguros y servicios de movilidad en un solo lugar, directamente desde la app Simon. ¿Quieres que te avisemos cuando esté disponible? Déjanos tu correo."
    }
    if (q.includes("cómo funciona") || q.includes("como funciona")) {
        return "¡Es muy sencillo! Descargas la app Simon, conectas tu dispositivo GPS al vehículo y listo. Desde la app puedes ver la ubicación en tiempo real, recibir alertas y gestionar tus documentos. 🚗"
    }
    if (q.includes("precio") || q.includes("costo") || q.includes("cuánto")) {
        return "Tenemos planes flexibles para personas y empresas. El plan básico comienza desde $29.900 COP/mes. ¿Deseas que un asesor te contacte con los detalles? 😊"
    }
    if (q.includes("empresa") || q.includes("flota")) {
        return "Para empresas ofrecemos visibilidad total de la flota en tiempo real, reportes de KPIs, alertas centralizadas y soporte prioritario. ¡Muchos clientes reducen sus costos de combustible hasta un 15%! ¿Agendamos una demo?"
    }
    if (q.includes("app") || q.includes("incluye") || q.includes("funciones")) {
        return "La app Simon incluye: 📍 Rastreo GPS en tiempo real · 🔔 Alertas inteligentes · 📄 Guantera digital (SOAT, Tecno, documentos) · 📊 Historial de rutas · 🔒 Geocercas de seguridad."
    }
    if (q.includes("demo") || q.includes("probar")) {
        return "¡Perfecto! Puedes agendar tu demo gratuita sin compromiso. Completa el formulario en la sección 'Empieza hoy' o escríbenos por WhatsApp al +57 300 123 4567. Te responderemos en menos de 1 hora hábil. ✅"
    }
    if (q.includes("soat") || q.includes("document") || q.includes("guantera")) {
        return "La guantera digital de Simon te avisa automáticamente cuando tu SOAT o revisión técnico-mecánica están próximos a vencer. Nunca más olvides un documento importante. 📄✅"
    }
    if (q.includes("gps") || q.includes("ubicación") || q.includes("rastreo")) {
        return "El rastreo satelital 24/7 de Simon es en tiempo real, con actualización cada pocos segundos. Puedes ver la ubicación exacta de tu vehículo desde tu celular en cualquier momento. 📍"
    }
    if (q.includes("hola") || q.includes("buenas") || q.includes("hi")) {
        return "¡Hola! 👋 Soy Simón, tu asistente en la vía. ¿En qué te puedo ayudar hoy para optimizar tu movilidad?"
    }
    if (q.includes("gracias")) {
        return "¡Con gusto! 😊 Si tienes más preguntas, aquí estaré. ¡Que tengas un excelente día en la vía!"
    }

    return "Gracias por tu mensaje. Para atención personalizada puedes escribirnos por WhatsApp al +57 300 123 4567 o completar el formulario de demo. ¡Te respondemos rápidamente! 🙌"
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function nowTime() {
    return new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            from: "bot",
            text: "Hola, soy Simón, tu asistente en la vía. ¿En qué puedo ayudarte hoy para optimizar tu movilidad?",
            time: nowTime(),
        },
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [hasUnread, setHasUnread] = useState(true)
    const endRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Scroll to bottom on new message
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setHasUnread(false)
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [isOpen])

    const sendMessage = (text: string) => {
        if (!text.trim()) return
        const userMsg: Message = { id: Date.now().toString(), from: "user", text, time: nowTime() }
        setMessages((prev) => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        setTimeout(() => {
            setIsTyping(false)
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                from: "bot",
                text: getResponse(text),
                time: nowTime(),
            }
            setMessages((prev) => [...prev, botMsg])
        }, 900 + Math.random() * 600)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    return (
        <>
            {/* ── Panel ──────────────────────────────────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50"
                        role="dialog"
                        aria-label="Asistente virtual Simon"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between gap-3 bg-primary/10 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-hidden ring-2 ring-primary/30">
                                    <SimonAvatar size={36} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">Simón</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                                        <p className="text-xs text-muted-foreground">Tu asistente en la vía</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                aria-label="Cerrar chat"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex flex-col gap-3 overflow-y-auto p-4 h-72 bg-background">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    {msg.from === "bot" && (
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full overflow-hidden ring-1 ring-primary/20">
                                            <SimonAvatar size={28} />
                                        </div>
                                    )}
                                    <div>
                                        <div
                                            className={`max-w-[230px] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.from === "bot"
                                                ? "rounded-bl-sm bg-card text-foreground"
                                                : "rounded-br-sm bg-primary text-primary-foreground"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        <p className={`mt-1 text-[10px] text-muted-foreground ${msg.from === "user" ? "text-right" : ""}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex items-end gap-2">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full overflow-hidden ring-1 ring-primary/20">
                                        <SimonAvatar size={28} />
                                    </div>
                                    <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-3">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <span
                                                    key={i}
                                                    className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                                                    style={{ animation: `bounce 1s ${i * 0.2}s infinite` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Quick replies */}
                        <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-background border-t border-border scrollbar-none">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => sendMessage(s)}
                                    className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5">
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu mensaje..."
                                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                aria-label="Escribe tu mensaje"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary-hover transition-colors"
                                aria-label="Enviar mensaje"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Toggle button ───────────────────────────────────────────────── */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsOpen((v) => !v)}
                className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-card border border-border shadow-xl shadow-black/30 hover:border-primary/50 transition-colors"
                aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente"}
                aria-expanded={isOpen}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                            <ChevronDown className="h-5 w-5 text-foreground" />
                        </motion.div>
                    ) : (
                        <motion.div key="logo" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
                            <SimonAvatar size={38} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Unread badge */}
                {hasUnread && !isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                        1
                    </span>
                )}
            </motion.button>

            <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
        </>
    )
}
