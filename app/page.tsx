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
        telephone: "+57-300-123-4567",
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
      telephone: "+57-300-123-4567",
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

      {/*
        SegmentProvider shares the active segment (personas | empresas)
        across Header, Hero, ProductShowcase, AudienceSplit and FinalCTA.
      */}
      <DemoModalProvider>
        <SegmentProvider>
          <Header />

          <main>
            {/* 1. Hero */}
            <Hero />

            {/* 2. Credibilidad rápida */}
            <TrustBar />

            {/* 3. Problema */}
            <ProblemSection />

            {/* 4. Solución */}
            <SolutionsGrid />

            {/* 5. Cómo funciona */}
            <HowItWorks />

            {/* 6. Demostración del producto */}
            <ProductShowcase />

            {/* 7. Beneficios segmentados */}
            <AudienceSplit />

            {/* 8. Prueba / confianza */}
            <TestimonialsSection />

            {/* 9. FAQ */}
            <FAQSection />

            {/* 10. Blog */}
            <BlogPreview />

            {/* 11. CTA final */}
            <FinalCTA />
          </main>

          <Footer />

          {/* Persistent WhatsApp CTA */}
          <WhatsAppButton />

          {/* Chatbot assistant */}
          <ChatWidget />

          {/* Demo modal (empresas) */}
          <DemoModal />
        </SegmentProvider>
      </DemoModalProvider>
    </>
  )
}
