import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  AppText,
  Card,
  EmptyState,
  LoadingScreen,
  PrimaryButton,
} from "../../components/ui";
import { Spacing } from "../../constants/design";
import { t } from "../../lib/i18n";
import {
  getMyEnrolledCourses,
  getFeaturedCourses,
  getMyEnrollments,
} from "../../lib/mock-data/student";
import type { Course, Enrollment } from "../../lib/types";

export default function StudentHomeScreen() {
  const router = useRouter();

  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [pendingEnrollments, setPendingEnrollments] = useState<Enrollment[]>(
    []
  );
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [enrolled, allEnrollments, featured] = await Promise.all([
          getMyEnrolledCourses(),
          getMyEnrollments(),
          getFeaturedCourses(),
        ]);
        setEnrolledCourses(enrolled);
        setPendingEnrollments(
          allEnrollments.filter((e) => e.status === "pending")
        );
        setFeaturedCourses(featured);
      } catch (e) {
        console.error("[student/home] failed to load home data", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        padding: Spacing.base,
        paddingBottom: Spacing["2xl"],
      }}
    >
      {/* ── Greeting ── */}
      <View className="mb-6">
        <AppText
          variant="sectionTitle"
          className="text-xl font-bold text-text-primary"
        >
          {t("student.home_greeting")}
        </AppText>
        <AppText variant="muted" className="mt-1">
          {t("student.home_subtitle")}
        </AppText>
      </View>

      {/* ── Continue Learning ── */}
      <SectionHeader title={t("student.home_continue_learning")} />
      {enrolledCourses.length === 0 ? (
        <EmptyState message={t("student.home_no_enrolled")} />
      ) : (
        enrolledCourses.map((course) => (
          <TouchableOpacity
            key={course.id}
            className="mb-3 active:opacity-70"
            onPress={() => router.push(`/student-course/${course.id}`)}
          >
            <Card>
              <AppText variant="sectionTitle">{course.title}</AppText>
              <AppText variant="muted" className="mt-1">
                {course.teacherName}
              </AppText>
              <AppText variant="muted" className="mt-1">
                {course.lessonCount} {t("student.home_lessons")}
              </AppText>
            </Card>
          </TouchableOpacity>
        ))
      )}

      {/* ── Pending Enrollments ── */}
      {pendingEnrollments.length > 0 && (
        <>
          <SectionHeader title={t("student.home_pending_enrollments")} />
          {pendingEnrollments.map((enr) => {
            const course =
              featuredCourses.find((c) => c.id === enr.courseId) ??
              enrolledCourses.find((c) => c.id === enr.courseId);
            return (
              <View key={enr.id} className="mb-3">
                <Card>
                  <View className="flex-row items-center justify-between">
                    <AppText variant="body" className="flex-1 me-2">
                      {course?.title ?? enr.courseId}
                    </AppText>
                    <View className="bg-orange-100 px-2 py-1 rounded-full">
                      <AppText variant="muted" className="text-warning text-xs">
                        {t("student.home_pending_badge")}
                      </AppText>
                    </View>
                  </View>
                </Card>
              </View>
            );
          })}
        </>
      )}

      {/* ── Featured Courses ── */}
      <SectionHeader title={t("student.home_featured")} />
      {featuredCourses.map((course) => (
        <TouchableOpacity
          key={course.id}
          className="mb-3 active:opacity-70"
          onPress={() => router.push(`/student-course/${course.id}`)}
        >
          <Card>
            <AppText variant="sectionTitle">{course.title}</AppText>
            <AppText variant="muted" className="mt-1">
              {course.teacherName}
            </AppText>
            <View className="flex-row items-center justify-between mt-2">
              <AppText className="text-accent font-bold">
                {course.isFree
                  ? t("student.badge_free_preview")
                  : `${course.price.toLocaleString("ar-SA")} ${t(
                      "student.price_suffix"
                    )}`}
              </AppText>
              <AppText variant="muted">
                {course.lessonCount} {t("student.home_lessons")}
              </AppText>
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      {/* ── Browse CTA ── */}
      <View className="mt-4">
        <PrimaryButton
          label={t("student.home_browse_cta")}
          onPress={() => router.push("/(student)/browse")}
        />
      </View>
    </ScrollView>
  );
}

// ── Small inline helper — not exported ────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <AppText variant="sectionTitle" className="mb-3 mt-2">
      {title}
    </AppText>
  );
}
