import { View } from "react-native";
import { AppText } from "./AppText";
import { PrimaryButton } from "./PrimaryButton";

interface Props {
  message: string; // translated string
  ctaLabel?: string; // translated string — only if there's a clear next action
  onCta?: () => void;
}

export function EmptyState({ message, ctaLabel, onCta }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-6 py-10">
      <AppText variant="muted" className="text-center mb-4">
        {message}
      </AppText>
      {ctaLabel && onCta && <PrimaryButton label={ctaLabel} onPress={onCta} />}
    </View>
  );
}
