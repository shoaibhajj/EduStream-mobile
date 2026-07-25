// app/(student)/[yearId]/index.tsx
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import type { Subject } from "../../../lib/types";
import { getSubjectsByYear } from "../../../lib/mock-data/student";

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
        setError("Could not load subjects.");
        console.error("[student/[yearId]] failed to load subjects", e);
      } finally {
        setLoading(false);
      }
    }
    if (yearId) load();
  }, [yearId]);

  if (loading)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#7C5CFC" />
      </View>
    );

  if (error)
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-base font-semibold text-error">{error}</Text>
      </View>
    );

  if (subjects.length === 0)
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-base font-semibold text-text-secondary">
          No subjects found for this year.
        </Text>
      </View>
    );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-surface border border-border rounded-xl p-4 mb-3 active:opacity-70"
            onPress={() => router.push(`/(student)/${yearId}/${item.id}`)}
          >
            <Text className="text-base font-semibold text-text-primary">
              {item.name}
            </Text>
            <Text className="text-xs text-text-muted mt-1">
              {item.courseCount} courses
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
