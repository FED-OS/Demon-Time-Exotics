import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

/**
 * Root layout for the DTE mobile app (Expo Router).
 *
 * Sets up the native stack, dark fire-themed nav theme, and the
 * status bar. All routes under app/ inherit this shell.
 */

const DteTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#ff5e1a",
    background: "#050505",
    card: "#0d0d0d",
    text: "#f2f2f2",
    border: "#141414",
    notification: "#8b2fd6"
  }
};

export const unstable_settings = {
  anchor: "(tabs)"
};

export default function RootLayout() {
  return (
    <ThemeProvider value={DteTheme}>
      <StatusBar style="light" backgroundColor="#050505" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0d0d0d" },
          headerTintColor: "#f2f2f2",
          headerTitleStyle: { fontWeight: "800" },
          contentStyle: { backgroundColor: "#050505" }
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
