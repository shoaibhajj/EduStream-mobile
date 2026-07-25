import { Text } from "react-native";
import type { TextProps } from "react-native";

type Variant =
  | "sectionTitle" // text-base font-semibold text-text-primary
  | "body" // text-sm font-medium text-text-primary
  | "secondary" // text-sm text-text-secondary
  | "muted" // text-xs text-text-muted
  | "price" // text-lg font-bold text-accent
  | "error"; // text-base font-semibold text-error

const variantClass: Record<Variant, string> = {
  sectionTitle: "text-base font-semibold text-text-primary",
  body: "text-sm font-medium text-text-primary",
  secondary: "text-sm text-text-secondary",
  muted: "text-xs text-text-muted",
  price: "text-lg font-bold text-accent",
  error: "text-base font-semibold text-error",
};

interface Props extends TextProps {
  variant?: Variant;
}

export function AppText({ variant = "body", className = "", ...props }: Props) {
  return (
    <Text
      className={`${variantClass[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
