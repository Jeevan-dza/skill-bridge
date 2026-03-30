# ♿ Accessibility (a11y)

## Color Contrast

- Ensure all text meets WCAG AA contrast
- Use only design system colors

## Focus States

- Use `focus:ring-2 focus:ring-primary/20` for all inputs/buttons
- Never remove focus outlines

## Keyboard Navigation

- All interactive elements must be tabbable
- Use semantic HTML (button, nav, main, etc.)

## ARIA & Roles

- Use `aria-label`, `aria-current`, etc. for custom components
- Use `role="alert"` for error messages

## Alt Text

- All images/icons must have descriptive `alt` or `aria-label`

## Do’s

- Test with keyboard and screen readers
- Use Tailwind’s focus/outline utilities

## Don’ts

- Don’t use color as the only means of conveying info
- Don’t hide focus indicators
