import { Redirect } from "expo-router";

/**
 * Entry route — bounces straight into the tab navigator.
 * Kept as a separate route so a future onboarding gate can slot in
 * before the tabs (see ROADMAP.md Phase 2).
 */
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
