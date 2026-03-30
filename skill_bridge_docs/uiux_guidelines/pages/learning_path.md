# Learning Path UI/UX Guidelines

## 1. Page Purpose

Show user’s personalized learning roadmap, modules, and resources.

## 2. Section Breakdown

- Sidebar nav
- Header: title, progress
- Path overview (phases)
- Curriculum modules (cards)
- Resources panel
- Mentor spotlight
- Footer

## 3. UI Hierarchy

1. Path progress/overview
2. Module cards
3. Resources/mentor
4. Navigation/sidebar

## 4. Components Used

- Sidebar nav
- Progress bars
- Module cards
- Resource cards
- Mentor card
- Footer

## 5. Layout System

- `flex` for sidebar/main
- `ml-64` for main offset
- `grid grid-cols-1 md:grid-cols-2` for modules
- `max-w-[1200px] mx-auto p-12` for main

## 6. Tailwind Utility Mapping

- Colors: `bg-background`, `bg-primary`, `bg-secondary`, `bg-tertiary`, `bg-surface-container-lowest`
- Typography: `text-4xl font-extrabold`, `text-xs font-black uppercase`
- Spacing: `p-12`, `gap-10`, `space-y-10`, `rounded-xl`

## 7. Spacing + Alignment

- Section: `p-12`, `mb-12`
- Cards: `p-6`, `gap-4`
- Progress: `h-2 w-full`, `rounded-full`

## 8. Color Usage

- Primary: #4648d4, Secondary: #6b38d4, Tertiary: #006577
- Surface: #f7f9fb, White for cards

## 9. Typography

- Headings: `text-4xl font-extrabold`
- Labels: `text-xs font-black uppercase`
- Body: `font-body`

## 10. Interaction

- Buttons: `hover:scale-[1.02]`, `transition-transform`
- Cards: `hover:bg-surface-bright`, `hover:shadow-md`
- Links: `hover:text-primary`

## 11. Responsive

- Sidebar collapses on mobile
- Modules/resources stack on mobile
- Padding adapts: `p-6 md:p-12`

## 12. Accessibility

- All nav links tabbable
- Progress bars have aria-label
- Color contrast for all text

## 13. Example JSX

```jsx
<aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-4 gap-2">{/* ... */}</aside>
<main className="ml-64 max-w-[1200px] mx-auto p-12">{/* ... */}</main>
```
