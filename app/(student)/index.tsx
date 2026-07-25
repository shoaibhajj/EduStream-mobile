import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { AppText, Card, LoadingScreen, EmptyState } from "../../components/ui";
import { Spacing } from "../../constants/design";
import { useRouter } from "expo-router";
import type { AcademicYear } from "../../lib/types";
import { getAcademicYears } from "../../lib/mock-data/student";
import { t } from "../../lib/i18n";
import { setLanguage, currentLocale } from "../../lib/i18n";



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
  // Note: RTL changes only fully apply after app reload.
  // Text translations switch immediately.
}
  useEffect(() => {
    async function load() {
      try {
        const data = await getAcademicYears();
        setYears(data);
      } catch (e) {
        setError(t("student.error_load_years"));
        console.error("[student/index] failed to load years", e);
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
      <FlatList
        data={years}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: Spacing.base }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 active:opacity-70"
            onPress={() => router.push(`/(student)/${item.id}`)}
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
        <AppText variant="muted" className="text-accent">
          {lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}
