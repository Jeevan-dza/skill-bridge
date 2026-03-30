# Auth Page UI/UX Guidelines

## 1. Page Purpose

User authentication (sign in) with brand storytelling and social login.

## 2. Section Breakdown

- Left: Editorial branding, illustration, logo (desktop only)
- Right: Auth form (email/password), Google login, links

## 3. UI Hierarchy

1. Welcome Back heading
2. Google Auth button
3. Email/password form
4. Sign In CTA
5. Sign Up link
6. Footer links

## 4. Components Used

- Logo/brand bar
- Google Auth button
- Input fields (email, password)
- Primary button
- Divider
- Footer links

## 5. Layout System

- `flex min-h-screen`
- `lg:flex-row` (split)
- `w-1/2` for left/right
- `max-w-md mx-auto` for form

## 6. Tailwind Utility Mapping

- Colors: `bg-surface`, `text-on-surface`, `bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]`
- Typography: `font-bold`, `text-3xl`, `uppercase`, `tracking-tight`
- Spacing: `p-6 md:p-12`, `space-y-10`, `gap-2`
- Buttons: `rounded-xl`, `shadow-lg`, `hover:brightness-110`

## 7. Spacing + Alignment

- Section padding: `p-12` (desktop), `p-6` (mobile)
- Form: `space-y-6`, `space-y-5` for fields
- Inputs: `px-4 py-3.5`

## 8. Color Usage

- Brand gradient left, white right
- Primary: #4648d4, Secondary: #6b38d4
- Surface: #f7f9fb, Outline: #c7c4d7

## 9. Typography

- Headings: `text-3xl font-extrabold`
- Labels: `text-xs font-bold uppercase tracking-widest`
- Body: `font-body`

## 10. Interaction

- Button: `hover:bg-surface-container-low`, `active:scale-[0.98]`
- Inputs: `focus:ring-2 focus:ring-primary/20`
- Links: `hover:underline`, `hover:text-primary-container`

## 11. Responsive

- Left branding hidden on mobile (`hidden lg:flex`)
- Form full width on mobile, centered on desktop
- Padding adapts: `p-6 md:p-12`

## 12. Accessibility

- All inputs have labels
- Button/links are tabbable
- Sufficient color contrast
- Alt text for images

## 13. Example JSX

```jsx
<main className="flex min-h-screen">
  {/* Branding (desktop only) */}
  <section className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-500 to-violet-500 p-12 flex-col justify-between">
    {/* ...branding... */}
  </section>
  {/* Auth Form */}
  <section className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 md:p-12">
    <div className="w-full max-w-md space-y-10">
      <h2 className="text-3xl font-extrabold text-on-surface text-center">
        Welcome Back
      </h2>
      <button className="w-full flex items-center gap-3 px-6 py-3.5 border border-outline-variant bg-white text-on-surface font-semibold rounded-xl hover:bg-surface-container-low transition-all duration-200 active:scale-[0.98] shadow-sm">
        {/* Google Icon */} Continue with Google
      </button>
      <form className="space-y-6">
        <div className="space-y-5">
          <label
            className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="w-full px-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-on-surface placeholder:text-outline/60"
            id="email"
            name="email"
            type="email"
          />
          {/* ...password... */}
        </div>
        <button
          className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 active:scale-[0.99] transition-all duration-200"
          type="submit"
        >
          Sign In
        </button>
      </form>
      {/* ...footer links... */}
    </div>
  </section>
</main>
```
