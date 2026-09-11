/**
 * DEMON TIME EXOTICS — Electron main process.
 *
 * SECURITY MODEL (ADR-0003):
 *   - contextIsolation: true   → preload is the only bridge
 *   - nodeIntegration: false   → renderer cannot touch Node
 *   - sandbox: true            → preload runs in a sandboxed context
 *
 * The renderer never loads remote content: it loads either the Vite
 * dev server (dev) or the bundled dist/renderer (production).
 */
import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerIpc } from "./ipc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Dev server URL is set by scripts/dev.mjs when running `pnpm dev`. */
const DEV_SERVER_URL = process.env.ELECTRON_RENDERER_URL;

let mainWindow: BrowserWindow | null = null;

function createMainWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 420,
    minHeight: 540,
    title: "DEMON TIME EXOTICS — THE MESSY SHOW",
    backgroundColor: "#050505",
    show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../resources/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      devTools: process.env.NODE_ENV !== "production"
    }
  });

  win.once("ready-to-show", () => win.show());
  win.on("closed", () => {
    mainWindow = null;
  });

  if (DEV_SERVER_URL) {
    void win.loadURL(DEV_SERVER_URL);
  } else {
    void win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  return win;
}

/** Single-instance lock — second launch focuses the existing window. */
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    registerIpc();
    mainWindow = createMainWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) mainWindow = createMainWindow();
    });
  });

  app.on("window-all-closed", () => {
    // macOS convention: keep running until explicit quit.
    if (process.platform !== "darwin") app.quit();
  });
}
