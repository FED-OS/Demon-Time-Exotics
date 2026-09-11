//! DEMON TIME EXOTICS — THE MESSY SHOW
//! Tauri 2 core library for the DTE desktop app.
//!
//! `main.rs` is a thin launcher; all app logic, commands and plugins
//! are wired here so the core can be unit-tested headlessly via
//! `cargo test` (see commands/ for the command layer).

mod commands;

use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_app_info,
            commands::get_channel_stats,
            commands::open_external,
            commands::spawn_cmd::check_stream_status
        ])
        .setup(|app| {
            // Expose app metadata to the webview for the status bar ping.
            let version = app.package_info().version.to_string();
            app.manage(commands::AppMeta { version });
            println!("[DTE] Rust core online — Demon Time Exotics v{}", app.package_info().version);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/// Grab a managed [AppMeta] handle (used by tests + status command).
pub fn meta(app: &tauri::AppHandle) -> Option<&commands::AppMeta> {
    app.try_state::<commands::AppMeta>()
}
