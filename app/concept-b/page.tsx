import { Header } from "@/components/landing/header"
import { HeroCB } from "@/components/landing-cb/hero"
import { CrisisCB } from "@/components/landing-cb/crisis"
import { GuideCB } from "@/components/landing-cb/guide"
import { TransformationCB } from "@/components/landing-cb/transformation"
import { JourneyCB } from "@/components/landing-cb/journey"
import { TestimonialsCB } from "@/components/landing-cb/testimonials"
import { YourTurnCB } from "@/components/landing-cb/your-turn"
import { FAQCb } from "@/components/landing-cb/faq"
import { Footer } from "@/components/landing/footer"
import { WhatsAppButton } from "@/components/landing/whatsapp-button"
import { SegmentProvider } from "@/components/landing/segment-context"

export default function ConceptBPage() {
  return (
    <SegmentProvider>
      <Header />
      <main>
        {/* Cap. 1 — Mundo ordinario + tensión */}
        <HeroCB />
        {/* Cap. 2 — El conflicto tiene nombre */}
        <CrisisCB />
        {/* Cap. 3 — El guía aparece */}
        <GuideCB />
        {/* Cap. 4 — La transformación visible */}
        <TransformationCB />
        {/* Cap. 5 — El camino */}
        <JourneyCB />
        {/* Cap. 6 — Prueba de que funciona */}
        <TestimonialsCB />
        {/* Cap. 7 — Tu turno */}
        <YourTurnCB />
        {/* Cap. 8 — Las dudas finales */}
        <FAQCb />
      </main>
      <Footer />
      <WhatsAppButton />
    </SegmentProvider>
  )
}
