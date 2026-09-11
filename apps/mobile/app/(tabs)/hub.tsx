import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PLATFORMS } from "@dte/shared";

/**
 * Hub tab — every DTE platform in one grid. Tapping a card opens the
 * platform via the OS (Linking), the same allowlist the desktop apps use.
 */
export default function HubScreen() {
  const open = (url: string): void => {
    void Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={styles.content}>
      <Text style={styles.title}>TAP IN</Text>
      <Text style={styles.sub}>Every platform. One hub. No excuses.</Text>

      <View style={styles.grid}>
        {PLATFORMS.map((p) => (
          <TouchableOpacity key={p.name} style={styles.card} onPress={() => open(p.url)}>
            <Text style={styles.arrow}>↗</Text>
            <Text style={styles.icon}>{p.icon}</Text>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.handle}>{p.handle}</Text>
          </TouchableOpacity>
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
  grid: { gap: 10 },
  card: {
    backgroundColor: "#141414",
    borderColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderRadius: 14,
    padding: 16
  },
  arrow: { color: "#ff5e1a", alignSelf: "flex-end", fontSize: 14 },
  icon: { fontSize: 24 },
  name: { color: "#f2f2f2", fontSize: 17, fontWeight: "700", marginTop: 6 },
  handle: { color: "#9a9a9a", fontSize: 11, marginTop: 2 }
});
