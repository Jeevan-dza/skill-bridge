# 📱 Responsiveness

## Breakpoints (Tailwind)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Patterns

- Use `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` for cards
- `hidden md:block` to show/hide elements
- `flex-col md:flex-row` for stacking
- `p-6 md:p-12` for adaptive padding
- `text-3xl md:text-5xl` for headings

## Mobile

- All layouts must be single-column by default
- Navigation collapses to top bar or drawer
- Buttons and inputs are full-width

## Tablet

- Use two-column layouts for main content
- Sidebars may be hidden or collapsible

## Desktop

- Multi-column layouts, persistent sidebars
- Max container width: `max-w-7xl`

## Do’s

- Use Tailwind’s responsive utilities everywhere
- Test all breakpoints for every component

## Don’ts

- Don’t use fixed px widths for layout
- Don’t hide essential content on mobile
