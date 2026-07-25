// app/(teacher)/courses.tsx
import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  AppText,
  Card,
  EmptyState,
  LoadingScreen,
  PrimaryButton,
  ScreenContainer,
  StatusBadge,
} from "../../components/ui";
import { Spacing } from "../../constants/design";
import { t } from "../../lib/i18n";
import { getTeacherCourses } from "../../lib/mock-data/teacher";
import type { Course } from "../../lib/types";

const MOCK_TEACHER_ID = "teacher-1";

export default function TeacherCoursesScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeacherCourses(MOCK_TEACHER_ID)
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
        <AppText variant="sectionTitle" className="text-xl font-bold mb-1">
          {t("teacher.manage_courses_title")}
        </AppText>
        <AppText variant="muted" className="mb-5">
          {t("teacher.manage_courses_subtitle")}
        </AppText>

        <PrimaryButton
          label={t("teacher.add_course_button")}
          onPress={() => router.push("/teacher-course/new")}
        />

        <View className="mt-6">
          {courses.length === 0 ? (
            <EmptyState message={t("teacher.no_courses_yet")} />
          ) : (
            courses.map((course) => (
              <CourseManagementCard
                key={course.id}
                course={course}
                onEdit={() =>
                  router.push({
                    pathname: "/teacher-course/[courseId]/edit",
                    params: { courseId: course.id },
                  })
                }
                onManageLessons={() =>
                  router.push({
                    pathname: "/teacher-course/[courseId]/lessons",
                    params: { courseId: course.id },
                  })
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function CourseManagementCard({
  course,
  onEdit,
  onManageLessons,
}: {
  course: Course;
  onEdit: () => void;
  onManageLessons: () => void;
}) {
  return (
    <Card style={{ marginBottom: Spacing.sm }}>
      <View className="flex-row items-start justify-between mb-2">
        <AppText variant="sectionTitle" className="flex-1 me-2">
          {course.title}
        </AppText>

        {course.isFree && (
          <StatusBadge
            variant="preview"
            label={t("teacher.course_card_free")}
          />
        )}
      </View>

      <AppText variant="muted" className="text-xs mb-3">
        {course.lessonCount} {t("teacher.course_card_lessons")}
        {!course.isFree &&
          ` · ${course.price.toLocaleString("ar-SA")} ${t(
            "student.price_suffix"
          )}`}
      </AppText>

      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={onEdit}
          className="flex-1 border border-accent rounded-xl py-2 items-center active:opacity-70"
        >
          <AppText className="text-accent font-semibold text-sm">
            {t("teacher.course_edit_button")}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onManageLessons}
          className="flex-1 bg-accent rounded-xl py-2 items-center active:opacity-70"
        >
          <AppText className="text-white font-semibold text-sm">
            {t("teacher.course_manage_lessons")}
          </AppText>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
