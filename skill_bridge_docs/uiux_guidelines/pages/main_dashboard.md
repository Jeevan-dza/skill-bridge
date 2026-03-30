# Main Dashboard UI/UX Guidelines

## 1. Page Purpose

User’s personalized dashboard: stats, insights, learning path, and navigation.

## 2. Section Breakdown

- Sidebar nav (profile, links)
- Header: greeting, date, actions
- Stat cards (readiness, skills, courses, jobs)
- Insights (skill radar, readiness analysis)
- Learning path timeline
- Footer

## 3. UI Hierarchy

1. Stat cards
2. Insights (radar, readiness)
3. Learning path
4. Navigation/sidebar

## 4. Components Used

- Sidebar nav
- Stat cards
- Radar chart
- Progress bars
- Skill chips
- Timeline cards
- Footer

## 5. Layout System

- `flex` for sidebar/main
- `ml-64` for main offset
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` for stat cards
- `gap-6`, `gap-8` for spacing

## 6. Tailwind Utility Mapping

- Colors: `bg-surface`, `bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-surface-container-lowest`
- Typography: `text-3xl font-extrabold`, `text-xs font-bold uppercase`
- Spacing: `p-8`, `mb-10`, `gap-6`, `rounded-xl`

## 7. Spacing + Alignment

- Section: `p-8`, `mb-10`
- Cards: `p-6`, `mb-4`
- Timeline: `min-w-[280px]`, `rounded-xl`

## 8. Color Usage

- Primary: #4648d4, Secondary: #6b38d4, Tertiary: #006577
- Surface: #f7f9fb, White for cards

## 9. Typography

- Headings: `text-3xl font-extrabold`
- Labels: `text-xs font-bold uppercase`
- Body: `font-body`

## 10. Interaction

- Buttons: `hover:bg-primary-container`, `active:scale-95`
- Cards: `hover:shadow-md`
- Timeline: `hover:bg-surface-bright`

## 11. Responsive

- Sidebar collapses on mobile
- Stat cards: `grid-cols-1` on mobile, `lg:grid-cols-4` on desktop
- Padding adapts: `p-8`

## 12. Accessibility

- All nav links tabbable
- Charts have aria-label
- Color contrast for all text

## 13. Example JSX

```jsx
<aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-4 gap-2">{/* ... */}</aside>
<main className="ml-64 flex-1 p-8 overflow-y-auto">{/* ... */}</main>
```
