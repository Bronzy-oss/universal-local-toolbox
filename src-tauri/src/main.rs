// Prevents an additional console window from appearing on Windows in
// release builds. DO NOT REMOVE.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    universal_local_toolbox_lib::run();
}
