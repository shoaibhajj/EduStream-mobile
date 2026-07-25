// app/teacher-course/[courseId]/lessons/index.tsx
import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  AppText,
  Card,
  EmptyState,
  LoadingScreen,
  PrimaryButton,
  ScreenContainer,
  StatusBadge,
} from "../../../../components/ui";
import { Spacing } from "../../../../constants/design";
import { t } from "../../../../lib/i18n";
import { getLessonsByCourseForTeacher } from "../../../../lib/mock-data/teacher";
import type { Lesson } from "../../../../lib/types";

export default function TeacherLessonManagement() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      getLessonsByCourseForTeacher(courseId)
        .then(setLessons)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [courseId]);

  if (loading) return <LoadingScreen />;

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{
          padding: Spacing.base,
          paddingBottom: Spacing["2xl"],
        }}
      >
        <AppText variant="muted" className="mb-5">
          {t("teacher.lessons_subtitle")}
        </AppText>

        <PrimaryButton
          label={t("teacher.add_lesson_button")}
          onPress={() => router.push(`/teacher-course/${courseId}/lessons/new`)}
        />

        <View className="mt-6">
          {lessons.length === 0 ? (
            <EmptyState message={t("teacher.no_lessons_yet")} />
          ) : (
            lessons.map((lesson) => (
              <LessonManagementCard
                key={lesson.id}
                lesson={lesson}
                onEdit={() =>
                  router.push(
                    `/teacher-course/${courseId}/lessons/${lesson.id}/edit`
                  )
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function LessonManagementCard({
  lesson,
  onEdit,
}: {
  lesson: Lesson;
  onEdit: () => void;
}) {
  return (
    <Card style={{ marginBottom: Spacing.sm }}>
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 me-2">
          <AppText variant="sectionTitle">{lesson.title}</AppText>
          <AppText variant="muted" className="text-xs mt-1">
            {t("teacher.lesson_order_label")}: {lesson.orderIndex}
            {lesson.durationSeconds
              ? ` · ${Math.round(lesson.durationSeconds / 60)} ${t(
                  "student.duration_minutes"
                )}`
              : ""}
          </AppText>
        </View>
        <StatusBadge
          variant={lesson.isPreview ? "preview" : "locked"}
          label={
            lesson.isPreview
              ? t("teacher.lesson_preview_label")
              : t("teacher.lesson_locked_label")
          }
        />
      </View>
      <TouchableOpacity
        onPress={onEdit}
        className="border border-accent rounded-xl py-2 items-center mt-1 active:opacity-70"
      >
        <AppText className="text-accent font-semibold text-sm">
          {t("teacher.lesson_edit_button")}
        </AppText>
      </TouchableOpacity>
    </Card>
  );
}
