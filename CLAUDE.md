# Simon Movilidad - Web1

Landing page/marketing site for **Simon Movilidad**, a vehicle monitoring and fleet management platform for the Colombian market.

## Tech Stack

- **Framework:** Next.js 16 (App Router, `use client`)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 + CSS variables (dark theme, cyan/blue accents)
- **UI Components:** shadcn/ui (56 components, "new-york" style)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Analytics:** Vercel Analytics

## Project Structure

```
app/
  layout.tsx      # Root layout, fonts (Inter, Geist Mono), metadata
  page.tsx        # Orchestrator (~149 lines), imports all landing sections
  globals.css     # Tailwind v4 @theme config, CSS variables
components/
  landing/        # All page sections (22 components)
  ui/             # shadcn/ui components (~55 total)
  theme-provider.tsx
  theme-toggle.tsx
hooks/
  use-mobile.ts   # Mobile breakpoint (<768px)
  use-toast.ts    # Toast queue system
lib/
  utils.ts        # cn() helper (clsx + tailwind-merge)
public/           # Static assets (icons, placeholders)
```

## Development Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Conventions

- **Path alias:** `@/` maps to the project root
- **Components:** Import from `@/components/ui/<name>`
- **Utilities:** Use `cn()` from `@/lib/utils` for classname merging
- **Sections:** All page sections live in `components/landing/`; `app/page.tsx` only composes them
- **Theming:** Dark theme only; colors via CSS variables (see `globals.css`)
- **Language:** Site content is in Spanish (es)

## Architecture Notes

- `SegmentProvider` (segment-context.tsx) shares `"personas" | "empresas"` state across Header, Hero, ProductShowcase, AudienceSplit, FinalCTA
- `SegmentSwitcher` is the reusable UI toggle — placed in Hero; reads/writes global segment
- `DemoModalProvider` (demo-modal-context.tsx) + `DemoModal` (demo-form.tsx) — global demo booking modal
- `store-buttons.tsx` exports `GooglePlayButton` and `AppStoreButton` — reusable store CTAs
- `WhatsAppButton` and `ChatWidget` — floating persistent widgets rendered in page.tsx
- Dark/light mode via next-themes; `html.light` overrides CSS vars in globals.css
- `next.config.mjs` disables TypeScript build errors and image optimization
- Both `package-lock.json` and `pnpm-lock.yaml` are present; prefer `npm`

## Landing Components (`components/landing/`)

| File | Description |
|------|-------------|
| `header.tsx` | Sticky nav with segment switcher |
| `hero.tsx` | Hero section with segment-aware CTAs |
| `trust-bar.tsx` | Social proof / logo bar |
| `problem-section.tsx` | Pain points section |
| `solutions-grid.tsx` | Feature/solution cards |
| `how-it-works.tsx` | Step-by-step walkthrough |
| `product-showcase.tsx` | Segment-aware product visual (placeholder) |
| `audience-split.tsx` | Personas vs Empresas split section |
| `testimonials-section.tsx` | Customer testimonials |
| `faq-section.tsx` | FAQ accordion |
| `blog-preview.tsx` | Blog/content preview cards |
| `final-cta.tsx` | Bottom conversion section |
| `footer.tsx` | Site footer |
| `segment-context.tsx` | SegmentProvider + useSegment hook |
| `segment-switcher.tsx` | Personas/Empresas toggle UI |
| `demo-modal-context.tsx` | DemoModalProvider + useDemoModal hook |
| `demo-form.tsx` | DemoModal with booking form |
| `store-buttons.tsx` | GooglePlayButton + AppStoreButton |
| `whatsapp-button.tsx` | Floating WhatsApp CTA |
| `chat-widget.tsx` | Floating chat widget |
| `logo.tsx` | Simon Movilidad logo component |
| `image-placeholder.tsx` | Dev placeholder for product images |

## Conversion Routes

| Segment | Primary CTA | Secondary CTA |
|---------|-------------|---------------|
| Personas | Google Play download | App Store download |
| Empresas | Agendar demo | WhatsApp |

## Image Placeholders

- `ProductShowcase` → replace placeholder `<div>` with `<Image>` from next/image
- One placeholder per segment (personas: phone context, empresas: fleet/office)

## Color Palette (CSS Variables)

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#00E5D1` | Cyan accent, CTAs |
| `--secondary` | `#19B5FF` | Blue accent |
| `--background` | `#050505` | Page background |
| `--card` | `#10161D` | Card backgrounds |
| `--foreground` | `#F5F7FA` | Main text |
| `--success` | `#2AD67A` | Success states |
| `--destructive` | `#FF4D4D` | Errors |
