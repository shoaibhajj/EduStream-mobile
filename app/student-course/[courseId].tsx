import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import {
  AppText,
  Card,
  PrimaryButton,
  StatusBadge,
  LoadingScreen,
  EmptyState,
  ScreenContainer,
} from "../../components/ui";
import { Spacing } from "../../constants/design";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "../../lib/i18n";
import {
  getCourseDetail,
  getLessonsByCourse,
  getEnrollmentStatus,
  type EnrollmentStatus,
} from "../../lib/mock-data/student";
import type { CourseDetail, Lesson } from "../../lib/types";

function formatDuration(seconds: number | null): string {
  if (seconds === null) return "";
  const mins = Math.floor(seconds / 60);
  return `${mins} ${t("student.duration_minutes")}`;
}

function EnrollmentBadge({ status }: { status: EnrollmentStatus }) {
  if (status === "confirmed")
    return (
      <StatusBadge
        variant="confirmed"
        label={t("student.course_enrolled_badge")}
      />
    );
  if (status === "pending")
    return (
      <StatusBadge
        variant="pending"
        label={t("student.course_pending_badge")}
      />
    );
  return null;
}

function LessonRow({
  lesson,
  onPress,
}: {
  lesson: Lesson;
  onPress: (lesson: Lesson) => void;
}) {
  const isPreview = lesson.isPreview;

  return (
    <TouchableOpacity
      className={`mb-3 active:opacity-70 ${isPreview ? "" : "opacity-60"}`}
      onPress={() => onPress(lesson)}
      accessibilityRole="button"
      accessibilityLabel={lesson.title}
      accessibilityHint={
        isPreview
          ? t("student.lesson_preview_hint")
          : t("student.lesson_locked_hint")
      }
    >
      <Card className="flex-row items-center">
        <View
          className={`w-9 h-9 rounded-full items-center justify-center me-3 ${
            isPreview ? "bg-accent-light" : "bg-surface-secondary"
          }`}
        >
          <AppText className={isPreview ? "text-accent" : "text-locked"}>
            {isPreview ? "▶" : "🔒"}
          </AppText>
        </View>

        <View className="flex-1">
          <AppText variant={isPreview ? "body" : "muted"} numberOfLines={1}>
            {lesson.title}
          </AppText>
          {lesson.durationSeconds !== null && (
            <AppText variant="muted" className="mt-0.5">
              {formatDuration(lesson.durationSeconds)}
            </AppText>
          )}
        </View>

        <View className="ms-2">
          <StatusBadge
            variant={isPreview ? "preview" : "locked"}
            label={
              isPreview
                ? t("student.badge_free_preview")
                : t("student.badge_locked")
            }
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function CourseDetailScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrollStatus, setEnrollStatus] = useState<EnrollmentStatus>("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [courseData, lessonData, status] = await Promise.all([
          getCourseDetail(courseId),
          getLessonsByCourse(courseId),
          getEnrollmentStatus(courseId),
        ]);
        if (!courseData) {
          setError(t("student.error_load_course"));
          return;
        }
        setCourse(courseData);
        setLessons(lessonData);
        setEnrollStatus(status);
      } catch (e) {
        setError(t("student.error_load_course"));
        console.error("[student-course/[courseId]] load failed", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  function handleLessonPress(lesson: Lesson) {
    if (lesson.isPreview) {
      router.push({
        pathname: "/student-watch/[lessonId]",
        params: { lessonId: lesson.id },
      });
    } else {
      Alert.alert(
        t("student.locked_alert_title"),
        t("student.locked_alert_msg")
      );
    }
  }

  function handleEnrollPress() {
    if (enrollStatus === "none") {
      Alert.alert(
        t("student.enroll_success_title"),
        t("student.enroll_success_msg")
      );
    }
  }

  if (loading) return <LoadingScreen />;
  if (error || !course)
    return <EmptyState message={error ?? t("student.error_load_course")} />;

  return (
    <ScreenContainer>
      <View className="flex-1 bg-background">
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: Spacing.base }}
          ListHeaderComponent={
            <View className="mb-6">
              {/* Thumbnail placeholder */}
              <View className="w-full h-44 rounded-2xl bg-surface-secondary items-center justify-center mb-4">
                <AppText className="text-4xl">🎓</AppText>
              </View>

              {/* Title + enrollment badge row */}
              <View className="flex-row items-start justify-between mb-1">
                <AppText variant="sectionTitle" className="flex-1 me-2">
                  {course.title}
                </AppText>
                <EnrollmentBadge status={enrollStatus} />
              </View>

              {/* Teacher */}
              <AppText variant="muted" className="mb-3">
                {t("student.by_teacher")}: {course.teacherName}
              </AppText>

              {/* Description */}
              <AppText variant="secondary" className="mb-4 leading-5">
                {course.description}
              </AppText>

              {/* Lesson count */}
              <AppText variant="muted" className="mb-4">
                {lessons.length} {t("student.course_lessons_count")}
              </AppText>

              {/* Price row + enroll button */}
              <View className="flex-row items-center justify-between mb-5">
                <AppText variant="price">
                  {course.price.toLocaleString("ar-SA")}{" "}
                  {t("student.price_suffix")}
                </AppText>
                {enrollStatus === "none" && (
                  <PrimaryButton
                    label={t("student.enroll_button")}
                    onPress={handleEnrollPress}
                  />
                )}
              </View>

              {/* Lessons section header */}
              <AppText variant="sectionTitle" className="mb-3">
                {t("student.lessons_header")}
              </AppText>
            </View>
          }
          ListEmptyComponent={<EmptyState message={t("student.no_lessons")} />}
          renderItem={({ item }) => (
            <LessonRow lesson={item} onPress={handleLessonPress} />
          )}
        />
      </View>
    </ScreenContainer>
  );
}
