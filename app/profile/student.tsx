// app/profile/student.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { t } from "../../lib/i18n";
import {
  getCurrentStudentProfile,
  updateStudentProfile,
} from "../../lib/mock-data/profile";
import type { StudentProfile } from "../../lib/types";
import {
  ScreenContainer,
  AppText,
  PrimaryButton,
  SecondaryButton,
  LoadingScreen,
  Card,
} from "../../components/ui";
import {Colors} from "../../constants/colors";
import { LogoutButton } from "../../components/ui/LogoutButton";

export default function StudentProfileScreen() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [gradeYear, setGradeYear] = useState("");

  useEffect(() => {
    getCurrentStudentProfile().then((p) => {
      setProfile(p);
      setName(p.name);
      setGradeYear(p.gradeYear ?? "");
    });
  }, []);

  if (!profile) return <LoadingScreen />;

  function handleEdit() {
    setEditing(true);
  }

  function handleCancel() {
    setName(profile!.name);
    setGradeYear(profile!.gradeYear ?? "");
    setEditing(false);
  }

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert(
        t("profile.validation_title"),
        t("profile.validation_name_required")
      );
      return;
    }
    const updated = await updateStudentProfile(profile!.id, {
      name: name.trim(),
      gradeYear: gradeYear.trim() || null,
    });
    setProfile(updated);
    setEditing(false);
    Alert.alert(t("profile.saved_title"), t("profile.saved_msg"));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenContainer>
          {/* Avatar placeholder */}
          <View style={styles.avatarBox}>
            <AppText className="text-4xl">👤</AppText>
          </View>

          <Card>
            <AppText className="text-xs text-text-muted mb-1">
              {t("profile.student_name_label")}
            </AppText>
            {editing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t("profile.student_name_placeholder")}
                placeholderTextColor={Colors.textMuted}
                autoFocus
              />
            ) : (
              <AppText className="text-base font-semibold text-text-primary">
                {profile.name}
              </AppText>
            )}

            <View style={styles.divider} />

            <AppText className="text-xs text-text-muted mb-1">
              {t("profile.student_grade_label")}
            </AppText>
            {editing ? (
              <TextInput
                style={styles.input}
                value={gradeYear}
                onChangeText={setGradeYear}
                placeholder={t("profile.student_grade_placeholder")}
                placeholderTextColor={Colors.textMuted}
              />
            ) : (
              <AppText className="text-sm text-text-secondary">
                {profile.gradeYear ?? "—"}
              </AppText>
            )}
          </Card>

          <View style={styles.actions}>
            {editing ? (
              <>
                <PrimaryButton
                  label={t("profile.save_button")}
                  onPress={handleSave}
                />
                <View style={{ height: 8 }} />
                <SecondaryButton
                  label={t("profile.cancel_button")}
                  onPress={handleCancel}
                />
              </>
            ) : (
              <PrimaryButton
                label={t("profile.edit_button")}
                onPress={handleEdit}
              />
            )}
          </View>
          <View style={{ marginTop: 12 }}>
            <LogoutButton />
          </View>
        </ScreenContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  avatarBox: {
    alignItems: "center",
    paddingVertical: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E7EAF3",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#101828",
    backgroundColor: "#F9FAFB",
    marginBottom: 4,
    textAlign: "right", // Arabic-first
  },
  divider: {
    height: 1,
    backgroundColor: "#E7EAF3",
    marginVertical: 12,
  },
  actions: {
    marginTop: 20,
    paddingHorizontal: 4,
  },
});
