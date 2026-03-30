# Landing Page UI/UX Guidelines

## 1. Page Purpose

Homepage for SkillBridge, introducing the platform and driving signups.

## 2. Section Breakdown

- Top nav bar
- Hero section (headline, CTA, illustration)
- How it works (steps)
- Features (bento grid)
- Testimonials
- CTA banner
- Footer

## 3. UI Hierarchy

1. Hero headline/CTA
2. How it works steps
3. Features grid
4. Testimonials
5. CTA banner
6. Navigation

## 4. Components Used

- Navbar (top)
- Hero (headline, CTA, image)
- Step cards
- Feature cards
- Testimonial cards
- CTA banner
- Footer

## 5. Layout System

- `max-w-7xl mx-auto px-6` for main
- `grid grid-cols-1 md:grid-cols-3` for features
- `flex flex-col sm:flex-row` for CTAs

## 6. Tailwind Utility Mapping

- Colors: `bg-surface`, `bg-gradient-to-br from-primary to-primary-container`, `text-on-surface`
- Typography: `text-5xl lg:text-7xl font-extrabold`, `text-lg`, `font-bold`
- Spacing: `pt-20 pb-32`, `py-24`, `gap-8`, `p-8`, `rounded-xl`

## 7. Spacing + Alignment

- Section: `py-24`, `pt-20 pb-32`
- Cards: `p-8`, `rounded-xl`, `gap-6`
- CTA: `px-8 py-4`, `gap-4`

## 8. Color Usage

- Primary: #4648d4, Secondary: #6b38d4, Tertiary: #006577
- Gradients for hero/CTA
- Surface: #f7f9fb, White for cards

## 9. Typography

- Headings: `text-5xl lg:text-7xl font-extrabold`
- Subheadings: `text-3xl font-bold`
- Body: `text-lg`, `font-medium`

## 10. Interaction

- Buttons: `hover:brightness-110`, `active:scale-95`
- Cards: `hover:shadow-md`, `hover:bg-surface-bright`
- Links: `hover:text-primary`

## 11. Responsive

- Nav collapses to hamburger on mobile
- Hero stacks vertically on mobile
- Features/testimonials: `grid-cols-1` on mobile, `md:grid-cols-3` on desktop

## 12. Accessibility

- All nav/CTA links tabbable
- Images have alt text
- Color contrast for all text

## 13. Example JSX

```jsx
<nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">{/* ... */}</div>
</nav>
<main className="pt-20">{/* ...sections... */}</main>
```
