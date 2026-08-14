import { Tabs, Redirect } from "expo-router";
import { t } from "../../lib/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";
import { LoadingScreen } from "../../components/ui";

export default function TeacherLayout() {
  const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false });

  if (!isLoaded) return <LoadingScreen />;
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7C5CFC",
        tabBarInactiveTintColor: "#99A1AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E7EAF3",
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarItemStyle: { paddingVertical: 6 },
        tabBarLabelStyle: { fontSize: 13, fontWeight: "500" },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarLabel: t("teacher.tab_home"),
          title: t("teacher.tab_home"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="enrollments"
        options={{
          tabBarLabel: t("teacher.tab_enrollments"),
          title: t("teacher.tab_enrollments"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="mail-unread-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="courses"
        options={{
          tabBarLabel: t("teacher.tab_courses"),
          title: t("teacher.tab_courses"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: t("profile.tab_profile"),
          title: t("profile.tab_profile"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
