import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#7C5CFC" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-base font-semibold text-error">{error}</Text>
      </View>
    );
  }

  if (years.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-base font-semibold text-text-secondary">
          {t("student.no_years")}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={years}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-surface border border-border rounded-xl p-4 mb-3 active:opacity-70"
            onPress={() => router.push(`/(student)/${item.id}`)}
          >
            <Text className="text-base font-semibold text-text-primary">
              {item.name}
            </Text>
            <Text className="text-xs text-text-muted mt-1">
              {item.subjectCount} {t("student.subject_count")}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={toggleLang} style={{ padding: 12 }}>
        <Text style={{ color: "#7C5CFC" }}>
          {lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
