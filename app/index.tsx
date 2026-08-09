import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchProfileMe, ApiError } from "../lib/api";

export default function RootIndex() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; // wait for Clerk to hydrate — splash screen covers this gap

    if (!isSignedIn) {
      // Signed out — decide between onboarding and sign-in
      AsyncStorage.getItem("onboarding_done").then((done) => {
        if (done === "true") {
          router.replace("/(auth)/sign-in");
        } else {
          router.replace("/(onboarding)");
        }
      });
      return;
    }

    // Signed in — resolve DB profile and route by confirmed role
    (async () => {
      try {
        const token = await getToken();

        if (!token) {
          // Session token unavailable — treat as signed out
          router.replace("/(auth)/sign-in");
          return;
        }

        const { actor } = await fetchProfileMe(token);

        switch (actor.role) {
          case "student":
            router.replace("/(student)/home");
            break;
          case "teacher":
            // Note: teacher approval state check (pending/rejected gate)
            // belongs to Feature 19 — not implemented here.
            // For now, all teacher roles go to dashboard unconditionally.
            router.replace("/(teacher)/dashboard");
            break;
          case "admin":
            // Admin area does not exist in mobile yet.
            // Redirect to student home as safe fallback until Feature N.
            router.replace("/(student)/home");
            break;
          default:
            // Profile exists but role is unexpected — safe fallback
            router.replace("/(auth)/select-role");
        }
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          // Clerk user exists but no DB profile yet
          // (e.g., webhook sync delay) — go to select-role
          router.replace("/(auth)/select-role");
        } else {
          // Network error, 401, or other — fall back to sign-in
          router.replace("/(auth)/sign-in");
        }
      }
    })();
  }, [isLoaded, isSignedIn]);

  return null; // splash screen covers the blank state
}