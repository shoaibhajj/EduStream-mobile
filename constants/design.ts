// constants/design.ts
// Shared design tokens — spacing, radius, typography sizes.
// Colors live in tailwind.config.js; reference them via NativeWind className only.
// These are for StyleSheet / contentContainerStyle contexts where className isn't available.

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
} as const;

export const Radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const FontSize = {
  xs: 12, // secondary labels
  sm: 14, // body / list items
  base: 16, // section titles / medium weight
  lg: 18, // price / emphasized
} as const;

export const FontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};
