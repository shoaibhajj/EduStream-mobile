import { Tabs } from "expo-router";
import { t } from "../../lib/i18n";

export default function TeacherLayout() {
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
        }}
      />
      <Tabs.Screen
        name="enrollments"
        options={{
          tabBarLabel: t("teacher.tab_enrollments"),
          title: t("teacher.tab_enrollments"),
        }}
      />
    </Tabs>
  );
}
