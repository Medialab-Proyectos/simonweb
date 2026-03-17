import Script from "next/script"
import { Header } from "@/components/landing/header"
import { HeroV2 } from "@/components/landing-v2/hero"
import { ProblemSectionV2 } from "@/components/landing-v2/problem-section"
import { SolutionsGridV2 } from "@/components/landing-v2/solutions-grid"
import { HowItWorksV2 } from "@/components/landing-v2/how-it-works"
import { ProductShowcaseV2 } from "@/components/landing-v2/product-showcase"
import { AudienceSplitV2 } from "@/components/landing-v2/audience-split"
import { ClientLogos } from "@/components/landing/client-logos"
import { TestimonialsSectionV2 } from "@/components/landing-v2/testimonials-section"
import { AppDownloadBanner } from "@/components/landing/app-download-banner"
import { FAQSectionV2 } from "@/components/landing-v2/faq-section"
import { FinalCTAV2 } from "@/components/landing-v2/final-cta"
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
          name: "¿Qué pasa si me roban el vehículo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Con Simon activo puedes compartir la ubicación en tiempo real con las autoridades. Recibes alertas inmediatas ante movimiento sospechoso y la información registrada puede usarse como evidencia.",
          },
        },
      ],
    },
  ],
}

export default function V2Page() {
  return (
    <>
      <Script
        id="structured-data-v2"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SegmentProvider>
        <Header />

        <main>
          {/* 1. Hero — universal headline + trust metrics inline */}
          <HeroV2 />

          {/* 2. Dolores — 3 pain cards (leads to solutions) */}
          <ProblemSectionV2 />

          {/* 3. Soluciones — 6 cards with pain micro-tags */}
          <SolutionsGridV2 />

          {/* 4. Cómo funciona — 3 steps + result card */}
          <HowItWorksV2 />

          {/* 5. Producto — card-style segment switcher */}
          <ProductShowcaseV2 />

          {/* 6. Simon para Empresas — loss aversion + dual CTA */}
          <AudienceSplitV2 />

          {/* 7. Clientes — logo carousel */}
          <ClientLogos />

          {/* 8. Testimonios — result pills, initials avatars */}
          <TestimonialsSectionV2 />

          {/* 9. Descarga de app — B2C capture */}
          <AppDownloadBanner />

          {/* 10. FAQ — extended with new questions */}
          <FAQSectionV2 />

          {/* 11. CTA final — "El siguiente paso tarda 2 minutos" */}
          <FinalCTAV2 />
        </main>

        <Footer />

        <WhatsAppButton />
        <ChatWidget />
      </SegmentProvider>
    </>
  )
}
