import { Header } from "@/components/landing/header"
import { HeroCA } from "@/components/landing-ca/hero"
import { TrustStripCA } from "@/components/landing-ca/trust-strip"
import { SingleFeatureCA } from "@/components/landing-ca/single-feature"
import { HowItWorksCA } from "@/components/landing-ca/how-it-works"
import { ConversionCTACA } from "@/components/landing-ca/conversion-cta"
import { MiniFAQCA } from "@/components/landing-ca/mini-faq"
import { Footer } from "@/components/landing/footer"
import { WhatsAppButton } from "@/components/landing/whatsapp-button"
import { SegmentProvider } from "@/components/landing/segment-context"

export default function ConceptAPage() {
  return (
    <SegmentProvider>
      <Header />
      <main>
        {/* 1. Hero — selección binaria de segmento */}
        <HeroCA />
        {/* 2. 3 números, nada más */}
        <TrustStripCA />
        {/* 3. Una función explicada bien por segmento */}
        <SingleFeatureCA />
        {/* 4. Cómo funciona — 3 pasos lineales */}
        <HowItWorksCA />
        {/* 5. El único momento de conversión */}
        <ConversionCTACA />
        {/* 6. Solo 3 preguntas frecuentes */}
        <MiniFAQCA />
      </main>
      <Footer />
      <WhatsAppButton />
    </SegmentProvider>
  )
}
