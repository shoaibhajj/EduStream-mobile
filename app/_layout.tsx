import "../global.css";
import "../lib/i18n";
import { Stack } from "expo-router";
import { t } from "../lib/i18n";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(student)" options={{ headerShown: false }} />
      <Stack.Screen
        name="student-course/[courseId]"
        options={{
          headerShown: true,
          title: t("student.course_detail_title"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="student-watch/[lessonId]"
        options={{
          headerShown: true,
          title: t("student.watch_screen_title"),
          headerBackTitle: "",
        }}
      />
    </Stack>
  );
}
