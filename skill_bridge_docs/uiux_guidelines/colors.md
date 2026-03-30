# 🎨 Color System

## Brand Palette (Tailwind Tokens)

| Token                      | HEX     | Usage                           |
| -------------------------- | ------- | ------------------------------- |
| primary                    | #4648d4 | Main brand, CTAs, highlights    |
| primary-container          | #6063ee | Button gradients, backgrounds   |
| secondary                  | #6b38d4 | Accents, secondary CTAs         |
| secondary-container        | #8455ef | Secondary backgrounds           |
| tertiary                   | #006577 | Info, tertiary accents          |
| tertiary-container         | #008096 | Info backgrounds                |
| error                      | #ba1a1a | Errors, destructive actions     |
| error-container            | #ffdad6 | Error backgrounds               |
| background                 | #f7f9fb | App background                  |
| surface                    | #f7f9fb | Card, panel backgrounds         |
| surface-container          | #eceef0 | Card, panel backgrounds         |
| surface-container-low      | #f2f4f6 | Card, panel backgrounds         |
| surface-container-high     | #e6e8ea | Card, panel backgrounds         |
| surface-container-highest  | #e0e3e5 | Card, panel backgrounds         |
| surface-bright             | #f7f9fb | Lightest surfaces               |
| surface-dim                | #d8dadc | Dimmed surfaces                 |
| surface-variant            | #e0e3e5 | Variant backgrounds             |
| outline                    | #767586 | Borders, outlines               |
| outline-variant            | #c7c4d7 | Subtle borders                  |
| on-primary                 | #ffffff | Text on primary                 |
| on-secondary               | #ffffff | Text on secondary               |
| on-tertiary                | #ffffff | Text on tertiary                |
| on-surface                 | #191c1e | Main text                       |
| on-surface-variant         | #464554 | Secondary text                  |
| on-background              | #191c1e | Text on background              |
| inverse-primary            | #c0c1ff | Inverse highlights              |
| inverse-surface            | #2d3133 | Inverse backgrounds             |
| inverse-on-surface         | #eff1f3 | Inverse text                    |
| primary-fixed              | #e1e0ff | Light backgrounds               |
| primary-fixed-dim          | #c0c1ff | Dimmed backgrounds              |
| secondary-fixed            | #e9ddff | Light backgrounds               |
| secondary-fixed-dim        | #d0bcff | Dimmed backgrounds              |
| tertiary-fixed             | #acedff | Light backgrounds               |
| tertiary-fixed-dim         | #4cd7f6 | Dimmed backgrounds              |
| on-primary-fixed           | #07006c | Text on fixed primary           |
| on-primary-fixed-variant   | #2f2ebe | Text on fixed primary variant   |
| on-secondary-fixed         | #23005c | Text on fixed secondary         |
| on-secondary-fixed-variant | #5516be | Text on fixed secondary variant |
| on-tertiary-fixed          | #001f26 | Text on fixed tertiary          |
| on-tertiary-fixed-variant  | #004e5c | Text on fixed tertiary variant  |
| on-error                   | #ffffff | Text on error                   |
| on-error-container         | #93000a | Text on error container         |

## Gradients

- `bg-gradient-to-br from-primary to-primary-container`
- `bg-gradient-to-r from-indigo-600 to-violet-700`
- `bg-gradient-to-br from-secondary to-primary`

## Do’s

- Use only Tailwind tokens for all color assignments
- Maintain high contrast for text (WCAG AA)
- Use gradients for CTAs and hero sections

## Don’ts

- Don’t use raw HEX outside tokens
- Don’t mix non-design-system colors
