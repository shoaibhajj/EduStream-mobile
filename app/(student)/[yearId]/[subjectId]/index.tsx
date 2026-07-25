import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import type { Course } from "../../../../lib/types";
import { getCoursesBySubject } from "../../../../lib/mock-data/student";
import { t } from "../../../../lib/i18n";
import {
  AppText,
  Card,
  EmptyState,
  LoadingScreen,
  StatusBadge,
} from "../../../../components/ui";
import { Spacing } from "../../../../constants/design";

export default function CoursesScreen() {
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const data = await getCoursesBySubject(subjectId);
        setCourses(data);
      } catch (e) {
        setError(t("student.error_load_courses"));
        console.error(
          "[student/[yearId]/[subjectId]] failed to load courses",
          e
        );
      } finally {
        setLoading(false);
      }
    }

    if (subjectId) load();
  }, [subjectId]);

  if (loading) return <LoadingScreen />;

  if (error) return <EmptyState message={error} />;

  if (courses.length === 0) {
    return <EmptyState message={t("student.no_courses")} />;
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: Spacing.base }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 active:opacity-70"
            accessibilityRole="button"
            onPress={() => router.push(`/(student)/course/${item.id}`)}
          >
            <Card>
              <View className="flex-row justify-between items-start">
                <AppText
                  variant="sectionTitle"
                  className="flex-1 mr-2"
                  numberOfLines={2}
                >
                  {item.title}
                </AppText>

                {item.isFree && (
                  <StatusBadge
                    variant="preview"
                    label={t("student.badge_preview")}
                  />
                )}
              </View>

              <AppText variant="muted" className="mt-1">
                {item.teacherName}
              </AppText>

              <View className="flex-row justify-between items-center mt-2">
                <AppText variant="muted">
                  {item.lessonCount} {t("student.lesson_count")}
                </AppText>

                <AppText variant="price">
                  {item.price.toLocaleString("ar-SA")}{" "}
                  {t("student.price_suffix")}
                </AppText>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
