import Script from "next/script"

// ── Versión Principal ──────────────────────────────────────────────────────────
import { SegmentProvider } from "@/components/landing/segment-context"
import { Header } from "@/components/landing/header"
import { ProblemSection as PorQueConfiarEnSimon } from "@/components/landing/problem-section"
import { PainPointsSection } from "@/components/landing/pain-points-section"
import { ClientLogos } from "@/components/landing/client-logos"
import { FAQSection } from "@/components/landing/faq-section"
import { AudienceSplit } from "@/components/landing/audience-split"
import { PersonasSplit } from "@/components/landing/personas-split"
import { AppDownloadBanner } from "@/components/landing/app-download-banner"
import { Footer } from "@/components/landing/footer"
// ── V3 ─────────────────────────────────────────────────────────────────────────
import { SegmentProvider as SegmentProviderV3 } from "@/components/landing-v3/segment-context"
import { Hero } from "@/components/landing-v3/hero"
import { TrustBar } from "@/components/landing-v3/trust-bar"
import { ProblemSection as ElProblema } from "@/components/landing-v3/problem-section"
import { ProductShowcase } from "@/components/landing-v3/product-showcase"
import { SolutionsGrid } from "@/components/landing-v3/solutions-grid"
import { FloatingFab } from "@/components/landing-v3/floating-fab"
import { DemoModalProvider } from "@/components/landing-v3/demo-modal-context"
import { DemoModal } from "@/components/landing-v3/demo-form"
import { CookieBanner } from "@/components/landing/cookie-banner"

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://simonmovilidad.com/#organization",
      name: "Simon Movilidad",
      url: "https://simonmovilidad.com",
      logo: { "@type": "ImageObject", url: "https://simonmovilidad.com/logo.png" },
      sameAs: [
        "https://www.facebook.com/simonmovilidad",
        "https://www.instagram.com/simonmovilidad",
        "https://www.linkedin.com/company/simonmovilidad",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+57-310-5511862",
        contactType: "sales",
        availableLanguage: ["Spanish"],
        areaServed: "CO",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://simonmovilidad.com/#website",
      url: "https://simonmovilidad.com",
      name: "Simon Movilidad",
      publisher: { "@id": "https://simonmovilidad.com/#organization" },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://simonmovilidad.com/#localbusiness",
      name: "Simon Movilidad",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle 74 # 15-80, Oficina 101 Edificio Osaka Center",
        addressLocality: "Bogotá",
        addressRegion: "Cundinamarca",
        postalCode: "110231",
        addressCountry: "CO",
      },
      geo: { "@type": "GeoCoordinates", latitude: 4.6534, longitude: -74.0621 },
      url: "https://simonmovilidad.com",
      telephone: "+57-310-5511862",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    },
    {
      "@type": "MobileApplication",
      name: "Simon Movilidad",
      operatingSystem: "Android, iOS",
      applicationCategory: "UtilitiesApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "COP" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo funciona el monitoreo vehicular en tiempo real?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Instalamos un dispositivo GPS discreto en tu vehículo que transmite su ubicación cada segundo. Puedes ver la posición exacta, velocidad y recorrido desde nuestra app o web, disponible 24/7.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué documentos puedo guardar en Simon?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Almacenas SOAT, tecnomecánica, seguro y más en un solo lugar accesible desde tu celular. Recibes alertas automáticas antes de los vencimientos.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta Simon?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tenemos planes desde $29.900 COP/mes para personas con un vehículo. Para empresas el precio depende del tamaño de la flota.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo se instala el dispositivo GPS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nuestro equipo instala el dispositivo en tu vehículo en menos de 30 minutos, sin modificar ninguna pieza.",
          },
        },
        {
          "@type": "Question",
          name: "¿Simon funciona para vehículo particular y para empresas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Tenemos soluciones para personas con un solo vehículo y para empresas con flotas de cualquier tamaño.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo es el soporte de Simon?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Soporte real, disponible 24/7. Puedes contactarnos por WhatsApp al +57 310 5511862, llamar al #230 o #280 desde tu celular.",
          },
        },
      ],
    },
  ],
}

export default function V4Page() {
  return (
    <>
      <Script
        id="structured-data-v4"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/*
        Arquitectura de contextos:
        - SegmentProvider (principal) → Header, PainPointsSection, AudienceSplit
        - SegmentProviderV3 (v3)      → Hero, TrustBar, ElProblema, ProductShowcase, SolutionsGrid
        Se anidan para que cada componente use su propio contexto de segmento.
      */}
      <SegmentProvider>
        <SegmentProviderV3>
          <DemoModalProvider>

          {/* 1. Header — Versión Principal */}
          <Header />

          <main>
            {/* 2. Hero — V3 */}
            <Hero />

            {/* 3. Impacto Simon — V3 */}
            <TrustBar />

            {/* 4. Por qué confiar en Simon — Versión Principal */}
            <PorQueConfiarEnSimon />

            {/* 5. El problema — V3 */}
            <ElProblema />

            {/* 6. El producto — V3 */}
            <ProductShowcase />

            {/* 7. Todo en un solo lugar — V3 */}
            <SolutionsGrid />

            {/* 8. Simon para Personas — "Tu vehículo, bajo control total" */}
            <PersonasSplit />

            {/* 9. Simon para Empresas — Versión Principal */}
            <AudienceSplit />

            {/* 10. FAQ — Versión Principal */}
            <FAQSection />

            {/* 11. Confían en Simon — Versión Principal */}
            <ClientLogos />

            {/* 12. Descarga la app — V2 (componente de versión principal) */}
            <AppDownloadBanner />
          </main>

          {/* 12. Footer — Versión Principal (incluye "La tecnología que transforma tu movilidad") */}
          <Footer />

          {/* Widgets flotantes — V3: FAB unificado (WhatsApp + Chat + Llamar) */}
          <FloatingFab />

          {/* Demo modal global */}
          <DemoModal />

          {/* Cookie consent banner */}
          <CookieBanner />

          </DemoModalProvider>
        </SegmentProviderV3>
      </SegmentProvider>
    </>
  )
}
