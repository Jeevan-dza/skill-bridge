# ✍️ Typography System

## Font Family

- `Inter`, sans-serif (all text)
- Tailwind: `font-headline`, `font-body`, `font-label`

## Font Weights

- 300: Light
- 400: Regular
- 500: Medium
- 600: SemiBold
- 700: Bold
- 800: ExtraBold
- 900: Black

## Font Sizes (rem/px)

| Class     | Size            | Usage            |
| --------- | --------------- | ---------------- |
| text-xs   | 0.75rem / 12px  | Captions, labels |
| text-sm   | 0.875rem / 14px | Secondary text   |
| text-base | 1rem / 16px     | Body text        |
| text-lg   | 1.125rem / 18px | Subheadings      |
| text-xl   | 1.25rem / 20px  | Card titles      |
| text-2xl  | 1.5rem / 24px   | Section titles   |
| text-3xl  | 1.875rem / 30px | Page titles      |
| text-4xl  | 2.25rem / 36px  | Hero headings    |
| text-5xl  | 3rem / 48px     | Hero headings    |
| text-6xl  | 3.75rem / 60px  | Hero numbers     |
| text-7xl  | 4.5rem / 72px   | Hero numbers     |

## Letter Spacing

- `tracking-tight`, `tracking-wider`, `tracking-widest`

## Line Height

- `leading-tight`, `leading-relaxed`, `leading-loose`

## Do’s

- Use only Inter for all text
- Use Tailwind font utilities for all weights/sizes
- Use uppercase for labels and navigation

## Don’ts

- Don’t use system fonts or other families
- Don’t hardcode px in CSS, use Tailwind classes
