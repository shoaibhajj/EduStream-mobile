import { Alert } from "react-native";
import { useClerk } from "@clerk/expo";
import { router } from "expo-router";
import { t } from "../../lib/i18n";
import { SecondaryButton } from "./index";

export function LogoutButton() {
  const { signOut } = useClerk();

  async function handleLogout() {
    Alert.alert(
      t("profile.logout_confirm_title"),
      t("profile.logout_confirm_message"),
      [
        { text: t("profile.cancel_button"), style: "cancel" },
        {
          text: t("profile.logout_button"),
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              router.replace("/");
            } catch (err) {
              console.error("Sign out error:", err);
            }
          },
        },
      ]
    );
  }

  return (
    <SecondaryButton
      label={t("profile.logout_button")}
      onPress={handleLogout}
    />
  );
}
