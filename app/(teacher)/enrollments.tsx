// app/(teacher)/enrollments.tsx
import { View } from "react-native";
import { AppText, ScreenContainer } from "../../components/ui";
import { t } from "../../lib/i18n";

export default function TeacherEnrollments() {
  return (
    <ScreenContainer>
      <View className="flex-1 bg-background items-center justify-center px-6">
        <AppText variant="sectionTitle" className="text-center mb-2">
          {t("teacher.enrollments_placeholder_title")}
        </AppText>
        <AppText variant="muted" className="text-center">
          {t("teacher.enrollments_placeholder_msg")}
        </AppText>
      </View>
    </ScreenContainer>
  );
}
