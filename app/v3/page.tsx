import Script from "next/script"
import { SegmentProvider } from "@/components/landing-v3/segment-context"
import { Header } from "@/components/landing-v3/header"
import { Hero } from "@/components/landing-v3/hero"
import { TrustBar } from "@/components/landing-v3/trust-bar"
import { ProblemSection } from "@/components/landing-v3/problem-section"
import { SolutionsGrid } from "@/components/landing-v3/solutions-grid"
import { HowItWorks } from "@/components/landing-v3/how-it-works"
import { ProductShowcase } from "@/components/landing-v3/product-showcase"
import { AudienceSplit } from "@/components/landing-v3/audience-split"
import { ClientLogos } from "@/components/landing-v3/client-logos"
import { TestimonialsSection } from "@/components/landing-v3/testimonials-section"
import { FAQSection } from "@/components/landing-v3/faq-section"
import { DemoModal } from "@/components/landing-v3/demo-form"
import { DemoModalProvider } from "@/components/landing-v3/demo-modal-context"
import { FinalCTA } from "@/components/landing-v3/final-cta"
import { Footer } from "@/components/landing-v3/footer"
import { FloatingFab } from "@/components/landing-v3/floating-fab"

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
      "@type": "MobileApplication",
      name: "Simon Movilidad",
      operatingSystem: "Android, iOS",
      applicationCategory: "UtilitiesApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "COP" },
    },
  ],
}

export default function V3Page() {
  return (
    <>
      <Script
        id="structured-data-v3"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <DemoModalProvider>
        <SegmentProvider>
          <Header />

          <main>
            <Hero />
            <TrustBar />
            <ProblemSection />
            <SolutionsGrid />
            <HowItWorks />
            <ClientLogos />
            <ProductShowcase />
            <AudienceSplit />
            <TestimonialsSection />
            <FAQSection />
            <FinalCTA />
          </main>

          <Footer />
          <FloatingFab />
          <DemoModal />
        </SegmentProvider>
      </DemoModalProvider>
    </>
  )
}
