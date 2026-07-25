// components/teacher/CourseForm.tsx
import { useState, ReactNode } from "react";
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

type CourseFormValues = {
  title: string;
  description: string;
  price: number;
  isFree: boolean;
};

type Props = {
  initialValues: CourseFormValues;
  onSave: (values: CourseFormValues) => Promise<void>;
};
export function CourseForm({ initialValues, onSave }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [price, setPrice] = useState(String(initialValues.price));
  const [isFree, setIsFree] = useState(initialValues.isFree);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert(
        t("teacher.course_form_validation_title"),
        t("teacher.course_form_validation_msg")
      );
      return;
    }

    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        price: isFree ? 0 : Number(price) || 0,
        isFree,
      });
      Alert.alert(
        t("teacher.course_form_saved_title"),
        t("teacher.course_form_saved_msg"),
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
        <FormField label={t("teacher.course_form_field_title")}>
          <TextInput
            className="border border-border rounded-xl px-4 py-3 text-text-primary bg-card"
            placeholder={t("teacher.course_form_field_title_placeholder")}
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />
        </FormField>

        <FormField label={t("teacher.course_form_field_description")}>
          <TextInput
            className="border border-border rounded-xl px-4 py-3 text-text-primary bg-card"
            placeholder={t("teacher.course_form_field_description_placeholder")}
            placeholderTextColor="#9ca3af"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={{ minHeight: 100 }}
          />
        </FormField>

        <View className="flex-row items-center justify-between mb-4 bg-card border border-border rounded-xl px-4 py-3">
          <AppText>{t("teacher.course_form_field_is_free")}</AppText>
          <Switch
            value={isFree}
            onValueChange={setIsFree}
            trackColor={{ true: "#7C5CFC" }}
          />
        </View>

        {!isFree && (
          <FormField label={t("teacher.course_form_field_price")}>
            <TextInput
              className="border border-border rounded-xl px-4 py-3 text-text-primary bg-card"
              placeholder={t("teacher.course_form_field_price_placeholder")}
              placeholderTextColor="#9ca3af"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </FormField>
        )}

        <FormField label={t("teacher.course_form_field_thumbnail")}>
          <View className="border border-dashed border-border rounded-xl px-4 py-5 items-center bg-card">
            <AppText variant="muted" className="text-sm">
              {t("teacher.course_form_thumbnail_placeholder")}
            </AppText>
          </View>
        </FormField>

        <PrimaryButton
          label={saving ? t("common.loading") : t("teacher.course_form_save")}
          onPress={handleSave}
          disabled={saving}
        />

        <TouchableOpacity
          className="mt-3 items-center py-3 active:opacity-60"
          onPress={() => router.back()}
        >
          <AppText variant="muted">{t("teacher.course_form_cancel")}</AppText>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}
function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
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