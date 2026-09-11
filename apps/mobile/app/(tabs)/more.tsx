import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AFFILIATES } from "@dte/shared";

/**
 * More tab — support panel + affiliate gear grid + app info.
 * "Every comment counts" — the CTA mirrors the web footer.
 */
export default function MoreScreen() {
  const open = (url: string): void => {
    void Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={styles.content}>
      <Text style={styles.title}>MORE</Text>

      <View style={styles.supportCard}>
        <Text style={styles.supportTitle}>SUPPORT THE SHOW 💪🏾😈🔥</Text>
        <Text style={styles.supportSub}>
          Hit the like button — IT'S FREE. Subscribe & turn on ALL alerts 🔔
        </Text>
        <View style={styles.supportRow}>
          <TouchableOpacity style={[styles.btn, styles.btnFire]} onPress={() => open("https://www.youtube.com/@DTEMONEY448?sub_confirmation=1")}>
            <Text style={styles.btnFireText}>SUBSCRIBE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnPurple]} onPress={() => open("https://www.youtube.com/channel/UC4mSdocvseflT-Tubw9xOnw/join")}>
            <Text style={styles.btnPurpleText}>MEMBERSHIP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>AFFILIATE GEAR</Text>
      <Text style={styles.sectionSub}>DTE earns commission — learn more on the channel.</Text>
      {AFFILIATES.map((a) => (
        <TouchableOpacity key={a.name} style={styles.gear} onPress={() => open(a.retailerUrl)}>
          <Text style={styles.gearName}>{a.name}</Text>
          <View style={styles.gearMetaRow}>
            <Text style={styles.gearRetailer}>{a.retailer}</Text>
            <Text style={styles.gearPrice}>{a.price}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.about}>
        <Text style={styles.aboutText}>v1.0.0 · Expo SDK 51 · React Native</Text>
        <Text style={styles.aboutText}>Bigmoney@demontimeexotics.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#050505" },
  content: { padding: 20, paddingBottom: 40 },
  title: { color: "#f2f2f2", fontSize: 30, fontWeight: "800", marginBottom: 14 },
  supportCard: {
    backgroundColor: "rgba(255,94,26,0.08)",
    borderColor: "rgba(255,94,26,0.35)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24
  },
  supportTitle: { color: "#f2f2f2", fontSize: 17, fontWeight: "800" },
  supportSub: { color: "#9a9a9a", fontSize: 12, marginTop: 6, lineHeight: 18 },
  supportRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  btn: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, flexGrow: 1 },
  btnFire: { backgroundColor: "#ff5e1a" },
  btnPurple: { backgroundColor: "#8b2fd6" },
  btnFireText: { color: "#050505", fontWeight: "800", textAlign: "center", fontSize: 12, letterSpacing: 1 },
  btnPurpleText: { color: "#ffffff", fontWeight: "800", textAlign: "center", fontSize: 12, letterSpacing: 1 },
  sectionTitle: { color: "#f2f2f2", fontSize: 18, fontWeight: "800", marginBottom: 4 },
  sectionSub: { color: "#9a9a9a", fontSize: 11, marginBottom: 14 },
  gear: {
    backgroundColor: "#141414",
    borderColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8
  },
  gearName: { color: "#f2f2f2", fontSize: 13, fontWeight: "600", lineHeight: 19 },
  gearMetaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  gearRetailer: { color: "#9a9a9a", fontSize: 11 },
  gearPrice: { color: "#f5a623", fontSize: 12, fontWeight: "700" },
  about: { marginTop: 24, alignItems: "center" },
  aboutText: { color: "#5c5c5c", fontSize: 10, letterSpacing: 1, marginTop: 2 }
});
