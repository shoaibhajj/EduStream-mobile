import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {  useLocalSearchParams, useRouter } from "expo-router";
import type { Course } from "../../../../lib/types";
import { getCoursesBySubject } from "../../../../lib/mock-data/student";
import { t } from "../../../../lib/i18n";

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

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#7C5CFC" />
      </View>
    );

  if (error)
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-base font-semibold text-error">{error}</Text>
      </View>
    );

  if (courses.length === 0)
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-base font-semibold text-text-secondary">
          {t("student.no_courses")}
        </Text>
      </View>
    );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-surface border border-border rounded-xl p-4 mb-3 active:opacity-70"
            onPress={() => router.push(`/(student)/course/${item.id}`)}
          >
            <View className="flex-row justify-between items-start">
              <Text className="text-base font-semibold text-text-primary flex-1 mr-2">
                {item.title}
              </Text>
              {item.isFree && (
                <View className="bg-accent-light rounded-full px-2 py-0.5">
                  <Text className="text-xs text-accent font-medium">
                    {t("student.badge_preview")}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-xs text-text-muted mt-1">
              {item.teacherName}
            </Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-xs text-text-muted">
                {item.lessonCount} {t("student.lesson_count")}
              </Text>
              <Text className="text-lg font-bold text-accent">
                {item.price.toLocaleString()} {t("student.price_suffix")}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
