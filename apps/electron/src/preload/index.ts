/**
 * Preload bridge — the ONLY channel between renderer and Node/Electron.
 *
 * Exposes a minimal, typed `window.dte` API via contextBridge under
 * context isolation (ADR-0003). Never expose `ipcRenderer` raw or
 * add generic invoke passthroughs — extend this API deliberately.
 */
import { contextBridge, ipcRenderer } from "electron";

export interface DteAppInfo {
  version: string;
  platform: string;
  electron: string;
}

export interface DteChannelStats {
  subscribers: number;
  videos: number;
  totalViews: number;
}

const api = {
  appInfo: (): Promise<DteAppInfo> => ipcRenderer.invoke("dte:app-info"),
  openExternal: (url: string): Promise<{ ok: boolean; error?: string }> =>
    ipcRenderer.invoke("dte:open-external", url),
  channelStats: (): Promise<DteChannelStats> => ipcRenderer.invoke("dte:channel-stats")
};

contextBridge.exposeInMainWorld("dte", api);

export type DteApi = typeof api;
