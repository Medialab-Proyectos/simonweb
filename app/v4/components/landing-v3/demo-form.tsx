"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    X,
    CheckCircle2,
    Building2,
    User,
    Phone,
    Mail,
    Car,
    Send,
    Loader2,
    Users,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useDemoModal } from "./demo-modal-context"

// ─── Form state ───────────────────────────────────────────────────────────────
interface FormData {
    name: string
    email: string
    phone: string
    company: string
    fleetSize: string
    message: string
}

const initialForm: FormData = {
    name: "",
    email: "",
    phone: "",
    company: "",
    fleetSize: "",
    message: "",
}

const inputClass =
    "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"

function Field({
    label,
    htmlFor,
    required,
    children,
}: {
    label: string
    htmlFor: string
    required?: boolean
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
                {label}
                {required && <span className="ml-1 text-primary" aria-hidden="true">*</span>}
            </label>
            {children}
        </div>
    )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function DemoModal() {
    const { isOpen, close } = useDemoModal()
    const [form, setForm] = useState<FormData>(initialForm)
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
    const firstInputRef = useRef<HTMLInputElement>(null)

    // Focus trap & close on Escape
    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
        window.addEventListener("keydown", onKey)
        setTimeout(() => firstInputRef.current?.focus(), 120)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen, close])

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    const set = (field: keyof FormData, value: string) => {
        setForm((p) => ({ ...p, [field]: value }))
        if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }))
    }

    const validate = () => {
        const e: Partial<Record<keyof FormData, string>> = {}
        if (!form.name.trim()) e.name = "El nombre es requerido"
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido"
        if (!form.phone.trim()) e.phone = "El teléfono es requerido"
        if (!form.company.trim()) e.company = "La empresa es requerida"
        return e
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setStatus("loading")
        await new Promise((r) => setTimeout(r, 1400))
        setStatus("success")
    }

    const handleClose = () => {
        close()
        setTimeout(() => { setForm(initialForm); setErrors({}); setStatus("idle") }, 300)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
                        onClick={handleClose}
                        aria-hidden="true"
                    />

                    {/* Panel */}
                    <motion.div
                        key="panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="demo-modal-title"
                        initial={{ opacity: 0, scale: 0.95, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 24 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="fixed inset-x-4 top-[50%] z-[61] mx-auto max-w-3xl -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/60"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex">

                            {/* ── Left: image panel (desktop only) ── */}
                            <div className="relative hidden md:flex md:w-[42%] flex-col justify-end overflow-hidden bg-card">
                                <Image
                                    src="/v4/images/audience-empresas-new.png"
                                    alt="Flota de vehículos monitoreada desde Simon"
                                    fill
                                    className="object-cover opacity-70"
                                />
                                {/* gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                {/* Trust copy over image */}
                                <div className="relative z-10 p-7 pb-8">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                                        Simon para Empresas
                                    </p>
                                    <p className="text-xl font-bold leading-snug text-white mb-5">
                                        Visibilidad total de tu flota en tiempo real
                                    </p>
                                    <ul className="space-y-2.5">
                                        {[
                                            "Demo personalizada · sin compromiso",
                                            "Respuesta en menos de 1 hora hábil",
                                            "+19 000 vehículos monitoreados",
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* ── Right: form panel ── */}
                            <div className="flex flex-1 flex-col">

                                {/* Header stripe */}
                                <div className="flex items-center justify-between gap-3 border-b border-border bg-primary/8 px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                                            <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <p id="demo-modal-title" className="font-semibold text-foreground">
                                                Agenda una demo gratuita
                                            </p>
                                            <p className="text-xs text-muted-foreground">Sin compromiso · 100% gratuita</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                        aria-label="Cerrar"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="max-h-[70vh] overflow-y-auto p-5">
                                    <AnimatePresence mode="wait">
                                        {status === "success" ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center gap-5 py-8 text-center"
                                            >
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                                                    <CheckCircle2 className="h-8 w-8 text-success" />
                                                </div>
                                                <div>
                                                    <p className="text-xl font-bold text-foreground">¡Solicitud recibida!</p>
                                                    <p className="mt-2 text-muted-foreground">
                                                        Gracias, <strong className="text-foreground">{form.name}</strong>. Un asesor de Simon te contactará a{" "}
                                                        <strong className="text-foreground">{form.email}</strong> en menos de 1 hora hábil. 🎉
                                                    </p>
                                                </div>
                                                <Button
                                                    className="bg-primary text-primary-foreground hover:bg-primary-hover"
                                                    onClick={handleClose}
                                                >
                                                    Cerrar
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <motion.form
                                                key="form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                onSubmit={handleSubmit}
                                                noValidate
                                                className="grid gap-4 sm:grid-cols-2"
                                            >
                                                {/* Name */}
                                                <Field label="Nombre completo" htmlFor="dm-name" required>
                                                    <div className="relative">
                                                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                                                        <input
                                                            id="dm-name"
                                                            ref={firstInputRef}
                                                            type="text"
                                                            autoComplete="name"
                                                            placeholder="Tu nombre"
                                                            value={form.name}
                                                            onChange={(e) => set("name", e.target.value)}
                                                            className={`${inputClass} pl-10`}
                                                        />
                                                    </div>
                                                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                                                </Field>

                                                {/* Company */}
                                                <Field label="Empresa" htmlFor="dm-company" required>
                                                    <div className="relative">
                                                        <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                                                        <input
                                                            id="dm-company"
                                                            type="text"
                                                            autoComplete="organization"
                                                            placeholder="Nombre de la empresa"
                                                            value={form.company}
                                                            onChange={(e) => set("company", e.target.value)}
                                                            className={`${inputClass} pl-10`}
                                                        />
                                                    </div>
                                                    {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
                                                </Field>

                                                {/* Email */}
                                                <Field label="Correo electrónico" htmlFor="dm-email" required>
                                                    <div className="relative">
                                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                                                        <input
                                                            id="dm-email"
                                                            type="email"
                                                            autoComplete="email"
                                                            placeholder="correo@empresa.com"
                                                            value={form.email}
                                                            onChange={(e) => set("email", e.target.value)}
                                                            className={`${inputClass} pl-10`}
                                                        />
                                                    </div>
                                                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                                                </Field>

                                                {/* Phone */}
                                                <Field label="Teléfono / WhatsApp" htmlFor="dm-phone" required>
                                                    <div className="relative">
                                                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                                                        <input
                                                            id="dm-phone"
                                                            type="tel"
                                                            autoComplete="tel"
                                                            placeholder="+57 300 000 0000"
                                                            value={form.phone}
                                                            onChange={(e) => set("phone", e.target.value)}
                                                            className={`${inputClass} pl-10`}
                                                        />
                                                    </div>
                                                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                                                </Field>

                                                {/* Fleet size */}
                                                <Field label="Tamaño de la flota" htmlFor="dm-fleet">
                                                    <div className="relative">
                                                        <Car className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                                                        <select
                                                            id="dm-fleet"
                                                            value={form.fleetSize}
                                                            onChange={(e) => set("fleetSize", e.target.value)}
                                                            className={`${inputClass} pl-10 appearance-none`}
                                                        >
                                                            <option value="">Seleccionar</option>
                                                            <option value="1-5">1 – 5 vehículos</option>
                                                            <option value="6-20">6 – 20 vehículos</option>
                                                            <option value="21-50">21 – 50 vehículos</option>
                                                            <option value="50+">Más de 50</option>
                                                        </select>
                                                    </div>
                                                </Field>

                                                {/* Role */}
                                                <Field label="Tu cargo" htmlFor="dm-role">
                                                    <div className="relative">
                                                        <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                                                        <select
                                                            id="dm-role"
                                                            className={`${inputClass} pl-10 appearance-none`}
                                                            defaultValue=""
                                                        >
                                                            <option value="">Seleccionar</option>
                                                            <option value="owner">Dueño / Gerente</option>
                                                            <option value="ops">Jefe de operaciones</option>
                                                            <option value="admin">Administrativo</option>
                                                            <option value="it">TI / Tecnología</option>
                                                            <option value="other">Otro</option>
                                                        </select>
                                                    </div>
                                                </Field>

                                                {/* Message */}
                                                <div className="sm:col-span-2">
                                                    <Field label="¿Qué desafío quieres resolver?" htmlFor="dm-message">
                                                        <textarea
                                                            id="dm-message"
                                                            rows={3}
                                                            placeholder="Cuéntanos sobre tu operación, retos actuales o lo que buscas mejorar…"
                                                            value={form.message}
                                                            onChange={(e) => set("message", e.target.value)}
                                                            className={`${inputClass} resize-none`}
                                                        />
                                                    </Field>
                                                </div>

                                                {/* Privacy */}
                                                <p className="sm:col-span-2 text-xs text-muted-foreground">
                                                    Al enviar aceptas nuestra{" "}
                                                    <a href="/privacidad" className="underline hover:text-primary">política de privacidad</a>.
                                                </p>

                                                {/* Submit */}
                                                <div className="sm:col-span-2">
                                                    <Button
                                                        type="submit"
                                                        disabled={status === "loading"}
                                                        className="w-full bg-primary text-primary-foreground hover:bg-primary-hover glow-primary py-3 text-base"
                                                    >
                                                        {status === "loading" ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                                                                Enviando…
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                                                                Solicitar demo gratuita
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Footer trust */}
                                {status !== "success" && (
                                    <div className="flex items-center justify-center gap-4 border-t border-border bg-surface px-5 py-3">
                                        {["Sin compromiso", "Respuesta ≤ 1 h hábil", "Demo 100% gratis"].map((t) => (
                                            <span key={t} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                                <CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" />
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
