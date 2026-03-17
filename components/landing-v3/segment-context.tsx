"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Segment = "personas" | "empresas"

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
  return (
    <SegmentContext.Provider value={{ segment, setSegment }}>
      {children}
    </SegmentContext.Provider>
  )
}

export function useSegment() {
  return useContext(SegmentContext)
}
