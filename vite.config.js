import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// Tauri expects a fixed dev-server port and a couple of small tweaks
// so the Rust side can reliably attach to the frontend during `tauri dev`.
// Reference: https://v2.tauri.app/start/frontend/vite/
const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [svelte()],

  // Prevent Vite from obscuring Rust build errors in the terminal.
  clearScreen: false,

  server: {
    port: 5173,
    // Tauri expects a fixed port, fail if that port is not available.
    strictPort: true,
    // If the host Tauri is expecting is set (mobile dev), use it.
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // Don't watch the Rust project, Cargo already does that.
      ignored: ["**/src-tauri/**"],
    },
  },

  // Vars prefixed with these are exposed to the frontend via import.meta.env
  envPrefix: ["VITE_", "TAURI_ENV_*"],

  build: {
    // Tauri uses Chromium on Windows/Android and WebKit on macOS/Linux/iOS.
    target:
      process.env.TAURI_ENV_PLATFORM == "windows" ? "chrome105" : "safari13",
    // Don't minify for debug builds.
    minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
    // Produce sourcemaps for debug builds.
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
});
