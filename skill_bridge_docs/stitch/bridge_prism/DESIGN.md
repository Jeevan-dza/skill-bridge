# Design System Specification: The Cognitive Atelier

## 1. Overview & Creative North Star
**Creative North Star: The Cognitive Atelier**
This design system rejects the "cookie-cutter" SaaS aesthetic in favor of a high-end editorial experience. Rather than a rigid grid of boxes, the UI is treated as a curated workspace—a digital atelier where AI-driven insights are presented with the clarity of a premium broadsheet and the fluid depth of modern glassmorphism. 

We move beyond "standard" UI by employing **intentional asymmetry** and **tonal layering**. By favoring white space as a structural element rather than a "gap," we create an environment that feels authoritative, professional, and calm. The goal is to make the user feel like they are interacting with a sophisticated mentor, not just a software tool.

---

## 2. Colors & Surface Architecture

The palette is rooted in Indigo and Purple to convey intelligence and growth, balanced by Cyan for technical precision. 

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders (`outline`) for sectioning content. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a sidebar using `surface-container-low` should sit directly against a `surface` background without a dividing line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of frosted glass. 
- **Base Layer:** `surface` (#f7f9fb)
- **Secondary Workspace:** `surface-container-low` (#f2f4f6)
- **Elevated Insights (Cards):** `surface-container-lowest` (#ffffff)
- **Active Overlays:** `surface-bright` (#f7f9fb)

### The "Glass & Gradient" Rule
To escape the "flat" trap, use **Glassmorphism** for floating elements (e.g., navigation bars, floating action buttons).
- **Glass Specs:** `surface` color at 70% opacity with a `24px` backdrop-blur.
- **Signature Textures:** Use a subtle linear gradient for Primary CTAs: `primary` (#4648d4) to `primary-container` (#6063ee) at a 135° angle. This adds "visual soul" and a sense of tactile depth.

---

## 3. Typography: Editorial Authority

We use **Inter** exclusively, but we manipulate the scale to create a hierarchy that feels like a high-end publication.

*   **Display (Display-LG/MD):** Used for "Aha!" moments and high-level skill metrics. Tighten letter-spacing by `-0.02em` to create a "dense" professional look.
*   **Headlines (Headline-SM):** Use for module titles. These should have ample top-margin (`spacing-12`) to allow the content to breathe.
*   **Body (Body-LG/MD):** The workhorse. Maintain a line-height of `1.6` for long-form learning content to ensure maximum readability and a premium "book-like" feel.
*   **Labels (Label-SM):** Always uppercase with `0.05em` letter-spacing when used for category tags or micro-copy.

---

## 4. Elevation & Depth: Tonal Layering

Depth is achieved through "stacking" rather than traditional drop shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` (White) card on a `surface-container-low` (Light Slate) background. This creates a soft, natural lift that mimics fine stationery.
*   **Ambient Shadows:** For floating modals or "active" cards, use a shadow with a blur of `40px` and an opacity of `4%`. The shadow color should be a tinted version of `primary` (Indigo) rather than black, creating a "glow" rather than a "drop."
*   **The Ghost Border:** If a boundary is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.
*   **Roundedness Scale:** 
    *   **Cards/Large Containers:** `xl` (1.5rem) to soften the professional edge.
    *   **Buttons/Inputs:** `md` (0.75rem) for a precise, modern feel.

---

## 5. Components

### Buttons
*   **Primary:** Indigo-to-Purple gradient, `md` roundedness, white text. On hover, increase the gradient saturation.
*   **Secondary:** Ghost-style. No background, `outline-variant` (at 20% opacity) border. 
*   **Tertiary:** Text-only, using `primary` color with an underline that only appears on hover.

### Inputs & Form Fields
*   **Styling:** No borders. Use `surface-container-high` as the background fill. Upon focus, the background shifts to `surface-container-lowest` with a 2px `primary` bottom-stroke.
*   **Checkboxes/Radios:** Use `primary` for active states. The "Unchecked" state should be a subtle `surface-container-highest` fill, never an empty outline.

### Data Visualization (The Signature)
*   **Radar Charts:** Use `tertiary` (Cyan) for the data area with a 20% opacity fill. The grid lines of the radar should use `outline-variant` at 10% opacity.
*   **Circular Gauges:** Use a thick stroke-width. The "track" of the gauge should be `surface-container-highest`, while the "progress" is a `primary` to `secondary` gradient.
*   **Progress Bars:** 8px height, `full` roundedness. Use `surface-container-high` for the track and `primary` for the fill.

### Cards & Lists
*   **Rule:** Forbid divider lines. Use `spacing-6` (1.5rem) of vertical white space to separate list items. 
*   **Hover State:** Cards should not move upward. Instead, they should transition their background from `surface-container-lowest` to `surface-bright` and increase shadow spread.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts (e.g., a wide radar chart next to a narrow list of insights).
*   **Do** use "Negative Space as Structure." If a section feels cluttered, increase the padding rather than adding a border.
*   **Do** use the `tertiary` (Cyan) color sparingly for "AI-generated" hints or highlights.

### Don't:
*   **Don't** use pure black (#000000) for text. Always use `on-surface` (#191c1e) to maintain a soft editorial feel.
*   **Don't** use standard 1px borders. If you feel you need a line, try using a background color contrast of 2% first.
*   **Don't** use sharp corners. Everything in this system should feel approachable and organic, yet structured.