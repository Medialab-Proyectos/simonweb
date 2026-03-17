import { Camera } from "lucide-react"
import { cn } from "@/lib/utils"

type Overlay = "bottom" | "top" | "full" | "none"

interface ImagePlaceholderProps {
  /** Alt text — will be used as the real <img alt> when replaced */
  alt: string
  /** Developer hint describing the photo needed */
  hint?: string
  className?: string
  overlay?: Overlay
}

/**
 * Visual placeholder for a contextual photograph.
 *
 * Replace this component with:
 *   <Image src="/path/to/photo.jpg" alt={alt} fill className="object-cover" />
 *
 * Keep the wrapping <figure> with the same className and role="img".
 */
export function ImagePlaceholder({
  alt,
  hint,
  className,
  overlay = "none",
}: ImagePlaceholderProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-2xl border border-dashed border-border bg-gradient-to-br from-surface to-card shadow-sm",
        className
      )}
      role="img"
      aria-label={alt}
    >
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      {/* Center icon + caption */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border/40 bg-background/25 backdrop-blur-sm">
          <Camera className="h-6 w-6 text-muted-foreground/40" aria-hidden="true" />
        </div>
        <figcaption className="max-w-[260px] space-y-1 text-center">
          <p className="text-sm leading-snug text-muted-foreground/55">{alt}</p>
          {hint && (
            <p className="text-xs text-muted-foreground/35">{hint}</p>
          )}
        </figcaption>
      </div>

      {/* Gradient overlays */}
      {overlay === "bottom" && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background/65 to-transparent"
          aria-hidden="true"
        />
      )}
      {overlay === "top" && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-background/65 to-transparent"
          aria-hidden="true"
        />
      )}
      {overlay === "full" && (
        <div
          className="pointer-events-none absolute inset-0 bg-background/18"
          aria-hidden="true"
        />
      )}

      {/* Dev label */}
      <div className="absolute bottom-2.5 right-2.5 rounded-md bg-background/55 px-2 py-1 backdrop-blur-sm">
        <p className="text-[10px] text-muted-foreground/45">Imagen pendiente</p>
      </div>
    </figure>
  )
}
