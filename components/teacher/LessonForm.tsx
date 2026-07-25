// components/teacher/LessonForm.tsx
import { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Switch,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { AppText, PrimaryButton, ScreenContainer } from "../ui";
import { Spacing } from "../../constants/design";
import { t } from "../../lib/i18n";

type LessonFormValues = {
  title: string;
  videoUrl: string;
  durationSeconds: number;
  isPreview: boolean;
  orderIndex: number;
};

type Props = {
  initialValues: LessonFormValues;
  onSave: (values: LessonFormValues) => Promise<void>;
};

export function LessonForm({ initialValues, onSave }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues.title);
  const [videoUrl, setVideoUrl] = useState(initialValues.videoUrl);
  const [duration, setDuration] = useState(
    String(initialValues.durationSeconds)
  );
  const [isPreview, setIsPreview] = useState(initialValues.isPreview);
  const [orderIndex, setOrderIndex] = useState(
    String(initialValues.orderIndex)
  );
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert(
        t("teacher.lesson_form_validation_title"),
        t("teacher.lesson_form_validation_msg")
      );
      return;
    }
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        videoUrl: videoUrl.trim(),
        durationSeconds: Number(duration) || 0,
        isPreview,
        orderIndex: Number(orderIndex) || 1,
      });
      Alert.alert(
        t("teacher.lesson_form_saved_title"),
        t("teacher.lesson_form_saved_msg"),
        [{ text: "OK", onPress: () => router.back() }]
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={{
          padding: Spacing.base,
          paddingBottom: Spacing["2xl"],
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <FormField label={t("teacher.lesson_form_field_title")}>
          <TextInput
            className="border border-border rounded-xl px-4 py-3 text-text-primary bg-card"
            placeholder={t("teacher.lesson_form_field_title_placeholder")}
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />
        </FormField>

        {/* Order index */}
        <FormField label={t("teacher.lesson_form_field_order")}>
          <TextInput
            className="border border-border rounded-xl px-4 py-3 text-text-primary bg-card"
            placeholder={t("teacher.lesson_form_field_order_placeholder")}
            placeholderTextColor="#9ca3af"
            value={orderIndex}
            onChangeText={setOrderIndex}
            keyboardType="numeric"
            returnKeyType="next"
          />
        </FormField>

        {/* Duration */}
        <FormField label={t("teacher.lesson_form_field_duration")}>
          <TextInput
            className="border border-border rounded-xl px-4 py-3 text-text-primary bg-card"
            placeholder={t("teacher.lesson_form_field_duration_placeholder")}
            placeholderTextColor="#9ca3af"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            returnKeyType="next"
          />
        </FormField>

        {/* Video URL — mock/placeholder only */}
        <FormField label={t("teacher.lesson_form_field_video_url")}>
          <TextInput
            className="border border-border rounded-xl px-4 py-3 text-text-primary bg-card"
            placeholder={t("teacher.lesson_form_field_video_url_placeholder")}
            placeholderTextColor="#9ca3af"
            value={videoUrl}
            onChangeText={setVideoUrl}
            keyboardType="url"
            autoCapitalize="none"
            returnKeyType="done"
          />
        </FormField>

        {/* Is Preview toggle */}
        <View className="flex-row items-center justify-between mb-4 bg-card border border-border rounded-xl px-4 py-3">
          <AppText>{t("teacher.lesson_form_field_is_preview")}</AppText>
          <Switch
            value={isPreview}
            onValueChange={setIsPreview}
            trackColor={{ true: "#7C5CFC" }}
          />
        </View>

        <PrimaryButton
          label={saving ? t("common.loading") : t("teacher.lesson_form_save")}
          onPress={handleSave}
          disabled={saving}
        />
        <TouchableOpacity
          className="mt-3 items-center py-3 active:opacity-60"
          onPress={() => router.back()}
        >
          <AppText variant="muted">{t("teacher.lesson_form_cancel")}</AppText>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

// Reusable form field wrapper used in both forms
function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: Spacing.base }}>
      <AppText className="text-sm font-semibold mb-2 text-text-primary">
        {label}
      </AppText>
      {children}
    </View>
  );
}
