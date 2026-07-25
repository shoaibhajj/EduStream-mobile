// app/(student)/index.tsx
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

export default function AcademicYearsScreen() {
  const router = useRouter();
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAcademicYears();
        setYears(data);
      } catch (e) {
        setError("Could not load academic years.");
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
          No academic years available.
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
              {item.subjectCount} subjects
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
