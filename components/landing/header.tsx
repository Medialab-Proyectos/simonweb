"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, MessageCircle, Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSegment } from "./segment-context"
import { GooglePlayButton, AppStoreButton } from "./store-buttons"
import { Logo } from "./logo"
import { useDemoModal } from "./demo-modal-context"
import Link from "next/link"

const navLinks = [
  { href: "#soluciones", label: "Soluciones" },
  { href: "#empresas", label: "Empresas" },
  { href: "#personas", label: "Personas" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#testimonios", label: "Casos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { segment } = useSegment()
  const { open: openDemo } = useDemoModal()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
        }`}
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
          <div className="hidden items-center gap-5 lg:flex">
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

          {/* Desktop CTAs — dynamic by segment */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <AnimatePresence mode="wait">
              {segment === "personas" ? (
                <motion.div
                  key="personas-header-ctas"
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <GooglePlayButton size="sm" variant="outline" />
                  <AppStoreButton size="sm" variant="filled" />
                </motion.div>
              ) : (
                <motion.div
                  key="empresas-header-ctas"
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border bg-transparent text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary"
                    onClick={openDemo}
                  >
                    Agendar demo
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary-hover glow-primary-sm"
                    asChild
                  >
                    <Link href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-4 w-4" aria-hidden="true" />
                      WhatsApp
                    </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
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

                {/* Mobile dynamic CTAs */}
                <div className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
                  {segment === "personas" ? (
                    <>
                      <GooglePlayButton size="default" variant="filled" className="w-full justify-center" />
                      <AppStoreButton size="default" variant="outline" className="w-full justify-center" />
                      <Link
                        href="https://wa.me/573001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Hablar por WhatsApp
                      </Link>
                    </>
                  ) : (
                    <>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-hover" onClick={() => { closeMobileMenu(); openDemo() }}>
                        Agendar demo
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-border bg-transparent text-foreground hover:border-primary hover:bg-primary/10"
                        asChild
                      >
                        <Link
                          href="https://wa.me/573001234567"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeMobileMenu}
                        >
                          <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                          WhatsApp
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
