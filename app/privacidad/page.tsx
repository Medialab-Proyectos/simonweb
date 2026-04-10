"use client"

import { SegmentProvider } from "@/components/landing/segment-context"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { DemoModalProvider } from "@/components/landing-v3/demo-modal-context"
import { DemoModal } from "@/components/landing-v3/demo-form"
import { FloatingFab } from "@/components/landing-v3/floating-fab"
import { CookieBanner } from "@/components/landing/cookie-banner"
import { ExternalLink, Download } from "lucide-react"

const PDF_URL = "/politicas.pdf"

export default function PrivacidadPage() {
  return (
    <SegmentProvider>
      <DemoModalProvider>
        <Header />

        <main className="min-h-screen bg-background pt-24 pb-16 lg:pt-28 lg:pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Page header */}
            <div className="mb-8">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                Legal
              </span>
              <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Politica de Privacidad y Tratamiento de Datos
              </h1>
              <p className="mt-3 text-base text-muted-foreground">
                Consulta aqui nuestra Politica de Privacidad y Tratamiento de Datos Personales
                vigente, en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013.
              </p>
            </div>

            {/* Action buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/5 hover:border-primary"
              >
                <ExternalLink className="h-4 w-4" />
                Abrir en nueva pestana
              </a>
              <a
                href={PDF_URL}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              >
                <Download className="h-4 w-4" />
                Descargar PDF
              </a>
            </div>

            {/* PDF viewer — desktop */}
            <div className="hidden sm:block rounded-xl border border-border bg-card/40 overflow-hidden">
              <object
                data={PDF_URL}
                type="application/pdf"
                className="h-[80vh] w-full"
                aria-label="Politica de Privacidad y Tratamiento de Datos Personales"
              >
                <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    Tu navegador no puede mostrar el PDF embebido.
                  </p>
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Abrir PDF
                  </a>
                </div>
              </object>
            </div>

            {/* Mobile fallback — no embed, direct CTA */}
            <div className="sm:hidden rounded-xl border border-border bg-card/40 p-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Download className="h-7 w-7 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Para una mejor experiencia de lectura en dispositivos moviles, abre o descarga el
                documento.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir PDF
                </a>
                <a
                  href={PDF_URL}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                >
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </a>
              </div>
            </div>

            {/* Contact note */}
            <div className="mt-8 rounded-xl border border-border bg-card/50 p-5 text-center">
              <p className="text-sm text-muted-foreground">
                Para consultas sobre el tratamiento de tus datos personales, escribenos a{" "}
                <a
                  href="mailto:servicioalcliente@simonmovilidad.com"
                  className="text-primary hover:underline font-medium"
                >
                  servicioalcliente@simonmovilidad.com
                </a>
              </p>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingFab />
        <DemoModal />
      </DemoModalProvider>
    </SegmentProvider>
  )
}
