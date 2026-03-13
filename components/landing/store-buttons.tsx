"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

// ─── Platform icons ─────────────────────────────────────────────────────────

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.8c-.66.5-1.6.03-1.6-.8z" />
    </svg>
  )
}

// ─── Reusable store button components ───────────────────────────────────────

interface StoreButtonProps {
  href?: string
  size?: "sm" | "default" | "lg"
  variant?: "filled" | "outline"
  className?: string
}

export function GooglePlayButton({
  href = "https://play.google.com/store/apps/details?id=com.simonmovilidad",
  size = "default",
  variant = "filled",
  className,
}: StoreButtonProps) {
  return (
    <Button
      size={size}
      variant={variant === "filled" ? "default" : "outline"}
      className={cn(
        variant === "filled"
          ? "bg-primary text-primary-foreground hover:bg-primary-hover glow-primary"
          : "border-border bg-transparent text-foreground hover:border-primary hover:bg-primary/10",
        className
      )}
      asChild
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <GooglePlayIcon className="mr-2 h-4 w-4" />
        Google Play
      </Link>
    </Button>
  )
}

export function AppStoreButton({
  href = "https://apps.apple.com/co/app/simon-movilidad",
  size = "default",
  variant = "outline",
  className,
}: StoreButtonProps) {
  return (
    <Button
      size={size}
      variant={variant === "filled" ? "default" : "outline"}
      className={cn(
        variant === "filled"
          ? "bg-primary text-primary-foreground hover:bg-primary-hover glow-primary"
          : "border-border bg-transparent text-foreground hover:border-primary hover:bg-primary/10",
        className
      )}
      asChild
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <AppleIcon className="mr-2 h-4 w-4" />
        App Store
      </Link>
    </Button>
  )
}
