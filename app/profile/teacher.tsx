// app/profile/teacher.tsx
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
import { router } from "expo-router";
import { t } from "../../lib/i18n";
import {
  getCurrentTeacherProfile,
  updateTeacherProfile,
} from "../../lib/mock-data/profile";
import type { Teacher } from "../../lib/types";
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

export default function TeacherProfileScreen() {
  const [profile, setProfile] = useState<Teacher | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getCurrentTeacherProfile().then((p) => {
      setProfile(p);
      setName(p.name);
      setBio(p.bio ?? "");
      setPhone(p.phoneNumber ?? "");
    });
  }, []);

  if (!profile) return <LoadingScreen />;

  function handleCancel() {
    setName(profile!.name);
    setBio(profile!.bio ?? "");
    setPhone(profile!.phoneNumber ?? "");
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
    const updated = await updateTeacherProfile(profile!.id, {
      name: name.trim(),
      bio: bio.trim() || null,
      phoneNumber: phone.trim() || null,
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
          <View style={styles.avatarBox}>
            <AppText className="text-4xl">👤</AppText>
          </View>

          <Card>
            <AppText className="text-xs text-text-muted mb-1">
              {t("profile.teacher_name_label")}
            </AppText>
            {editing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder={t("profile.teacher_name_placeholder")}
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
              {t("profile.teacher_bio_label")}
            </AppText>
            {editing ? (
              <TextInput
                style={[styles.input, styles.multiline]}
                value={bio}
                onChangeText={setBio}
                placeholder={t("profile.teacher_bio_placeholder")}
                placeholderTextColor={Colors.textMuted}
                multiline
                numberOfLines={3}
              />
            ) : (
              <AppText className="text-sm text-text-secondary">
                {profile.bio ?? "—"}
              </AppText>
            )}

            <View style={styles.divider} />

            <AppText className="text-xs text-text-muted mb-1">
              {t("profile.teacher_phone_label")}
            </AppText>
            {editing ? (
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder={t("profile.teacher_phone_placeholder")}
                placeholderTextColor={Colors.textMuted}
                keyboardType="phone-pad"
              />
            ) : (
              <AppText className="text-sm text-text-secondary">
                {profile.phoneNumber ?? "—"}
              </AppText>
            )}
          </Card>

          {/* Payment info link — teacher-only */}
          <View style={{ marginTop: 12 }}>
            <SecondaryButton
              label={t("profile.payment_title")}
              onPress={() => router.push("/profile/payment")}
            />
          </View>

          <View style={{ marginTop: 12 }}>
            <LogoutButton />
          </View>

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
                onPress={() => setEditing(true)}
              />
            )}
          </View>
        </ScreenContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  avatarBox: { alignItems: "center", paddingVertical: 24 },
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
    textAlign: "right",
  },
  multiline: { minHeight: 80, textAlignVertical: "top" },
  divider: { height: 1, backgroundColor: "#E7EAF3", marginVertical: 12 },
  actions: { marginTop: 20, paddingHorizontal: 4 },
});
