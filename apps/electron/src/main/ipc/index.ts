/**
 * IPC registration for the DTE Electron app.
 *
 * All ipcMain handlers live here so the surface area stays auditable:
 * every channel is allowlisted in src/preload/index.ts with
 * `contextBridge.exposeInMainWorld("dte", { ... })`.
 */
import { ipcMain, shell, app } from "electron";

export interface AppInfo {
  version: string;
  platform: string;
  electron: string;
}

const ALLOWED_URL_PREFIXES = [
  "https://www.youtube.com/",
  "https://youtube.com/",
  "https://www.instagram.com/",
  "https://www.twitch.tv/",
  "https://shopdemontimeexotics.com/",
  "https://ko-fi.com/"
];

/** Guard: only allowlisted platform domains may be opened externally. */
function isAllowedUrl(url: string): boolean {
  return ALLOWED_URL_PREFIXES.some((p) => url.startsWith(p));
}

export function registerIpc(): void {
  ipcMain.handle("dte:app-info", (): AppInfo => ({
    version: app.getVersion(),
    platform: process.platform,
    electron: process.versions.electron
  }));

  ipcMain.handle("dte:open-external", (_e, url: unknown): { ok: boolean; error?: string } => {
    const target = typeof url === "string" ? url : "";
    if (!isAllowedUrl(target)) {
      return { ok: false, error: "URL not on the DTE allowlist" };
    }
    void shell.openExternal(target);
    return { ok: true };
  });

  ipcMain.handle("dte:channel-stats", () => ({
    // Single source of truth: @dte/shared (mirror, see packages/shared)
    subscribers: 21_200,
    videos: 406,
    totalViews: 3_025_509
  }));
}
