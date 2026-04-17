"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"
import Link from "next/link"

const COOKIE_KEY = "simon-cookies-consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6"
          role="dialog"
          aria-label="Aviso de cookies"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card shadow-2xl shadow-black/40 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Este sitio utiliza cookies
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Usamos cookies para mejorar tu experiencia de navegacion, analizar el trafico del
                  sitio y personalizar el contenido. Puedes aceptar todas, rechazar las no esenciales
                  o consultar nuestra{" "}
                  <Link
                    href="/cookies"
                    className="text-primary hover:underline font-medium"
                  >
                    Politica de Cookies
                  </Link>{" "}
                  para mas informacion.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={accept}
                    className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
                  >
                    Aceptar todas
                  </button>
                  <button
                    onClick={reject}
                    className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                  >
                    Solo esenciales
                  </button>
                </div>
              </div>

              <button
                onClick={reject}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Cerrar aviso de cookies"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
