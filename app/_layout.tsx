import "../global.css";
import "../lib/i18n";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(student)" options={{ headerShown: false }} />
      <Stack.Screen
        name="student-course/[courseId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="student-watch/[lessonId]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
