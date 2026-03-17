import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Simon Movilidad | Control Total de tu Movilidad en Tiempo Real",
  description:
    "Monitorea, protege y gestiona vehículos particulares o flotas desde una experiencia simple, confiable e inteligente.",
}

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
