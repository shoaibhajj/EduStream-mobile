import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "../../lib/i18n";
import { getLessonById } from "../../lib/mock-data/student";
import { AppText, LoadingScreen, ScreenContainer } from "../../components/ui";
import type { Lesson } from "../../lib/types";

export default function WatchScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getLessonById(lessonId);
      setLesson(data);
      setLoading(false);
    }
    load();
  }, [lessonId]);

  if (loading) return <LoadingScreen />;

  return (
    <ScreenContainer>
      <View className="flex-1 bg-background">
        {/* Back button */}
        <TouchableOpacity
          className="px-4 pt-4 pb-2 self-start"
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <AppText variant="muted" className="text-accent">
            ← {t("student.lessons_header")}
          </AppText>
        </TouchableOpacity>

        {/* Video placeholder */}
        <View className="mx-4 h-52 rounded-2xl bg-surface-secondary items-center justify-center mb-6">
          <AppText className="text-5xl mb-2">▶</AppText>
          <AppText variant="muted">
            {t("student.watch_placeholder_note")}
          </AppText>
        </View>

        {/* Lesson metadata */}
        <View className="px-4">
          <AppText variant="sectionTitle" className="mb-1">
            {lesson?.title ?? t("student.watch_screen_title")}
          </AppText>

          {lesson && (
            <View className="flex-row items-center mt-2 gap-x-4">
              <AppText variant="muted">
                {t("student.watch_lesson_order")}: {lesson.orderIndex}
              </AppText>
              {lesson.durationSeconds !== null && (
                <AppText variant="muted">
                  {Math.floor(lesson.durationSeconds / 60)}{" "}
                  {t("student.duration_minutes")}
                </AppText>
              )}
            </View>
          )}

          <AppText variant="muted" className="mt-4">
            {t("student.watch_coming_soon")}
          </AppText>
        </View>
      </View>
    </ScreenContainer>
  );
}
