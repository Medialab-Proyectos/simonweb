"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download } from "lucide-react"
import { Logo } from "./logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSegment } from "./segment-context"

const navLinks = [
  { href: "#soluciones",       label: "Nosotros" },
  { href: "#soluciones-grid",  label: "Servicios" },
  { href: "#personas-section", label: "Para personas" },
  { href: "#empresas-section", label: "Para empresas" },
  { href: "#faq",              label: "FAQ" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { segment } = useSegment()
  usePathname()
  const sectionBasePath = "/v4"

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const handleDemoScroll = () => {
    closeMobileMenu()
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "glass border-border/60 py-3 shadow-sm"
          : "border-transparent bg-background/40 backdrop-blur-sm py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Navegación principal">

          {/* Logo */}
          <Link
            href="/v4"
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
                href={`${sectionBasePath}${link.href}`}
                className="text-sm text-muted-foreground transition-colors hover:text-primary relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop: conversion CTA + Login */}
          <div className="hidden items-center gap-3 lg:flex">
            {segment === "personas" ? (
              <div className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
                    "transition-all duration-200 hover:bg-primary-hover hover:shadow-[0_0_16px_rgba(0,255,194,0.25)]",
                    "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  )}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Descargar app
                </button>
                <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-44 rounded-lg border border-border bg-card p-1 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <Link
                    href="https://play.google.com/store/apps/details?id=ve.org.finanzauto&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    Google Play
                  </Link>
                  <Link
                    href="https://apps.apple.com/co/app/simon-movilidad/id1569524088"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    App Store
                  </Link>
                </div>
              </div>
            ) : segment === "empresas" ? (
              <button
                onClick={handleDemoScroll}
                className={cn(
                  "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
                  "transition-all duration-200 hover:bg-primary-hover hover:shadow-[0_0_16px_rgba(0,255,194,0.25)]",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                )}
              >
                Agendar demo
              </button>
            ) : (
              /* R11: Finanzauto — acceso directo a cuenta */
              <Link
                href="https://www.simonmovilidad.com/app/login"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
                  "transition-all duration-200 hover:bg-primary-hover hover:shadow-[0_0_16px_rgba(0,255,194,0.25)]",
                  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                )}
              >
                Acceder a mi cuenta
              </Link>
            )}
            <Link
              href="https://www.simonmovilidad.com/app/login"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary",
                "transition-all duration-200 hover:bg-primary/5 hover:border-primary",
                "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              )}
            >
              Login
            </Link>
          </div>

          {/* Mobile: hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
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
              <div className="flex flex-col gap-1 pt-4 pb-5 rounded-xl mt-2 bg-background/95 backdrop-blur-md px-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={`${sectionBasePath}${link.href}`}
                    className="rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 border-t border-border pt-4 flex flex-col gap-2">
                  {/* Primary conversion CTA */}
                  {segment === "personas" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="https://play.google.com/store/apps/details?id=ve.org.finanzauto&pcampaignid=web_share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-all"
                        onClick={closeMobileMenu}
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Google Play
                      </Link>
                      <Link
                        href="https://apps.apple.com/co/app/simon-movilidad/id1569524088"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-all"
                        onClick={closeMobileMenu}
                      >
                        App Store
                      </Link>
                    </div>
                  ) : segment === "empresas" ? (
                    <button
                      className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-all"
                      onClick={handleDemoScroll}
                    >
                      Agendar demo gratuita
                    </button>
                  ) : (
                    /* R11: Finanzauto mobile */
                    <Link
                      href="https://www.simonmovilidad.com/app/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-all"
                      onClick={closeMobileMenu}
                    >
                      Acceder a mi cuenta
                    </Link>
                  )}
                  {/* Secondary: WhatsApp */}
                  <Link
                    href="https://wa.me/573105511862?text=Hola%2C+me+interesa+Simon+Movilidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl border border-border px-5 py-3 text-center text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
                    onClick={closeMobileMenu}
                  >
                    Hablar por WhatsApp
                  </Link>
                  {/* Login */}
                  <Link
                    href="https://www.simonmovilidad.com/app/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl px-5 py-2.5 text-center text-sm text-muted-foreground hover:text-primary transition-colors"
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
