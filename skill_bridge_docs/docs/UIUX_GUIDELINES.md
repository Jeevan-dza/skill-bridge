# SkillBridge UI/UX Guidelines

## Brand Identity

- **Platform Name:** SkillBridge
- **Primary Colors:**
  - Indigo: `#6366F1` (primary)
  - Violet: `#8B5CF6` (secondary)
  - Cyan: `#06B6D4` (tertiary)
  - Emerald: `#10B981` (success)
- **Typography:** Inter font (Google Fonts)
- **Logo:** Wordmark with gradient (indigo → violet)

## Spacing System

- 4px base grid (Tailwind scale: 0.5, 1, 2, 4, 6, 8, 12, 16, 20, 24, 32)
- Section padding: `p-6`, `p-8`, `p-12`
- Card padding: `p-4`, `p-6`
- Grid gap: `gap-4`, `gap-6`, `gap-8`

## Component Styles

- **Cards:** `bg-surface-container-lowest p-6 rounded-xl shadow-sm border`
- **Buttons:**
  - Primary: `bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all`
  - Secondary: `border border-outline-variant text-on-surface rounded-md font-bold hover:bg-surface-container-low transition-all`
- **Inputs:** `w-full px-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all`
- **Badges/Chips:** `px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full`
- **Progress Bars:** `h-2 w-full bg-surface-container-high rounded-full overflow-hidden`
- **Radar Chart:** Custom SVG, styled with `bg-primary/20`, `border-primary`, `text-xs`
- **Circular Score Meter:** SVG/Canvas, `stroke-primary`, `stroke-secondary`, `text-4xl font-black`

## Page Layouts

- **Landing Page:** Hero, features, testimonials, CTA, footer
- **Login/Signup:** Split layout, branding left, form right
- **Onboarding:** Stepper, cards, progress bar, resume uploader
- **Dashboard:** Sidebar, stat cards, radar chart, learning path timeline
- **Skill Gap Analysis:** Sidebar, gap summary, table, radar chart, recommendations
- **Learning Path:** Sidebar, modules, resources, mentor card
- **Job Readiness Score:** Sidebar, score gauge, gap/strength cards, breakdown table

## Sidebar Navigation Specs

- Fixed left, `w-64`, `bg-slate-50`, `flex flex-col p-4 gap-2`
- Active state: `bg-white text-indigo-600 rounded-xl shadow-sm`
- Icons: Material Symbols, `text-2xl`

## Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` for cards
- Hide/show with `hidden md:block`, etc.

## Accessibility Guidelines

- All text meets WCAG AA contrast
- Focus states: `focus:ring-2 focus:ring-primary/20`
- All interactive elements tabbable
- Semantic HTML, ARIA labels for custom components
- Alt text for all images/icons

---

**Reference:** See `/uiux_guidelines/` for full design tokens, spacing, and page-specific specs.
