import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { t } from "../../../lib/i18n";
import {
  getCourseDetail,
  getLessonsByCourse,
} from "../../../lib/mock-data/student";
import type { CourseDetail, Lesson } from "../../../lib/types";

function formatDuration(seconds: number | null): string {
  if (seconds === null) return "";
  const mins = Math.floor(seconds / 60);
  return `${mins} ${t("student.duration_minutes")}`;
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
      className={`flex-row items-center bg-surface border border-border rounded-xl p-4 mb-3 active:opacity-70 ${
        isPreview ? "" : "opacity-60"
      }`}
      onPress={() => onPress(lesson)}
      accessibilityLabel={lesson.title}
      accessibilityHint={
        isPreview
          ? t("student.lesson_preview_hint")
          : t("student.lesson_locked_hint")
      }
    >
      {/* Icon */}
      <View
        className={`w-9 h-9 rounded-full items-center justify-center me-3 ${
          isPreview ? "bg-accent-light" : "bg-surface-secondary"
        }`}
      >
        <Text
          className={`text-base ${isPreview ? "text-accent" : "text-locked"}`}
        >
          {isPreview ? "▶" : "🔒"}
        </Text>
      </View>

      {/* Title + duration */}
      <View className="flex-1">
        <Text
          className={`text-sm font-medium ${
            isPreview ? "text-text-primary" : "text-text-muted"
          }`}
          numberOfLines={1}
        >
          {lesson.title}
        </Text>
        {lesson.durationSeconds !== null && (
          <Text className="text-xs text-text-muted mt-0.5">
            {formatDuration(lesson.durationSeconds)}
          </Text>
        )}
      </View>

      {/* Badge */}
      <View
        className={`px-2 py-0.5 rounded-full ms-2 ${
          isPreview ? "bg-accent-light" : "bg-surface-secondary"
        }`}
      >
        <Text
          className={`text-xs font-medium ${
            isPreview ? "text-accent" : "text-locked"
          }`}
        >
          {isPreview
            ? t("student.badge_free_preview")
            : t("student.badge_locked")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function CourseDetailScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [courseData, lessonData] = await Promise.all([
          getCourseDetail(courseId),
          getLessonsByCourse(courseId),
        ]);
        if (!courseData) {
          setError(t("student.error_load_course"));
          return;
        }
        setCourse(courseData);
        setLessons(lessonData);
      } catch (e) {
        setError(t("student.error_load_course"));
        console.error("[course/[courseId]] load failed", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  function handleLessonPress(lesson: Lesson) {
    if (lesson.isPreview) {
      router.push(`/(student)/watch/${lesson.id}`);
    } else {
      Alert.alert(t("student.badge_locked"), t("student.lesson_locked_hint"));
    }
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#7C5CFC" />
      </View>
    );
  }

  if (error || !course) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-base font-semibold text-error">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View className="mb-6">
            {/* Course title */}
            <Text className="text-base font-semibold text-text-primary mb-1">
              {course.title}
            </Text>

            {/* Teacher */}
            <Text className="text-xs text-text-muted mb-3">
              {t("student.by_teacher")}: {course.teacherName}
            </Text>

            {/* Description */}
            <Text className="text-sm text-text-secondary mb-4 leading-5">
              {course.description}
            </Text>

            {/* Price row */}
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-lg font-bold text-accent">
                {course.price.toLocaleString("ar-SA")}{" "}
                {t("student.price_suffix")}
              </Text>
              <TouchableOpacity className="bg-accent rounded-md px-4 py-2">
                <Text className="text-white text-sm font-medium">
                  {t("student.enroll_button")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Lessons section header */}
            <Text className="text-base font-semibold text-text-primary mb-3">
              {t("student.lessons_header")}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center py-10">
            <Text className="text-sm text-text-muted">
              {t("student.no_lessons")}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <LessonRow lesson={item} onPress={handleLessonPress} />
        )}
      />
    </View>
  );
}
