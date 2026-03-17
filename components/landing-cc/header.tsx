"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Logo } from "@/components/landing/logo"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Download } from "lucide-react"

export function HeaderCC() {
  const [scrolled, setScrolled] = useState(false)
  const [pastPricing, setPastPricing] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const pricingEl = document.getElementById("cc-pricing")
      if (pricingEl) {
        setPastPricing(window.scrollY > pricingEl.offsetTop - 200)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const ctaLabel = pastPricing ? "Empezar ahora" : "Descarga gratis"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Navegación principal">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity rounded-lg focus-visible:outline-2 focus-visible:outline-primary" aria-label="Simon Movilidad — Inicio">
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Desktop: text link + CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="#cc-enterprise"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Para empresas
            </Link>
            <Link
              href="https://app.simonmovilidad.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </Link>

            {/* Persistent CTA — changes after pricing section */}
            <motion.a
              key={ctaLabel}
              href="https://play.google.com/store/apps/details?id=com.simonmovilidad"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold",
                "bg-primary text-primary-foreground transition-all duration-200",
                "hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(0,255,194,0.25)]",
                "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              )}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {ctaLabel}
            </motion.a>
          </div>

          {/* Mobile: CTA only */}
          <a
            href="https://play.google.com/store/apps/details?id=com.simonmovilidad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all lg:hidden"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Descargar
          </a>
        </nav>
      </div>
    </header>
  )
}
