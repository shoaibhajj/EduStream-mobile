// app/(teacher)/dashboard.tsx
import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  AppText,
  Card,
  EmptyState,
  LoadingScreen,
  PrimaryButton,
  ScreenContainer,
} from "../../components/ui";
import { Spacing } from "../../constants/design";
import { t } from "../../lib/i18n";
import {
  getTeacherHomeSummary,
  getTeacherById,
} from "../../lib/mock-data/teacher";
import type { Course, Teacher } from "../../lib/types";

// The mock teacher we're "logged in" as during the mock-data-first phase
const MOCK_TEACHER_ID = "teacher-1";

export default function TeacherDashboard() {
  const router = useRouter();

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [teacherData, summary] = await Promise.all([
          getTeacherById(MOCK_TEACHER_ID),
          getTeacherHomeSummary(MOCK_TEACHER_ID),
        ]);
        setTeacher(teacherData);
        setTotalCourses(summary.totalCourses);
        setPendingCount(summary.pendingCount);
        setRecentCourses(summary.recentCourses);
      } catch (e) {
        console.error("[teacher/dashboard] failed to load", e);
      } finally {
        setLoading(false);
      }
    }
    load();
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
        {/* ── Greeting ── */}
        <View className="mb-6">
          <AppText
            variant="sectionTitle"
            className="text-xl font-bold text-text-primary"
          >
            {t("teacher.home_greeting")}
          </AppText>
          {teacher && (
            <AppText variant="muted" className="mt-1">
              {teacher.name}
            </AppText>
          )}
          <AppText variant="muted" className="mt-1">
            {t("teacher.home_subtitle")}
          </AppText>
        </View>

        {/* ── Summary Cards ── */}
        <TeacherSectionHeader title={t("teacher.home_overview")} />
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1">
            <Card>
              <AppText variant="muted" className="text-xs mb-1">
                {t("teacher.stat_total_courses")}
              </AppText>
              <AppText
                variant="sectionTitle"
                className="text-2xl font-bold text-accent"
              >
                {totalCourses}
              </AppText>
            </Card>
          </View>
          <View className="flex-1">
            <Card>
              <AppText variant="muted" className="text-xs mb-1">
                {t("teacher.stat_pending")}
              </AppText>
              <AppText
                variant="sectionTitle"
                className={`text-2xl font-bold ${
                  pendingCount > 0 ? "text-warning" : "text-text-primary"
                }`}
              >
                {pendingCount}
              </AppText>
            </Card>
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <TeacherSectionHeader title={t("teacher.home_quick_actions")} />
        <View className="mb-6 gap-3">
          <PrimaryButton
            label={t("teacher.action_manage_enrollments")}
            onPress={() => router.push("/(teacher)/enrollments")}
          />
          <TouchableOpacity
            className="border border-accent rounded-xl py-3 px-4 items-center active:opacity-70"
            onPress={() =>
              Alert.alert(
                t("teacher.action_add_course_title"),
                t("teacher.action_add_course_msg")
              )
            }
          >
            <AppText className="text-accent font-semibold">
              {t("teacher.action_add_course")}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* ── Recent Courses ── */}
        <TeacherSectionHeader title={t("teacher.home_recent_courses")} />
        {recentCourses.length === 0 ? (
          <EmptyState message={t("teacher.home_no_courses")} />
        ) : (
          recentCourses.map((course) => (
            <TouchableOpacity
              key={course.id}
              className="mb-3 active:opacity-70"
              onPress={() =>
                Alert.alert(
                  t("teacher.course_detail_coming_title"),
                  t("teacher.course_detail_coming_msg")
                )
              }
            >
              <Card>
                <AppText variant="sectionTitle">{course.title}</AppText>
                <View className="flex-row items-center justify-between mt-2">
                  <AppText variant="muted" className="text-xs">
                    {course.lessonCount} {t("teacher.stat_lessons")}
                  </AppText>
                  <AppText className="text-accent font-bold text-xs">
                    {course.isFree
                      ? t("teacher.stat_free")
                      : `${course.price.toLocaleString("ar-SA")} ${t(
                          "student.price_suffix"
                        )}`}
                  </AppText>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

function TeacherSectionHeader({ title }: { title: string }) {
  return (
    <AppText variant="sectionTitle" className="mb-3 mt-2">
      {title}
    </AppText>
  );
}
