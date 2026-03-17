"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

// ─── Official Google Play Badge ──────────────────────────────────────────────
// Matches the official "Get it on Google Play" badge design

function GooglePlayBadgeSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 155 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Get it on Google Play"
    >
      {/* Background */}
      <rect width="155" height="46" rx="5.5" fill="#000000" />
      {/* Border */}
      <rect x="0.5" y="0.5" width="154" height="45" rx="5" stroke="white" strokeOpacity="0.18" />

      {/* Google Play multicolor icon */}
      <g transform="translate(11, 8)">
        {/* Play button — 4 colored segments */}
        {/* Left / teal-to-blue gradient side */}
        <path
          d="M1.22 0.38C0.68 0.93 0.36 1.78 0.36 2.86V27.14C0.36 28.22 0.68 29.07 1.22 29.62L1.36 29.75L14.87 16.24V15.76L1.36 2.25L1.22 0.38Z"
          fill="url(#gp_grad1)"
        />
        {/* Top-right — blue */}
        <path
          d="M19.37 20.76L14.87 16.24V15.76L19.38 11.24L19.54 11.34L24.87 14.35C26.38 15.21 26.38 16.61 24.87 17.47L19.54 20.47L19.37 20.76Z"
          fill="url(#gp_grad2)"
        />
        {/* Bottom — green */}
        <path
          d="M19.54 20.47L14.87 16L1.22 29.62C1.74 30.17 2.6 30.24 3.57 29.7L19.54 20.47Z"
          fill="url(#gp_grad3)"
        />
        {/* Top — red/yellow */}
        <path
          d="M19.54 11.53L3.57 2.3C2.6 1.76 1.74 1.83 1.22 2.38L14.87 16L19.54 11.53Z"
          fill="url(#gp_grad4)"
        />
        <defs>
          <linearGradient id="gp_grad1" x1="13.65" y1="1.59" x2="-5.18" y2="20.41" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00A0FF" />
            <stop offset="0.007" stopColor="#00A1FF" />
            <stop offset="0.26" stopColor="#00BEFF" />
            <stop offset="0.51" stopColor="#00D2FF" />
            <stop offset="0.76" stopColor="#00DFFF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient id="gp_grad2" x1="26.89" y1="16" x2="0.03" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE000" />
            <stop offset="0.409" stopColor="#FFBD00" />
            <stop offset="0.775" stopColor="#FFA500" />
            <stop offset="1" stopColor="#FF9C00" />
          </linearGradient>
          <linearGradient id="gp_grad3" x1="16.93" y1="18.53" x2="-7.4" y2="42.86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="gp_grad4" x1="-2.41" y1="-5.94" x2="8.3" y2="4.77" gradientUnits="userSpaceOnUse">
            <stop stopColor="#32A071" />
            <stop offset="0.069" stopColor="#2DA771" />
            <stop offset="0.476" stopColor="#15CF74" />
            <stop offset="0.801" stopColor="#06E775" />
            <stop offset="1" stopColor="#00F076" />
          </linearGradient>
        </defs>
      </g>

      {/* Text */}
      <text x="45" y="17" fill="white" fontSize="9" fontFamily="'Helvetica Neue', Arial, sans-serif" letterSpacing="0.5" opacity="0.82">
        GET IT ON
      </text>
      <text x="44" y="32" fill="white" fontSize="15" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="500" letterSpacing="0.2">
        Google Play
      </text>
    </svg>
  )
}

// ─── Official App Store Badge ─────────────────────────────────────────────────
// Matches the official "Download on the App Store" badge design

function AppStoreBadgeSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 155 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Download on the App Store"
    >
      {/* Background */}
      <rect width="155" height="46" rx="5.5" fill="#000000" />
      {/* Border */}
      <rect x="0.5" y="0.5" width="154" height="45" rx="5" stroke="white" strokeOpacity="0.18" />

      {/* Apple logo */}
      <g transform="translate(11, 7.5) scale(1.22)">
        <path
          d="M14.64 15.88c-.02-2.47 2.02-3.67 2.11-3.72-1.15-1.68-2.94-1.91-3.58-1.93-1.52-.16-2.97.9-3.74.9-.78 0-1.98-.88-3.25-.85-1.67.02-3.21.97-4.07 2.46-1.74 3.01-.44 7.48 1.25 9.93.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.73-.81 3.24-.81 1.51 0 1.94.81 3.27.79 1.35-.02 2.2-1.22 3.02-2.43.96-1.39 1.35-2.74 1.37-2.81-.03-.01-2.72-1.04-2.74-4.03zM12.18 8.7c.69-.84 1.15-2 1.02-3.16-.99.04-2.18.66-2.89 1.49-.63.73-1.19 1.91-1.04 3.04 1.1.08 2.22-.56 2.91-1.37z"
          fill="white"
        />
      </g>

      {/* Text */}
      <text x="44" y="17" fill="white" fontSize="9" fontFamily="'Helvetica Neue', Arial, sans-serif" letterSpacing="0.5" opacity="0.82">
        Download on the
      </text>
      <text x="44" y="32" fill="white" fontSize="15.5" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="500" letterSpacing="0.2">
        App Store
      </text>
    </svg>
  )
}

// ─── Exported button components ───────────────────────────────────────────────

interface StoreButtonProps {
  href?: string
  size?: "sm" | "default" | "lg"
  variant?: "filled" | "outline"
  className?: string
}

export function GooglePlayButton({
  href = "https://play.google.com/store/apps/details?id=com.simonmovilidad",
  className,
}: StoreButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-md",
        className
      )}
    >
      <GooglePlayBadgeSVG className="h-[46px] w-auto" />
    </Link>
  )
}

export function AppStoreButton({
  href = "https://apps.apple.com/co/app/simon-movilidad",
  className,
}: StoreButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-md",
        className
      )}
    >
      <AppStoreBadgeSVG className="h-[46px] w-auto" />
    </Link>
  )
}
