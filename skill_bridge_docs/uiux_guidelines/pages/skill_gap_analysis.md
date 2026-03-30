# Skill Gap Analysis UI/UX Guidelines

## 1. Page Purpose

Show user’s current vs required skills, gaps, and recommended next steps.

## 2. Section Breakdown

- Sidebar nav
- Header: title, role, change role
- Gap summary banner (total, have, to learn)
- Competency table
- Radar chart
- Recommendations
- Footer

## 3. UI Hierarchy

1. Gap summary banner
2. Competency table
3. Radar chart
4. Recommendations
5. Navigation/sidebar

## 4. Components Used

- Sidebar nav
- Stat banners
- Table
- Radar chart
- Recommendation cards
- Footer

## 5. Layout System

- `flex` for sidebar/main
- `ml-64` for main offset
- `grid grid-cols-1 md:grid-cols-3` for banners
- `grid grid-cols-12` for table/chart split
- `gap-6`, `gap-8` for spacing

## 6. Tailwind Utility Mapping

- Colors: `bg-surface`, `bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-surface-container-lowest`
- Typography: `text-4xl font-extrabold`, `text-xs font-bold uppercase`
- Spacing: `p-12`, `mb-12`, `gap-6`, `rounded-xl`

## 7. Spacing + Alignment

- Section: `p-12`, `mb-12`
- Cards: `p-6`, `gap-4`
- Table: `px-6 py-4`

## 8. Color Usage

- Primary: #4648d4, Secondary: #6b38d4, Tertiary: #006577
- Surface: #f7f9fb, White for cards

## 9. Typography

- Headings: `text-4xl font-extrabold`
- Labels: `text-xs font-bold uppercase`
- Body: `font-body`

## 10. Interaction

- Buttons: `hover:bg-primary-container`, `active:scale-95`
- Cards: `hover:shadow-md`
- Table rows: `hover:bg-slate-50`

## 11. Responsive

- Sidebar collapses on mobile
- Banners: `grid-cols-1` on mobile, `md:grid-cols-3` on desktop
- Table/chart: `grid-cols-1` on mobile, `grid-cols-12` on desktop

## 12. Accessibility

- All nav links tabbable
- Charts have aria-label
- Color contrast for all text

## 13. Example JSX

```jsx
<aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-4 gap-2">{/* ... */}</aside>
<main className="ml-64 min-h-screen p-12">{/* ... */}</main>
```
