# EduStream Mobile — UI Context

Repo: https://github.com/shoaibhajj/EduStream-mobile.git

## Design Tokens

Use NativeWind tokens in `tailwind.config.js`. Never hardcode hex colors inside components.

```js
colors: {
  background: "#F6F7FB",
  surface: "#FFFFFF",
  "surface-secondary": "#F9FAFB",
  border: "#E7EAF3",
  "text-primary": "#101828",
  "text-secondary": "#6A7282",
  "text-muted": "#99A1AF",
  accent: "#7C5CFC",
  "accent-light": "#F3E8FF",
  success: "#10B981",
  "success-light": "#D0FAE5",
  warning: "#FF8904",
  error: "#EF4444",
  locked: "#99A1AF"
}
```

## Layout Rules

- Mobile-first only.
- Use generous spacing and simple vertical flow.
- Student navigation: Home, My Courses, Profile.
- Teacher navigation: Dashboard, Courses, Payments, Profile.

## Typography

- Section title: `text-base font-semibold text-text-primary`
- Body text: `text-sm font-medium text-text-primary`
- Secondary text: `text-xs text-text-muted`
- Price: `text-lg font-bold text-accent`

## Component Rules

### Cards
- `bg-surface border border-border rounded-xl p-4`

### Primary Button
- `bg-accent text-white rounded-md px-4 py-2 font-medium`

### Secondary Button
- `bg-surface border border-border text-text-primary rounded-md px-4 py-2`

### Badges
- Preview: `bg-accent-light text-accent`
- Confirmed: `bg-success-light text-success`
- Pending: `bg-orange-100 text-warning`
- Locked: `bg-surface-secondary text-locked`

## Lesson List Rules

- Free preview lesson shows play icon and accent styling.
- Locked lesson shows lock icon and muted styling.
- Lesson rows should be easy to tap.

## Empty States

Every empty screen must have:
- short descriptive text
- optional icon
- CTA only if there is a clear next action

## Do Nots

- Do not use raw Tailwind default color classes.
- Do not hardcode styles inline unless there is no alternative.
- Do not use more than one strong accent color in the same screen.
