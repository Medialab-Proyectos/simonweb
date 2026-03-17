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

| File                       | Description                                |
| -------------------------- | ------------------------------------------ |
| `header.tsx`               | Sticky nav with segment switcher           |
| `hero.tsx`                 | Hero section with segment-aware CTAs       |
| `trust-bar.tsx`            | Social proof / logo bar                    |
| `problem-section.tsx`      | Pain points section                        |
| `solutions-grid.tsx`       | Feature/solution cards                     |
| `how-it-works.tsx`         | Step-by-step walkthrough                   |
| `product-showcase.tsx`     | Segment-aware product visual (placeholder) |
| `audience-split.tsx`       | Personas vs Empresas split section         |
| `testimonials-section.tsx` | Customer testimonials                      |
| `faq-section.tsx`          | FAQ accordion                              |
| `blog-preview.tsx`         | Blog/content preview cards                 |
| `final-cta.tsx`            | Bottom conversion section                  |
| `footer.tsx`               | Site footer                                |
| `segment-context.tsx`      | SegmentProvider + useSegment hook          |
| `segment-switcher.tsx`     | Personas/Empresas toggle UI                |
| `demo-modal-context.tsx`   | DemoModalProvider + useDemoModal hook      |
| `demo-form.tsx`            | DemoModal with booking form                |
| `store-buttons.tsx`        | GooglePlayButton + AppStoreButton          |
| `whatsapp-button.tsx`      | Floating WhatsApp CTA                      |
| `chat-widget.tsx`          | Floating chat widget                       |
| `logo.tsx`                 | Simon Movilidad logo component             |
| `image-placeholder.tsx`    | Dev placeholder for product images         |

## Conversion Routes

| Segment  | Primary CTA          | Secondary CTA      |
| -------- | -------------------- | ------------------ |
| Personas | Google Play download | App Store download |
| Empresas | Agendar demo         | WhatsApp           |

## Image Placeholders

- `ProductShowcase` → replace placeholder `<div>` with `<Image>` from next/image
- One placeholder per segment (personas: phone context, empresas: fleet/office)

## Color Palette (CSS Variables)

| Token           | Value     | Usage             |
| --------------- | --------- | ----------------- |
| `--primary`     | `#00E5D1` | Cyan accent, CTAs |
| `--secondary`   | `#19B5FF` | Blue accent       |
| `--background`  | `#050505` | Page background   |
| `--card`        | `#10161D` | Card backgrounds  |
| `--foreground`  | `#F5F7FA` | Main text         |
| `--success`     | `#2AD67A` | Success states    |
| `--destructive` | `#FF4D4D` | Errors            |

# Claude Workspace

## Read first

Always read these files before doing design or audit work:

- ./context/project-context.md
- ./context/business-rules.md
- ./context/design-principles.md

These files are the source of truth for:

- product context
- business constraints
- design expectations
- UX principles
- domain rules

Do not skip them.

## Main agents

Primary agents for UX work:

- ux-interface-orchestrator
- ux-auditor-orchestrator

## When to use each agent

### Use `ux-interface-orchestrator` when the user asks to:

- create a new interface
- redesign a screen
- propose a flow
- generate structure, wireframes or UI direction
- define layout, components or interaction model

### Use `ux-auditor-orchestrator` when the user asks to:

- audit a screen, flow or product
- evaluate usability
- detect friction, anti-patterns or UX risks
- review accessibility, microcopy or IA
- prioritize UX findings and recommendations

## Available skills

- behavioral-ux
- creative-ui-landing
- ia-ux-architect
- ui-master-audit
- ux-accessibility-ergonomics
- ux-core-cognitive-biases
- ux-engagement
- ux-iso-ieee
- ux-klm-goms
- ux-microcopy-audit
- ux-ui-patterns
- zero-ui-game-ux
- ux-narrative-hero-journey
- cx-digital-experience

## Skill selection rules

Do not use all skills at once.
Select only the skills that materially improve the task.

### For interface creation

Prioritize:

- ia-ux-architect
- ux-ui-patterns
- ui-master-audit
- ux-accessibility-ergonomics
- ux-microcopy-audit

Add only if relevant:

- behavioral-ux
- ux-engagement
- zero-ui-game-ux
- creative-ui-landing
- ux-narrative-hero-journey
- cx-digital-experience

### For UX audits

Prioritize:

- ux-ui-patterns
- ux-accessibility-ergonomics
- ux-microcopy-audit
- ia-ux-architect
- ux-klm-goms
- ux-iso-ieee

Add only if relevant:

- behavioral-ux
- ux-core-cognitive-biases
- ux-engagement
- zero-ui-game-ux
- ux-narrative-hero-journey
- ui-master-audit
- cx-digital-experience

## Agent behavior

When asked to create an interface:

1. Read context files
2. Identify product, user, device and flow type
3. Select only relevant skills
4. Build structure and task flow first
5. Refine with interaction patterns, microcopy, accessibility and visual quality
6. Self-audit before final output

When asked to audit an interface or flow:

1. Read context files
2. Identify the user goal and task being evaluated
3. Detect which UX layers need review:
   - UI
   - IA
   - accessibility
   - microcopy
   - efficiency
   - behavioral design
   - CX
4. Select only the relevant skills
5. Produce evidence-based findings
6. Prioritize by severity and impact
7. Recommend concrete actions, not generic advice

## Audit output format

When using `ux-auditor-orchestrator`, always return:

- Executive summary
- Prioritized findings
- Evidence
- Why it is a problem
- User impact
- Business impact
- Severity
- Recommendation
- Quick wins
- Strategic improvements
- Skills used and why

## Quality bar

Always:

- be specific
- justify findings
- connect recommendations to evidence
- avoid generic UX advice
- avoid theory dumping
- prioritize actionable output
