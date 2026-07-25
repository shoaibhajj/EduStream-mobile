import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import type { Course, Subject } from "../../../../../lib/types";
import { getCoursesBySubject } from "../../../../../lib/mock-data";
import { getSubjectById } from "../../../../../lib/mock-data/shared";
import { t } from "../../../../../lib/i18n";
import {
  AppText,
  Card,
  EmptyState,
  LoadingScreen,
  ScreenContainer,
  StatusBadge,
} from "../../../../../components/ui";
import { Spacing } from "../../../../../constants/design";

export default function CoursesScreen() {
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [courseData, subjectData] = await Promise.all([
          getCoursesBySubject(subjectId),
          getSubjectById(subjectId),
        ]);
        setCourses(courseData);
        setSubject(subjectData);
      } catch (e) {
        setError(t("student.error_load_courses"));
      } finally {
        setLoading(false);
      }
    }
    if (subjectId) load();
  }, [subjectId]);

  if (loading) return <LoadingScreen />;
  if (error) return <EmptyState message={error} />;
  if (courses.length === 0)
    return <EmptyState message={t("student.no_courses")} />;

  return (
   
      <View className="flex-1 bg-background">
        <Stack.Screen
          options={{ title: subject?.name ?? t("student.courses_title") }}
        />
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: Spacing.base }}
          ListHeaderComponent={
            <AppText variant="sectionTitle" className="mb-3">
              {subject?.name
                ? `${t("student.courses_in_subject")} ${subject.name}`
                : t("student.courses_title")}
            </AppText>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mb-3 active:opacity-70"
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: "/student-course/[courseId]",
                  params: { courseId: item.id },
                })
              }
            >
              <Card>
                <View className="flex-row justify-between items-start">
                  <AppText
                    variant="sectionTitle"
                    className="flex-1 me-2"
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
