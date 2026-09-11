import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useState } from "react";

/**
 * Alerts tab — notification toggles for the messy-coverage beats.
 * Local state today; will back onto a push service in ROADMAP Phase 3.
 */
export default function AlertsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    breaking: true,
    uploads: true,
    live: false,
    members: false,
    merch: false
  });

  const rows = [
    { key: "breaking", label: "Breaking Beef", desc: "New feuds & call-outs as they drop" },
    { key: "uploads", label: "New Uploads", desc: "Every public video & short" },
    { key: "live", label: "Going Live", desc: "Twitch stream start pings" },
    { key: "members", label: "Members-Only Drops", desc: "Exclusive streams & videos" },
    { key: "merch", label: "Merch Drops", desc: "shopdemontimeexotics.com releases" }
  ];

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={styles.content}>
      <Text style={styles.title}>ALERTS</Text>
      <Text style={styles.sub}>The shadowban is REAL — stay ahead of it.</Text>

      {rows.map((row) => (
        <View key={row.key} style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowDesc}>{row.desc}</Text>
          </View>
          <Switch
            value={toggles[row.key]}
            onValueChange={(v) => setToggles((t) => ({ ...t, [row.key]: v }))}
            trackColor={{ false: "#141414", true: "rgba(255,94,26,0.5)" }}
            thumbColor={toggles[row.key] ? "#ff5e1a" : "#9a9a9a"}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#050505" },
  content: { padding: 20, paddingBottom: 40 },
  title: { color: "#f2f2f2", fontSize: 30, fontWeight: "800", marginBottom: 6 },
  sub: { color: "#9a9a9a", fontSize: 13, marginBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#141414",
    borderColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10
  },
  rowText: { flex: 1, paddingRight: 12 },
  rowLabel: { color: "#f2f2f2", fontSize: 15, fontWeight: "700" },
  rowDesc: { color: "#9a9a9a", fontSize: 11, marginTop: 3 }
});
