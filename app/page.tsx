import Script from "next/script"
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
import { FinalCTA } from "@/components/landing/final-cta"
import { SimonPaySection } from "@/components/landing/simon-pay-section"
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

      <SegmentProvider>
        <Header />

        <main>
          {/* 1. Hero — segmento activo con SegmentSwitcher */}
          <Hero />

          {/* 2. Impacto Simon — contadores animados */}
          <TrustBar />

          {/* 3. Nuestros servicios — 6 cards */}
          <SolutionsGrid />

          {/* 4. Cómo funciona */}
          <HowItWorks />

          {/* 5. Demostración del producto — segmentada */}
          <ProductShowcase />

          {/* 6. Simon para Empresas — B2B */}
          <AudienceSplit />

          {/* 7. ¿Quiénes somos? — credencial temprana (R8: moved up) */}
          <ProblemSection />

          {/* 8. Clientes — carrusel de logos */}
          <ClientLogos />

          {/* 9. Testimonios */}
          <TestimonialsSection />

          {/* 10. Descarga de app — captura B2C antes de FAQ */}
          <AppDownloadBanner />

          {/* 11. Simon Pay — waitlist section (R13) */}
          <SimonPaySection />

          {/* 12. FAQ */}
          <FAQSection />

          {/* 12. CTA final — Contacto / Formulario */}
          <FinalCTA />
        </main>

        <Footer />

        {/* Persistent WhatsApp CTA */}
        <WhatsAppButton />

        {/* Asistente virtual Simon */}
        <ChatWidget />
      </SegmentProvider>
    </>
  )
}
