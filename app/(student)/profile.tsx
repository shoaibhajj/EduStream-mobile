// app/(student)/profile.tsx
import { useEffect } from "react";
import { router } from "expo-router";

export default function StudentProfileRedirect() {
  useEffect(() => {
    router.replace("/profile/student");
  }, []);
  return null;
}
