import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function RootIndex() {
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("onboarding_done").then((done) => {
      if (done) {
        // router.replace("/(student)/home");
          router.replace("/(onboarding)");
      } else {
        router.replace("/(onboarding)");
      }
    });
  }, [router]);

  return null;
}
