import "../global.css";
import "../lib/i18n";
import { Stack } from "expo-router";
import { t } from "../lib/i18n";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in environment. Check your .env file."
  );
}

export default function RootLayout() {


  return (
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(student)" options={{ headerShown: false }} />
      <Stack.Screen name="(teacher)" options={{ headerShown: false }} />

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

      <Stack.Screen
        name="teacher-course/new"
        options={{
          headerShown: true,
          title: t("teacher.action_add_course"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="teacher-course/[courseId]/edit"
        options={{
          headerShown: true,
          title: t("teacher.edit_course_title"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="teacher-course/[courseId]/lessons"
        options={{
          headerShown: true,
          title: t("teacher.course_lessons_title"),
          headerBackTitle: "",
        }}
      />

      <Stack.Screen
        name="teacher-course/[courseId]/lessons/new"
        options={{
          headerShown: true,
          title: t("teacher.lesson_form_title_new"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="teacher-course/[courseId]/lessons/[lessonId]/edit"
        options={{
          headerShown: true,
          title: t("teacher.lesson_form_title_edit"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="profile/student"
        options={{
          headerShown: true,
          title: t("profile.student_title"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="profile/teacher"
        options={{
          headerShown: true,
          title: t("profile.teacher_title"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen
        name="profile/payment"
        options={{
          headerShown: true,
          title: t("profile.payment_title"),
          headerBackTitle: "",
        }}
      />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
    </Stack>
      </ClerkProvider>
  );
}
