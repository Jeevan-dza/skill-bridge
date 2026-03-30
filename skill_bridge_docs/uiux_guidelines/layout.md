# 🧩 Layout System

## Containers

- `max-w-7xl mx-auto px-6` for main content
- `max-w-4xl`, `max-w-2xl` for focused sections
- Use `w-full` for fluid layouts

## Grid System

- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` for responsive cards
- `gap-4`, `gap-6`, `gap-8` for spacing
- Use `col-span-*` for custom spans

## Flexbox Patterns

- `flex flex-col` for vertical stacks
- `flex flex-row` for horizontal layouts
- `items-center`, `justify-between`, `gap-*` for alignment

## Sidebars

- `w-64 fixed left-0 top-0` for persistent nav
- `ml-64` for main content offset

## Responsive

- Use `md:`, `lg:`, `xl:` for breakpoints
- Hide/show with `hidden md:block`, etc.

## Do’s

- Use Tailwind grid/flex utilities only
- Use container queries for advanced layouts

## Don’ts

- Don’t use floats or absolute positioning for layout
- Don’t hardcode widths outside Tailwind scale
