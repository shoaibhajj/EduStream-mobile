import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  AppText,
  Card,
  LoadingScreen,
  EmptyState,
} from "../../../components/ui";
import { Spacing } from "../../../constants/design";
import type { AcademicYear } from "../../../lib/types";
import { getAcademicYears } from "../../../lib/mock-data/student";
import { t, setLanguage, currentLocale } from "../../../lib/i18n";
import { useState as useStateHook } from "react";

export default function AcademicYearsScreen() {
  const router = useRouter();
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState(currentLocale());

  function toggleLang() {
    const next = lang === "ar" ? "en" : "ar";
    setLanguage(next);
    setLang(next);
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await getAcademicYears();
        setYears(data);
      } catch (e) {
        setError(t("student.error_load_years"));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <EmptyState message={error} />;
  if (years.length === 0) return <EmptyState message={t("student.no_years")} />;

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ title: t("student.academic_years_title") }} />
      <FlatList
        data={years}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: Spacing.base }}
        ListHeaderComponent={
          <AppText variant="sectionTitle" className="mb-3">
            {t("student.browse_pick_year")}
          </AppText>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 active:opacity-70"
            accessibilityRole="button"
            onPress={() => router.push(`/(student)/browse/${item.id}`)}
          >
            <Card>
              <AppText variant="sectionTitle">{item.name}</AppText>
              <AppText variant="muted" className="mt-1">
                {item.subjectCount} {t("student.subject_count")}
              </AppText>
            </Card>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={toggleLang} style={{ padding: Spacing.md }}>
        <AppText variant="muted" className="text-accent text-center">
          {lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
