"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { User, Building2, Car, Mail, Phone, Send, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Zod schema ──────────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  company: z.string().min(2, "La empresa es requerida"),
  fleetSize: z.string().min(1, "Selecciona el tamaño de la flota"),
  email: z.string().email("Correo electrónico inválido"),
  whatsapp: z
    .string()
    .min(7, "Número de WhatsApp requerido")
    .regex(/^[+\d\s()-]+$/, "Número inválido"),
})

type FormValues = z.infer<typeof schema>

// ─── Shared input style ───────────────────────────────────────────────────────
const inputBase =
  "w-full rounded-xl border border-primary/25 bg-surface px-4 py-2.5 text-sm text-foreground " +
  "placeholder:text-muted-foreground outline-none transition-all " +
  "focus:border-primary focus:ring-2 focus:ring-primary/20"

// ─── Field wrapper ────────────────────────────────────────────────────────────
function FieldRow({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        <span className="ml-1 text-primary" aria-hidden="true">*</span>
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")
  const [submittedName, setSubmittedName] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    setStatus("loading")
    setSubmittedName(data.name)
    // TODO: connect to API/CRM
    await new Promise((r) => setTimeout(r, 1400))
    setStatus("success")
    reset()
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-card p-6 shadow-xl shadow-black/30">
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
              <p className="text-xl font-bold text-foreground">¡Solicitud enviada!</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Gracias,{" "}
                <strong className="text-foreground">{submittedName}</strong>. Un asesor
                te contactará en menos de 1 hora hábil. 🎉
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => setStatus("idle")}
            >
              Enviar otra solicitud
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-4 sm:grid-cols-2"
          >
            {/* Header */}
            <div className="sm:col-span-2 mb-1">
              <p className="text-base font-semibold text-foreground">Habla con un asesor</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sin compromiso · Respuesta en ≤ 1 h hábil
              </p>
            </div>

            {/* Nombre */}
            <FieldRow label="Nombre" id="cf-name" error={errors.name?.message}>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id="cf-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  {...register("name")}
                  className={cn(inputBase, "pl-10", errors.name && "border-destructive focus:border-destructive")}
                />
              </div>
            </FieldRow>

            {/* Empresa */}
            <FieldRow label="Empresa" id="cf-company" error={errors.company?.message}>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id="cf-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Nombre de la empresa"
                  {...register("company")}
                  className={cn(inputBase, "pl-10", errors.company && "border-destructive focus:border-destructive")}
                />
              </div>
            </FieldRow>

            {/* Tamaño de flota */}
            <FieldRow label="Tamaño de flota" id="cf-fleet" error={errors.fleetSize?.message}>
              <div className="relative">
                <Car className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <select
                  id="cf-fleet"
                  {...register("fleetSize")}
                  className={cn(inputBase, "pl-10 appearance-none", errors.fleetSize && "border-destructive")}
                >
                  <option value="">Seleccionar</option>
                  <option value="1-5">1 – 5 vehículos</option>
                  <option value="6-20">6 – 20 vehículos</option>
                  <option value="21-50">21 – 50 vehículos</option>
                  <option value="50+">Más de 50</option>
                </select>
              </div>
            </FieldRow>

            {/* Email */}
            <FieldRow label="Correo electrónico" id="cf-email" error={errors.email?.message}>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id="cf-email"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@empresa.com"
                  {...register("email")}
                  className={cn(inputBase, "pl-10", errors.email && "border-destructive focus:border-destructive")}
                />
              </div>
            </FieldRow>

            {/* WhatsApp — full width */}
            <div className="sm:col-span-2">
              <FieldRow label="WhatsApp" id="cf-whatsapp" error={errors.whatsapp?.message}>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <input
                    id="cf-whatsapp"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+57 300 000 0000"
                    {...register("whatsapp")}
                    className={cn(inputBase, "pl-10", errors.whatsapp && "border-destructive focus:border-destructive")}
                  />
                </div>
              </FieldRow>
            </div>

            {/* Privacy */}
            <p className="sm:col-span-2 text-xs text-muted-foreground">
              Al enviar aceptas nuestra{" "}
              <a href="/privacidad" className="underline hover:text-primary">
                política de privacidad
              </a>
              .
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

            {/* Trust signals */}
            <div className="sm:col-span-2 flex flex-wrap items-center justify-center gap-4 pt-1">
              {["Sin compromiso", "Demo 100% gratis", "Respuesta ≤ 1 h"].map((t) => (
                <span key={t} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-success shrink-0" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
