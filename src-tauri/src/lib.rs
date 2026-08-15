// This is the real entry point for both desktop and mobile builds.
// main.rs is intentionally left untouched (Tauri compiles the app to a
// library on mobile and loads it through the platform frameworks, so the
// mobile entry point has to live here, not in main.rs).
//
// No commands are registered yet. The Core Processing Engine
// (image / pdf / text / dev / files / detect, per the approved
// architecture) is added tool by tool starting Phase 3 — this is
// deliberately just the empty shell.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running Universal Local Toolbox");
}
