import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Use "scroll" when content is scrollable; defaults to full-flex fill */
  padded?: boolean;
}

export function ScreenContainer({ children, padded = false }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className={`flex-1${padded ? " px-4 pt-4" : ""}`}>{children}</View>
    </SafeAreaView>
  );
}
