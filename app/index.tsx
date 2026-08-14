import { useEffect } from "react";
import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchProfileMe, ApiError } from "../lib/api";
import { LoadingScreen } from "../components/ui";

const PROFILE_RETRY_DELAYS_MS = [600, 1200, 2000];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function RootIndex() {
  const { isLoaded, isSignedIn, getToken } = useAuth({
    treatPendingAsSignedOut: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    let cancelled = false;

    async function routeSignedOutUser() {
      try {
        const done = await AsyncStorage.getItem("onboarding_done");

        if (cancelled) return;

        if (done === "true") {
          router.replace("/(auth)/sign-in");
        } else {
          router.replace("/(onboarding)");
        }
      } catch {
        if (!cancelled) {
          router.replace("/(onboarding)");
        }
      }
    }

    async function routeSignedInUser() {
      try {
        const token = await getToken();

        if (cancelled) return;

        if (!token) {
          router.replace("/(auth)/sign-in");
          return;
        }

        const { actor } = await fetchProfileMe(token);

        if (cancelled) return;

        switch (actor.role) {
          case "student":
            router.replace("/(student)/home");
            return;
          case "teacher":
            router.replace("/(teacher)/dashboard");
            return;
          case "admin":
            router.replace("/(student)/home");
            return;
          default:
            router.replace("/(student)/home");
            return;
        }
      } catch (error) {
        if (cancelled) return;

        if (error instanceof ApiError && error.status === 404) {
          for (const delay of PROFILE_RETRY_DELAYS_MS) {
            await sleep(delay);

            if (cancelled) return;

            try {
              const retryToken = await getToken();

              if (!retryToken) {
                router.replace("/(auth)/sign-in");
                return;
              }

              const { actor } = await fetchProfileMe(retryToken);

              if (cancelled) return;

              switch (actor.role) {
                case "student":
                  router.replace("/(student)/home");
                  return;
                case "teacher":
                  router.replace("/(teacher)/dashboard");
                  return;
                case "admin":
                  router.replace("/(student)/home");
                  return;
                default:
                  router.replace("/(student)/home");
                  return;
              }
            } catch (retryError) {
              if (
                !(retryError instanceof ApiError && retryError.status === 404)
              ) {
                router.replace("/(auth)/sign-in");
                return;
              }
            }
          }

          router.replace("/(auth)/sign-in");
          return;
        }

        router.replace("/(auth)/sign-in");
      }
    }

    if (!isSignedIn) {
      routeSignedOutUser();
    } else {
      routeSignedInUser();
    }

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, getToken, router]);

  return <LoadingScreen />;
}
