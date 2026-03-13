import Script from "next/script"
import { SegmentProvider } from "@/components/landing/segment-context"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { TrustBar } from "@/components/landing/trust-bar"
import { ProblemSection } from "@/components/landing/problem-section"
import { SolutionsGrid } from "@/components/landing/solutions-grid"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ProductShowcase } from "@/components/landing/product-showcase"
import { AudienceSplit } from "@/components/landing/audience-split"
import { AppDownloadBanner } from "@/components/landing/app-download-banner"
import { ClientLogos } from "@/components/landing/client-logos"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FAQSection } from "@/components/landing/faq-section"
import { BlogPreview } from "@/components/landing/blog-preview"
import { DemoModal } from "@/components/landing/demo-form"
import { DemoModalProvider } from "@/components/landing/demo-modal-context"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"
import { WhatsAppButton } from "@/components/landing/whatsapp-button"
import { ChatWidget } from "@/components/landing/chat-widget"

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
        streetAddress: "Carrera 7 #71-52",
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
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "COP" },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Cómo funciona el monitoreo vehicular en tiempo real?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Instalamos un dispositivo GPS discreto en tu vehículo que transmite su ubicación cada segundo. Puedes ver la posición exacta, velocidad y recorrido desde nuestra app o web, disponible 24/7."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué incluye la guantera digital?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Almacenas SOAT, tecnomecánica, seguro y más en un solo lugar accesible desde tu celular. Recibes alertas automáticas antes de los vencimientos."
          }
        },
        {
          "@type": "Question",
          "name": "¿Simon funciona para vehículo particular y para empresas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Tenemos soluciones para personas con un solo vehículo y para empresas con flotas de cualquier tamaño."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo funcionan las geocercas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Las geocercas son zonas virtuales que defines en el mapa. Cuando tu vehículo entra o sale, recibes una alerta instantánea."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué pasa si necesito soporte?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestro equipo está disponible 24/7 por WhatsApp, teléfono y chat. El tiempo promedio de respuesta es menor a 1 hora en horario hábil."
          }
        }
      ]
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <DemoModalProvider>
        <SegmentProvider>
          <Header />

          <main>
            {/* 1. Hero — "Gestión vehicular inteligente" */}
            <Hero />

            {/* 2. Impacto Simon — contadores animados */}
            <TrustBar />

            {/* 3. Clientes que confían */}
            <ClientLogos />

            {/* 4. Problema */}
            <ProblemSection />

            {/* 5. Nuestros servicios — 5 glassmorphism cards */}
            <SolutionsGrid />

            {/* 6. Cómo funciona */}
            <HowItWorks />

            {/* 7. Demostración del producto */}
            <ProductShowcase />

            {/* 8. Beneficios segmentados — B2B */}
            <AudienceSplit />

            {/* 9. Descarga de app */}
            <AppDownloadBanner />

            {/* 10. Testimonios */}
            <TestimonialsSection />

            {/* 11. FAQ */}
            <FAQSection />

            {/* 12. Blog / Noticias */}
            <BlogPreview />

            {/* 13. CTA final — Empresas: formulario inline */}
            <FinalCTA />
          </main>

          <Footer />

          {/* Persistent WhatsApp CTA */}
          <WhatsAppButton />

          {/* Chatbot Simón */}
          <ChatWidget />

          {/* Demo modal (empresas) */}
          <DemoModal />
        </SegmentProvider>
      </DemoModalProvider>
    </>
  )
}
