// app/profile/payment.tsx
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
import { getPaymentInfo, updatePaymentInfo } from "../../lib/mock-data/teacher";
import type { PaymentInfo } from "../../lib/types";
import {
  ScreenContainer,
  AppText,
  PrimaryButton,
  SecondaryButton,
  LoadingScreen,
  Card,
} from "../../components/ui";
import { Colors } from "../../constants/colors";

const CURRENT_TEACHER_ID = "teacher-1"; // mock: replace with Clerk userId lookup later

export default function PaymentInfoScreen() {
  const [info, setInfo] = useState<PaymentInfo | null>(null);
  const [editing, setEditing] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getPaymentInfo(CURRENT_TEACHER_ID).then((p) => {
      if (p) {
        setInfo(p);
        setInstructions(p.instructions);
        setBankName(p.bankName ?? "");
        setAccountNumber(p.accountNumber ?? "");
        setPhoneNumber(p.phoneNumber ?? "");
      }
    });
  }, []);

  if (!info) return <LoadingScreen />;

  function handleCancel() {
    setInstructions(info!.instructions);
    setBankName(info!.bankName ?? "");
    setAccountNumber(info!.accountNumber ?? "");
    setPhoneNumber(info!.phoneNumber ?? "");
    setEditing(false);
  }

  async function handleSave() {
    const updated = await updatePaymentInfo(CURRENT_TEACHER_ID, {
      instructions: instructions.trim(),
      bankName: bankName.trim() || null,
      accountNumber: accountNumber.trim() || null,
      phoneNumber: phoneNumber.trim() || null,
    });
    setInfo(updated);
    setEditing(false);
    Alert.alert(t("profile.saved_title"), t("profile.payment_saved_msg"));
  }

  const fields: Array<{
    labelKey: string;
    placeholderKey: string;
    value: string;
    setter: (v: string) => void;
    multiline?: boolean;
    keyboardType?: "default" | "phone-pad";
  }> = [
    {
      labelKey: "profile.payment_instructions_label",
      placeholderKey: "profile.payment_instructions_placeholder",
      value: instructions,
      setter: setInstructions,
      multiline: true,
    },
    {
      labelKey: "profile.payment_bank_label",
      placeholderKey: "profile.payment_bank_placeholder",
      value: bankName,
      setter: setBankName,
    },
    {
      labelKey: "profile.payment_account_label",
      placeholderKey: "profile.payment_account_placeholder",
      value: accountNumber,
      setter: setAccountNumber,
    },
    {
      labelKey: "profile.payment_phone_label",
      placeholderKey: "profile.payment_phone_placeholder",
      value: phoneNumber,
      setter: setPhoneNumber,
      keyboardType: "phone-pad",
    },
  ];

  const displayValues = [
    info.instructions,
    info.bankName,
    info.accountNumber,
    info.phoneNumber,
  ];

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
          <Card>
            {fields.map((field, i) => (
              <View key={field.labelKey}>
                {i > 0 && <View style={styles.divider} />}
                <AppText className="text-xs text-text-muted mb-1">
                  {t(field.labelKey as any)}
                </AppText>
                {editing ? (
                  <TextInput
                    style={[styles.input, field.multiline && styles.multiline]}
                    value={field.value}
                    onChangeText={field.setter}
                    placeholder={t(field.placeholderKey as any)}
                    placeholderTextColor={Colors.textMuted}
                    multiline={field.multiline}
                    numberOfLines={field.multiline ? 3 : 1}
                    keyboardType={field.keyboardType ?? "default"}
                  />
                ) : (
                  <AppText className="text-sm text-text-secondary">
                    {displayValues[i] ?? "—"}
                  </AppText>
                )}
              </View>
            ))}
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
