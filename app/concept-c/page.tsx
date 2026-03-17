import { HeaderCC } from "@/components/landing-cc/header"
import { HeroCC } from "@/components/landing-cc/hero"
import { ProofBandCC } from "@/components/landing-cc/proof-band"
import { CostOfInactionCC } from "@/components/landing-cc/cost-of-inaction"
import { FeaturesCC } from "@/components/landing-cc/features"
import { EnterpriseCC } from "@/components/landing-cc/enterprise"
import { TestimonialsCC } from "@/components/landing-cc/testimonials"
import { PricingCC } from "@/components/landing-cc/pricing"
import { MiniFAQCC } from "@/components/landing-cc/mini-faq"
import { FinalCTACC } from "@/components/landing-cc/final-cta"
import { Footer } from "@/components/landing/footer"
import { WhatsAppButton } from "@/components/landing/whatsapp-button"

export default function ConceptCPage() {
  return (
    <>
      {/* Custom header with persistent + context-aware CTA */}
      <HeaderCC />

      <main>
        {/* 1. Hero — anchoring social proof + precio visible */}
        <HeroCC />
        {/* 2. Trust injection — ANTES de explicar funciones */}
        <ProofBandCC />
        {/* 3. Costo de no actuar — loss frame cuantificado */}
        <CostOfInactionCC />
        {/* 4. Funciones — confirmación de deseo ya sembrado */}
        <FeaturesCC />
        {/* 5. Ventana B2B — antes de testimonios */}
        <EnterpriseCC />
        {/* 6. Testimonios — resultados medibles */}
        <TestimonialsCC />
        {/* 7. Precio y descarga — resolución de decisión */}
        <PricingCC />
        {/* 8. 3 objeciones críticas */}
        <MiniFAQCC />
        {/* 9. CTA final — urgencia honesta */}
        <FinalCTACC />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
