import { TouchableOpacity } from "react-native";
import { AppText } from "./AppText";
import type { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  label: string; // Must be a translated string — pass t("key") here
}

export function PrimaryButton({ label, className = "", ...props }: Props) {
  return (
    <TouchableOpacity
      className={`bg-accent rounded-md px-4 py-2 items-center active:opacity-70 ${className}`.trim()}
      accessibilityRole="button"
      {...props}
    >
      <AppText variant="body" className="text-white font-medium">
        {label}
      </AppText>
    </TouchableOpacity>
  );
}
