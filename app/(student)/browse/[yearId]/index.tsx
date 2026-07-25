import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  LoadingScreen,
  EmptyState,
  AppText,
  Card,
} from "../../../../components/ui";
import { Spacing } from "../../../../constants/design";
import type { Subject, AcademicYear } from "../../../../lib/types";
import {
  getSubjectsByYear,
  getYearById,
} from "../../../../lib/mock-data/shared";
import { t } from "../../../../lib/i18n";

export default function SubjectsScreen() {
  const { yearId } = useLocalSearchParams<{ yearId: string }>();
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [year, setYear] = useState<AcademicYear | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [subjectData, yearData] = await Promise.all([
          getSubjectsByYear(yearId),
          getYearById(yearId),
        ]);
        setSubjects(subjectData);
        setYear(yearData);
      } catch (e) {
        setError(t("student.error_load_subjects"));
      } finally {
        setLoading(false);
      }
    }
    if (yearId) load();
  }, [yearId]);

  if (loading) return <LoadingScreen />;
  if (error) return <EmptyState message={error} />;
  if (subjects.length === 0)
    return <EmptyState message={t("student.no_subjects")} />;

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{ title: year?.name ?? t("student.subjects_title") }}
      />
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: Spacing.base }}
        ListHeaderComponent={
          <AppText variant="sectionTitle" className="mb-3">
            {t("student.browse_pick_subject")}
          </AppText>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 active:opacity-70"
            accessibilityRole="button"
            onPress={() =>
              router.push(`/(student)/browse/${yearId}/${item.id}`)
            }
          >
            <Card>
              <AppText variant="sectionTitle">{item.name}</AppText>
              <AppText variant="muted" className="mt-1">
                {item.courseCount} {t("student.course_count")}
              </AppText>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
