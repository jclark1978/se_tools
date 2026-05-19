# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run validate    # Validate all plugins and check manifest is current
npm run manifest    # Regenerate PLUGIN_MANIFEST.md from plugin metadata
```

Requires Node.js 20+. Run `validate` before any commit that touches `plugins/` or `PLUGIN_MANIFEST.md`. If it reports a stale manifest, run `manifest` first. CI runs `validate` on every push and pull request.

## Architecture

This repo produces **self-contained single-file HTML plugins** for FabricBOM, a browser-based host that loads plugins in iframes. Every plugin lives in `plugins/` and must be a complete standalone HTML document — no external dependencies, no relative paths, no `<link>` or `<script src>` tags, no ES modules.

### Plugin anatomy

Each plugin embeds its own CSS, JS, and any third-party libraries inline. It declares metadata in a `<script type="application/json" id="fabricbom-plugin-meta">` block. Required metadata fields: `fabricbomPlugin: true`, `name`, `category`, `version`, `description`. Optional: `icon` (`report`, `database`, `chart`, `tracker`, `gear`).

`validate-plugins.mjs` enforces these structural rules — a plugin fails if it contains a `<link>` tag, a `<script src="...">` tag, a `type="module"` script, or a relative `href`/`src` path (`../`).

`localStorage` is the persistence layer. All plugin-owned keys must be prefixed `fabricbom_`. Shared cross-plugin datasets (e.g. `hardware_lifecycle`) follow the normalized record schema in [docs/TOOLBOX_SHARED_DATASETS.md](docs/TOOLBOX_SHARED_DATASETS.md).

### Host contract (FabricBOM integration)

Plugins run inside a same-origin iframe. The host does not inject globals — plugins communicate with it exclusively via two `postMessage` message types:

- `FORTIBOM_ADD` — pushes BOM rows into the active project. Shape: `{ type, product, label, rows: [{ sku, desc, qty, notes }], meta }`.
- `FORTIBOM_CLOSE` — closes the plugin iframe/modal.

Plugins also have full read/write access to the host's `localStorage` and IndexedDB (same origin). The `fabricbom_*` key prefix convention is what prevents collisions with host data.

### Scripts

`scripts/plugin-utils.mjs` is the shared library for both `generate-manifest.mjs` and `validate-plugins.mjs`. It exposes `listPluginFiles`, `readPluginMetadata` (parses + validates each plugin), and `buildManifest` (renders the markdown table).

`PLUGIN_MANIFEST.md` is generated — do not edit it by hand.

### UI conventions

Plugins use a fixed-height toolbar (`44px`, class `.plugin-bar`) with a scrollable body (`.plugin-scroll`) so primary actions stay visible over long tables. See [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) for the Fortinet color tokens, component class names, and copy guidelines.

### Pre-release checklist

[checklists/RELEASE_CHECKLIST.md](checklists/RELEASE_CHECKLIST.md) covers the full set of static, browser, data, and packaging checks required before installing or publishing a plugin.
