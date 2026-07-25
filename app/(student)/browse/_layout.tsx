import { Stack } from "expo-router";

export default function BrowseLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      {/* Hide the header for the layout's own container slot.
          Each child screen sets its own title via Stack.Screen options. */}
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="[yearId]/index" options={{ headerShown: true }} />
      <Stack.Screen
        name="[yearId]/[subjectId]/index"
        options={{ headerShown: true }}
      />
    </Stack>
  );
}
