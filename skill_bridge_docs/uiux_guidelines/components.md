# 🧱 Components Library

## Buttons

- Primary: `bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all`
- Secondary: `border border-outline-variant text-on-surface rounded-md font-bold hover:bg-surface-container-low transition-all`
- Icon: `flex items-center gap-2 px-4 py-2`

## Cards

- `bg-surface-container-lowest p-6 rounded-xl shadow-sm border`
- Use `border-l-4` for status (e.g., error, success)

## Navbars

- Top nav: `fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm`
- Sidebar: `w-64 fixed left-0 top-0 bg-slate-50 flex flex-col p-4 gap-2`

## Inputs

- `w-full px-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all`

## Chips/Tags

- `px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full`
- Status: `bg-error/10 text-error`, `bg-tertiary/10 text-tertiary`, etc.

## Progress Bars

- `h-2 w-full bg-surface-container-high rounded-full overflow-hidden`
- Use inner div for progress: `bg-primary h-full` (width via style)

## Modals

- `fixed inset-0 bg-black/40 flex items-center justify-center z-50`
- Modal box: `bg-white rounded-2xl p-8 shadow-xl`

## Do’s

- Use only Tailwind classes for all components
- Compose complex UIs from atomic components

## Don’ts

- Don’t use custom CSS for component structure
- Don’t duplicate component code; use variants
