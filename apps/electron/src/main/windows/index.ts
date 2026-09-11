/**
 * Window factory + lifecycle helpers for the DTE Electron app.
 *
 * Kept separate from index.ts so window creation can be extended
 * (multiple windows, frameless media viewer, etc.) without touching
 * the app bootstrap.
 */
import { BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface MainWindowOptions {
  devServerUrl?: string;
  preloadPath?: string;
}

export function buildMainWindow(opts: MainWindowOptions): BrowserWindow {
  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 420,
    minHeight: 540,
    title: "DEMON TIME EXOTICS — THE MESSY SHOW",
    backgroundColor: "#050505",
    show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../../resources/icon.png"),
    webPreferences: {
      preload: opts.preloadPath ?? path.join(__dirname, "../../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.once("ready-to-show", () => win.show());
  return win;
}
