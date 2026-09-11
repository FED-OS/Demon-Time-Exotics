import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

/**
 * Tab navigator shell — Watch • Roster • Hub • Alerts • More.
 * Bar styling mirrors the DTE web/desktop brand: near-black surfaces,
 * fire-orange active tint, smoke inactive.
 */

const icons: Record<string, string> = {
  watch: "▶",
  roster: "😈",
  hub: "🌐",
  alerts: "🔔",
  more: "☰"
};

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <View style={styles.iconWrap}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>{icons[name] ?? "•"}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar,
        tabBarActiveTintColor: "#ff5e1a",
        tabBarInactiveTintColor: "#9a9a9a",
        tabBarLabelStyle: styles.label
      }}
    >
      <Tabs.Screen
        name="watch"
        options={{
          title: "Watch",
          tabBarIcon: ({ focused }) => <TabIcon name="watch" focused={focused} />
        }}
      />
      <Tabs.Screen
        name="roster"
        options={{
          title: "Roster",
          tabBarIcon: ({ focused }) => <TabIcon name="roster" focused={focused} />
        }}
      />
      <Tabs.Screen
        name="hub"
        options={{
          title: "Hub",
          tabBarIcon: ({ focused }) => <TabIcon name="hub" focused={focused} />
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ focused }) => <TabIcon name="alerts" focused={focused} />
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ focused }) => <TabIcon name="more" focused={focused} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: { alignItems: "center", justifyContent: "center", marginTop: 4 },
  icon: { fontSize: 18, color: "#9a9a9a" },
  iconFocused: { color: "#ff5e1a" },
  bar: {
    backgroundColor: "#0d0d0d",
    borderTopColor: "#141414",
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 4
  },
  label: { fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }
});
