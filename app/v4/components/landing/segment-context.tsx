"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Segment = "personas" | "empresas" | "finanzauto"

interface SegmentContextValue {
  segment: Segment
  setSegment: (s: Segment) => void
}

const SegmentContext = createContext<SegmentContextValue>({
  segment: "personas",
  setSegment: () => {},
})

export function SegmentProvider({ children }: { children: ReactNode }) {
  const [segment, setSegment] = useState<Segment>("personas")

  // R11: auto-detect Finanzauto via UTM or query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const src = params.get("utm_source") || params.get("segment") || ""
    if (src.toLowerCase() === "finanzauto") setSegment("finanzauto")
  }, [])

  return (
    <SegmentContext.Provider value={{ segment, setSegment }}>
      {children}
    </SegmentContext.Provider>
  )
}

export function useSegment() {
  return useContext(SegmentContext)
}
