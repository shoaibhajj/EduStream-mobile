// app/(teacher)/profile.tsx
import { useEffect } from "react";
import { router } from "expo-router";

export default function TeacherProfileRedirect() {
  useEffect(() => {
    router.replace("/profile/teacher");
  }, []);
  return null;
}
