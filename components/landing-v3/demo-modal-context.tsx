"use client"

import { createContext, useContext, useState } from "react"

interface DemoModalCtx {
    open: () => void
    close: () => void
    isOpen: boolean
}

const DemoModalContext = createContext<DemoModalCtx>({
    open: () => { },
    close: () => { },
    isOpen: false,
})

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <DemoModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }}>
            {children}
        </DemoModalContext.Provider>
    )
}

export function useDemoModal() {
    return useContext(DemoModalContext)
}
