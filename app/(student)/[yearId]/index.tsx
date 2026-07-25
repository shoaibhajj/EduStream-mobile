import { useEffect, useState } from "react";
import {
  LoadingScreen,
  EmptyState,
  AppText,
  Card,
} from "../../../components/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import type { Subject } from "../../../lib/types";
import { getSubjectsByYear } from "../../../lib/mock-data/student";
import { t } from "../../../lib/i18n";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Spacing } from "../../../constants/design";

export default function SubjectsScreen() {
  const { yearId } = useLocalSearchParams<{ yearId: string }>();
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSubjectsByYear(yearId);
        setSubjects(data);
      } catch (e) {
        setError(t("student.error_load_subjects"));
        console.error("[student/[yearId]] failed to load subjects", e);
      } finally {
        setLoading(false);
      }
    }
    if (yearId) load();
  }, [yearId]);

  if (loading) return <LoadingScreen />;

  if (error) return <EmptyState message={error} />;
 if (subjects.length === 0) return <EmptyState message={t("your.empty.key")} />;

return (
  <View className="flex-1 bg-background">
    <FlatList
      data={subjects}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: Spacing.base }}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="mb-3 active:opacity-70"
          onPress={() => router.push(`/(student)/${yearId}/${item.id}`)}
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
