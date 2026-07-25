import { View } from "react-native";
import { AppText } from "./AppText";

type BadgeVariant = "preview" | "confirmed" | "pending" | "locked";

const badgeClass: Record<BadgeVariant, { container: string; text: string }> = {
  preview: { container: "bg-accent-light", text: "text-accent" },
  confirmed: { container: "bg-success-light", text: "text-success" },
  pending: { container: "bg-orange-100", text: "text-warning" },
  locked: { container: "bg-surface-secondary", text: "text-locked" },
};

interface Props {
  variant: BadgeVariant;
  label: string; // Must be a translated string — pass t("key") here
}

export function StatusBadge({ variant, label }: Props) {
  const { container, text } = badgeClass[variant];
  return (
    <View className={`px-2 py-0.5 rounded-full ${container}`}>
      <AppText variant="muted" className={`font-medium ${text}`}>
        {label}
      </AppText>
    </View>
  );
}
