//! Command layer — the Tauri bridge between webview and Rust core.
//!
//! Every `#[tauri::command]` exposed to the frontend lives here (or in
//! a submodule). Frontend signatures are mirrored in
//! apps/tauri/src/lib/tauri.ts.

use serde::{Deserialize, Serialize};

/// Managed app metadata (injected in `setup`, see lib.rs).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppMeta {
    pub version: String,
}

/// Channel stats mirrored from the @dte/shared constants.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChannelStats {
    pub subscribers: u64,
    pub videos: u64,
    pub total_views: u64,
}

/// Platform descriptor used by the hub grid.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Platform {
    pub name: String,
    pub handle: String,
    pub url: String,
}

/// Core app info for the status-bar health ping.
#[tauri::command]
pub fn get_app_info(app: tauri::AppHandle) -> AppInfo {
    let meta = app.try_state::<AppMeta>();
    AppInfo {
        version: meta.map(|m| m.version.clone()).unwrap_or_else(|| "0.0.0".into()),
        platform: std::env::consts::OS.to_string(),
    }
}

/// Serializable payload of [get_app_info].
#[derive(Debug, Clone, Serialize)]
pub struct AppInfo {
    pub version: String,
    pub platform: String,
}

/// Cached channel stats (single source of truth: @dte/shared on the TS side).
#[tauri::command]
pub fn get_channel_stats() -> ChannelStats {
    ChannelStats {
        subscribers: 21_200,
        videos: 406,
        total_views: 3_025_509,
    }
}

/// Ask the core to open an external platform URL.
/// Frontend normally uses the opener plugin directly; this command is
/// the fallback path for custom protocol handling and tests.
#[tauri::command]
pub async fn open_external(url: String) -> Result<(), String> {
    tauri_plugin_opener::open_url(&url, None::<&str>)
        .map_err(|e| format!("failed to open url: {e}"))
}

pub mod spawn_cmd {
    //! Example shell-backed command (stream status check).
    //!
    //! Gated behind the `shell` plugin capability in capabilities/default.json.

    /// Check whether the Twitch live stream is up (placeholder ping).
    #[tauri::command]
    pub async fn check_stream_status() -> Result<StreamStatus, String> {
        // Placeholder implementation — swap for a real HTTP call when
        // the Twitch Helix integration lands (see ROADMAP.md Phase 3).
        Ok(StreamStatus {
            live: false,
            title: "offline".into(),
        })
    }

    #[derive(Debug, Clone, Serialize)]
    pub struct StreamStatus {
        pub live: bool,
        pub title: String,
    }
}
