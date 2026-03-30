# Onboarding Flow UI/UX Guidelines

## 1. Page Purpose

Personalized onboarding: goal selection, skill assessment, resume upload.

## 2. Section Breakdown

- Top nav (branding, progress)
- Step 1: Career goal selection
- Step 2: Skill self-assessment
- Step 3: Resume upload
- Footer

## 3. UI Hierarchy

1. Step progress
2. Current step content
3. CTA button
4. Navigation

## 4. Components Used

- Top nav
- Step progress bar
- Option cards
- Star rating
- Upload box
- Footer

## 5. Layout System

- `max-w-7xl mx-auto px-6` for main
- `grid grid-cols-1 md:grid-cols-3` for options
- `flex flex-col md:flex-row` for steps

## 6. Tailwind Utility Mapping

- Colors: `bg-background`, `bg-primary`, `bg-surface-container-lowest`, `bg-surface-container-low`, `border-outline-variant`
- Typography: `text-4xl font-extrabold`, `text-xs font-bold uppercase`
- Spacing: `p-6`, `mb-12`, `gap-6`, `rounded-xl`

## 7. Spacing + Alignment

- Section: `p-6`, `mb-12`
- Cards: `p-6`, `gap-4`
- Upload: `p-12`, `rounded-2xl`

## 8. Color Usage

- Primary: #4648d4, Secondary: #6b38d4, Tertiary: #006577
- Surface: #f7f9fb, White for cards

## 9. Typography

- Headings: `text-4xl font-extrabold`
- Labels: `text-xs font-bold uppercase`
- Body: `font-body`

## 10. Interaction

- Buttons: `hover:scale-[1.02]`, `transition-transform`
- Cards: `hover:bg-surface-bright`, `hover:shadow-md`
- Upload: `hover:border-primary`, `hover:shadow-xl`

## 11. Responsive

- Steps stack on mobile
- Options: `grid-cols-1` on mobile, `md:grid-cols-3` on desktop
- Padding adapts: `p-6 md:p-12`

## 12. Accessibility

- All nav/CTA links tabbable
- Inputs have labels
- Color contrast for all text

## 13. Example JSX

```jsx
<nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">{/* ... */}</div>
</nav>
<main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">{/* ...steps... */}</main>
```
