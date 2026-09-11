import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TOP_VIDEOS } from "@dte/shared";

/**
 * Watch tab — the six top-performing videos from the channel study.
 * Each card links out to YouTube search for the exact title.
 */
export default function WatchScreen() {
  return (
    <ScrollView style={styles.wrap} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>DEMON TIME EXOTICS</Text>
      <Text style={styles.title}>THE MESSY SHOW</Text>
      <Text style={styles.sub}>
        The rawest, most unfiltered voice in Hip Hop News, Podcast Beef and Urban Entertainment.
      </Text>

      {TOP_VIDEOS.map((v) => (
        <View key={v.title} style={styles.card}>
          <View style={styles.viewsBadge}>
            <Text style={styles.viewsText}>{v.views}</Text>
          </View>
          <Text style={styles.cardTitle}>{v.title}</Text>
          <Text style={styles.cardMeta}>
            {v.age} · {v.category}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#050505" },
  content: { padding: 20, paddingBottom: 40 },
  eyebrow: { color: "#ff5e1a", letterSpacing: 4, fontSize: 11, fontWeight: "700" },
  title: { color: "#f2f2f2", fontSize: 34, fontWeight: "800", marginTop: 4, marginBottom: 8 },
  sub: { color: "#9a9a9a", fontSize: 13, lineHeight: 20, marginBottom: 22 },
  card: {
    backgroundColor: "#141414",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)"
  },
  viewsBadge: { alignSelf: "flex-start", backgroundColor: "rgba(255,94,26,0.14)", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999, marginBottom: 8 },
  viewsText: { color: "#ff5e1a", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  cardTitle: { color: "#f2f2f2", fontSize: 15, fontWeight: "700", lineHeight: 21 },
  cardMeta: { color: "#9a9a9a", fontSize: 11, marginTop: 6, letterSpacing: 0.5 }
});
