import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ROSTER } from "@dte/shared";

/**
 * Roster tab — the 12 key figures the channel covers.
 * Purple-tinted chips alternate with fire-tinted ones.
 */
export default function RosterScreen() {
  return (
    <ScrollView style={styles.wrap} contentContainerStyle={styles.content}>
      <Text style={styles.title}>THE ROSTER</Text>
      <Text style={styles.sub}>Every figure making the culture messy right now.</Text>

      <View style={styles.grid}>
        {ROSTER.map((r, i) => (
          <View
            key={r.name}
            style={[styles.chip, i % 3 === 2 && styles.chipPurple]}
          >
            <Text style={styles.chipIcon}>{r.icon}</Text>
            <Text style={styles.chipName}>{r.name}</Text>
            <Text style={styles.chipTag}>{r.tag}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#050505" },
  content: { padding: 20, paddingBottom: 40 },
  title: { color: "#f2f2f2", fontSize: 30, fontWeight: "800", marginBottom: 6 },
  sub: { color: "#9a9a9a", fontSize: 13, marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    backgroundColor: "rgba(255,94,26,0.10)",
    borderColor: "rgba(255,94,26,0.35)",
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    minWidth: 150,
    flexGrow: 1,
    flexBasis: "30%"
  },
  chipPurple: {
    backgroundColor: "rgba(139,47,214,0.12)",
    borderColor: "rgba(139,47,214,0.4)"
  },
  chipIcon: { fontSize: 20 },
  chipName: { color: "#f2f2f2", fontSize: 15, fontWeight: "700", marginTop: 6 },
  chipTag: { color: "#9a9a9a", fontSize: 10, marginTop: 2, letterSpacing: 1, textTransform: "uppercase" }
});
