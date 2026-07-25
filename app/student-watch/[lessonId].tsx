import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { t } from "../../lib/i18n";

export default function WatchScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-base font-semibold text-text-primary mb-2">
        {t("student.watch_screen_title")}
      </Text>
      <Text className="text-sm text-text-muted mb-4">
        {t("student.watch_coming_soon")}
      </Text>
      <Text className="text-xs text-text-muted">Lesson ID: {lessonId}</Text>
    </View>
  );
}
