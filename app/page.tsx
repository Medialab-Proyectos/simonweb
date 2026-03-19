import Script from "next/script"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { TrustBar } from "@/components/landing/trust-bar"
import { ProblemSection } from "@/components/landing/problem-section"
import { PainPointsSection } from "@/components/landing/pain-points-section"
import { ProductShowcase } from "@/components/landing/product-showcase"
import { SolutionsGrid } from "@/components/landing/solutions-grid"
import { ClientLogos } from "@/components/landing/client-logos"
import { FAQSection } from "@/components/landing/faq-section"
import { AudienceSplit } from "@/components/landing/audience-split"
import { AppDownloadBanner } from "@/components/landing/app-download-banner"
import { Footer } from "@/components/landing/footer"
import { WhatsAppButton } from "@/components/landing/whatsapp-button"
import { ChatWidget } from "@/components/landing/chat-widget"
import { SegmentProvider } from "@/components/landing/segment-context"

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
          "name": "¿Qué documentos puedo guardar en Simon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Almacenas SOAT, tecnomecánica, seguro y más en un solo lugar accesible desde tu celular. Recibes alertas automáticas antes de los vencimientos."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto cuesta Simon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tenemos planes desde $29.900 COP/mes para personas con un vehículo. Para empresas el precio depende del tamaño de la flota."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo se instala el dispositivo GPS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestro equipo instala el dispositivo en tu vehículo en menos de 30 minutos, sin modificar ninguna pieza. Para flotas empresariales coordinamos la instalación en campo con nuestro equipo técnico."
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
          "name": "¿Cuántos vehículos necesita mi empresa para contratar Simon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simon para empresas está disponible desde una sola unidad. Tenemos planes adaptados para flotas pequeñas, medianas y grandes."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo es el soporte de Simon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Soporte real, disponible 24/7. Puedes contactarnos por WhatsApp al +57 310 5511862, llamar al #230 o #280 desde tu celular, o usar el chat de la app."
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

      <SegmentProvider>
        {/* 1. Header — versión principal */}
        <Header />

        <main>
          {/* 2. Hero — V3: cinematic background, animated phone mockup */}
          <Hero />

          {/* 3. Impacto Simon — V3: metric cards with photos */}
          <TrustBar />

          {/* 4. Por qué confiar en Simon — versión principal */}
          <ProblemSection />

          {/* 5. El problema — versión principal: pain points segment-aware */}
          <PainPointsSection />

          {/* 6. El producto — V3: full-width image + personas mockup */}
          <ProductShowcase />

          {/* 7. Todo en un solo lugar — V3: 6 service cards */}
          <SolutionsGrid />

          {/* 8. Confían en Simon — versión principal: logo marquee */}
          <ClientLogos />

          {/* 9. FAQ — versión principal */}
          <FAQSection />

          {/* 10. Simon para Empresas — versión principal */}
          <AudienceSplit />

          {/* 11. Descarga la app — V2 */}
          <AppDownloadBanner />
        </main>

        {/* 12. Footer — versión principal */}
        <Footer />

        {/* Persistent floating widgets */}
        <WhatsAppButton />
        <ChatWidget />
      </SegmentProvider>
    </>
  )
}
