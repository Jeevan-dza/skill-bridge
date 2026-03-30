# Job Readiness Score UI/UX Guidelines

## 1. Page Purpose

Visualize user’s job readiness score, skill gaps, and strengths for a target role.

## 2. Section Breakdown

- Sidebar navigation
- Header: title, role, last updated
- Hero: circular score gauge
- Gaps/Strengths: split cards
- Score breakdown table
- CTA banner
- Footer

## 3. UI Hierarchy

1. Score gauge
2. Gaps/Strengths cards
3. Score breakdown table
4. CTA banner
5. Navigation/sidebar

## 4. Components Used

- Sidebar nav
- Score gauge (SVG/conic)
- Progress bars
- Cards (gap/strength)
- Table
- CTA banner
- Footer

## 5. Layout System

- `flex` for sidebar/main
- `ml-64` for main offset
- `grid grid-cols-1 lg:grid-cols-2` for split
- `p-8 lg:p-12` for main

## 6. Tailwind Utility Mapping

- Colors: `bg-surface`, `bg-primary`, `bg-error`, `bg-orange-500`, `bg-emerald-500`
- Typography: `text-4xl font-black`, `text-xs font-bold uppercase`
- Spacing: `p-10`, `mb-10`, `gap-10`, `space-y-4`
- Cards: `rounded-xl`, `border-l-4`, `shadow-sm`

## 7. Spacing + Alignment

- Section: `p-10`, `mb-10`
- Cards: `p-6`, `mb-4`
- Table: `px-6 py-4`

## 8. Color Usage

- Primary: #4648d4, Error: #ba1a1a, Orange: #ea580c, Emerald: #10b981
- Surface: #f7f9fb, Sidebar: #f8fafc

## 9. Typography

- Headings: `text-4xl font-black`
- Labels: `text-xs font-bold uppercase`
- Table: `text-sm`, `font-bold`

## 10. Interaction

- Buttons: `hover:bg-primary-container`, `active:scale-95`
- Cards: `hover:shadow-md`
- Table rows: `hover:bg-slate-50`

## 11. Responsive

- Sidebar collapses on mobile
- `grid-cols-1` on mobile, `lg:grid-cols-2` on desktop
- Padding adapts: `p-8 lg:p-12`

## 12. Accessibility

- All nav links tabbable
- Score gauge has aria-label
- Color contrast for all text

## 13. Example JSX

```jsx
<aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-4 gap-2">{/* ... */}</aside>
<main className="ml-64 min-h-screen p-8 lg:p-12">{/* ... */}</main>
```
