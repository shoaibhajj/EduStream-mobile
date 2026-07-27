import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { t } from "../../lib/i18n";

export default function StudentLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#7C5CFC",
        tabBarInactiveTintColor: "#99A1AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E7EAF3",
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("student.home_my_courses"),
          tabBarLabel: t("student.home_my_courses"),
          headerTitle: t("common.app_name"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="browse"
        options={{
          title: t("student.academic_years_title"),
          tabBarLabel: t("student.academic_years_title"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: t("profile.tab_profile"),
          title: t("profile.tab_profile"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
