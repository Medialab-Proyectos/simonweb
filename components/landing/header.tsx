"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Logo } from "./logo"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#soluciones",      label: "Nosotros" },
  { href: "#soluciones-grid", label: "Soluciones" },
  { href: "#faq",             label: "FAQ" },
  { href: "#noticias",        label: "Noticias" },
  { href: "#demo",            label: "Contáctanos" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Navegación principal">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 hover:opacity-90 transition-opacity"
            aria-label="Simon Movilidad — Inicio"
          >
            <Logo className="h-10 w-auto" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop: Login button */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="https://app.simonmovilidad.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "rounded-lg border border-primary/60 px-5 py-2 text-sm font-semibold text-primary",
                "transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary",
                "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              )}
            >
              Login
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-1 pt-4 pb-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 border-t border-border pt-4">
                  <Link
                    href="https://app.simonmovilidad.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl border border-primary/60 px-5 py-3 text-center text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
