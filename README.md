# Universal Local Toolbox

Offline-first, cross-platform utility toolbox. Tauri 2 (Rust) + Svelte 5 + Vite.
See the Project Plan document for full architecture, roadmap, and privacy model.

**Status:** Phase 1, step 1 — empty-shell scaffold only. No tools yet.

## Prerequisites

- Node.js >= 20.19
- Rust (via [rustup](https://rustup.rs)) + Cargo
- Tauri system dependencies for your OS — see
  https://v2.tauri.app/start/prerequisites/
  (on Linux this means `webkit2gtk`, `libayatana-appindicator3`, etc.)

## Run in development

```bash
npm install
npm run tauri dev
```

## Build

```bash
npm install
npm run tauri build
```

## Notes

- `src-tauri/icons/*` are **placeholder icons**, generated to unblock the
  bundler — not final branding. Replace before any real release.
- `identifier` in `src-tauri/tauri.conf.json` (`com.bronzy.universallocaltoolbox`)
  is a placeholder — confirm/personalize it before publishing anywhere,
  since app identifiers are hard to change after a store listing exists.
- No commands/plugins are registered yet — `src-tauri/capabilities/default.json`
  only grants `core:default` (no filesystem/network/shell access). Each tool
  gets its own permissions added when it's implemented.
